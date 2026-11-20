import fs from 'node:fs/promises';
import path from 'node:path';
import { getContent } from '@/lib/content';
import { recolorSvg } from '@/lib/recolor';
import { presetTheme, resolveTheme } from '@/lib/themePresets';

export const runtime = 'nodejs';

/**
 * The page illustrations, re-coloured to the active theme, as plain SVG
 * images. The big ones on each page are inlined and recoloured in place (see
 * lib/illustrations.js); this serves the small thumbnails on the home page's
 * "Explore" list, which are ordinary <img> tags and so can't be styled from
 * outside.
 *
 * Only these files can be requested, and the colours come from the saved
 * theme rather than the URL (`?v=` is just a cache-buster).
 */
const ALLOWED = new Set(['about', 'projects', 'gallery', 'lectures', 'contact']);

export async function GET(request, { params }) {
  const { name } = await params;
  if (!ALLOWED.has(name)) return new Response('Not found', { status: 404 });

  try {
    const [markup, site] = await Promise.all([
      fs.readFile(path.join(process.cwd(), 'public', 'illustrations', `${name}.svg`), 'utf8'),
      getContent('site'),
    ]);

    const { searchParams } = new URL(request.url);
    const versioned = searchParams.has('v');
    // `t`: a visitor's own template, from the fixed list (see lib/visitorTheme.js).
    const theme = presetTheme(searchParams.get('t')) || resolveTheme(site.theme);
    return new Response(recolorSvg(markup, theme), {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': versioned ? 'public, max-age=31536000, immutable' : 'public, max-age=300',
      },
    });
  } catch (err) {
    console.error(`[theme-art] ${name}:`, err.message);
    return Response.redirect(new URL(`/illustrations/${name}.svg`, request.url), 302);
  }
}
