import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { getContentMany } from '@/lib/content';
import { ALLOWED_HOSTS } from '@/lib/illustrations';
import { recolorRaster } from '@/lib/recolor';
import { resolveTheme } from '@/lib/themePresets';

export const runtime = 'nodejs';

/**
 * The home page's profile picture, re-coloured to the active theme.
 *
 * The portraits are palette art drawn in Rosé (see lib/recolor.js), so for any
 * other theme their colours are swapped for the theme's. The result is a lossless
 * 800px WebP — about 74 kB, against 833 kB for the 2048px PNG it replaces, so
 * this also makes the hero image load far faster than before.
 *
 * Public on purpose (the page needs it), so it takes no colour parameters: the
 * colours come from the saved theme, and `?v=` is only a cache-buster (a hash of
 * the theme and source, see lib/portrait.js). That way nobody can ask the server
 * to render arbitrary variants.
 */

const SIZE = 800;
const MAX_SOURCE_BYTES = 12 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 12000;

// A handful of finished images, so a burst of requests (or a dev server without a
// CDN in front) doesn't re-run the conversion each time.
const memo = new Map();
const MEMO_LIMIT = 12;

function remember(key, value) {
  memo.set(key, value);
  if (memo.size > MEMO_LIMIT) memo.delete(memo.keys().next().value);
}

/** Reads the source image, from `public/` or an allowlisted https host. */
async function loadSource(src) {
  if (src.startsWith('/')) {
    const root = path.join(process.cwd(), 'public');
    const file = path.join(root, path.normalize(src));
    if (!file.startsWith(root + path.sep)) throw new Error('path outside public/');
    return fs.readFile(file);
  }

  const url = new URL(src);
  if (url.protocol !== 'https:' || !ALLOWED_HOSTS.has(url.hostname)) throw new Error(`host not allowed: ${url.hostname}`);

  const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`source answered ${res.status}`);
  if (Number(res.headers.get('content-length')) > MAX_SOURCE_BYTES) throw new Error('source too large');

  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length > MAX_SOURCE_BYTES) throw new Error('source too large');
  return buffer;
}

async function render(src, theme) {
  const source = await loadSource(src);
  const base = sharp(source, { failOn: 'none' }).resize(SIZE, SIZE, { fit: 'cover' }).removeAlpha();

  // Rosé goes through the same pass (it maps each colour to itself): resizing leaves
  // soft edges that compress poorly, and the pass snaps them back onto the palette.
  const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
  const recoloured = recolorRaster(data, info.channels, theme);
  return sharp(Buffer.from(recoloured.buffer, recoloured.byteOffset, recoloured.length), {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .webp({ lossless: true, effort: 4 })
    .toBuffer();
}

export async function GET(request, { params }) {
  const { variant } = await params;
  if (variant !== 'light' && variant !== 'dark') return new Response('Not found', { status: 404 });

  const { home, site } = await getContentMany(['home', 'site']);
  const src = variant === 'light' ? home.profileImageLight : home.profileImageDark;
  if (!src) return new Response('No profile image is set', { status: 404 });

  const theme = resolveTheme(site.theme);
  const key = [variant, src, theme.primaryColor, theme.secondaryColor, theme.tertiaryColor].join('|').toLowerCase();

  try {
    let buffer = memo.get(key);
    if (!buffer) {
      buffer = await render(src, theme);
      remember(key, buffer);
    }

    // `v` changes whenever the theme or the source does, so a versioned URL can
    // be cached for good; an un-versioned one gets a short lifetime.
    const versioned = new URL(request.url).searchParams.has('v');
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': versioned ? 'public, max-age=31536000, immutable' : 'public, max-age=300',
      },
    });
  } catch (err) {
    // The portrait must never disappear because recolouring failed: hand back the
    // original, un-recoloured image instead.
    console.error(`[profile-image] could not recolour ${variant}:`, err.message);
    const canRedirect = src.startsWith('/') || ALLOWED_HOSTS.has(new URL(src).hostname);
    return canRedirect ? Response.redirect(new URL(src, request.url), 302) : new Response('Unavailable', { status: 502 });
  }
}
