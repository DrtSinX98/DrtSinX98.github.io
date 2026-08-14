import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import { unstable_cache } from 'next/cache';

/**
 * Inlines the page illustrations so their layers can be animated.
 *
 * An SVG loaded through <img> is an opaque document — no stylesheet of ours can
 * reach inside it. Fetching the markup on the server and dropping it into the
 * page lets `styles/illustrations.css` animate each Storyset layer, costs one
 * fewer request, and needs no client JavaScript.
 */

// Only the CDNs this site actually serves images from. The URL comes from an
// editable content document, so this also stops the fetch being pointed at an
// internal address.
const ALLOWED_HOSTS = new Set(['raw.githubusercontent.com', 'cdn.jsdelivr.net', 'i.ibb.co']);

const MAX_BYTES = 512 * 1024;

/**
 * innerHTML never runs <script>, but it does honour inline event handlers, so
 * strip both along with the elements that can load or embed anything else.
 */
function sanitizeSvg(markup) {
  return markup
    .replace(/<\?xml[\s\S]*?\?>/gi, '')
    .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
    .replace(/(href|xlink:href)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '')
    .trim();
}

/**
 * Storyset's animated exports tag every moving part `class="animable"` and hide
 * them until the root <svg> carries an `animated` class — normally added by a
 * script in their snippet. Setting it here keeps them working with no
 * JavaScript, and tells the page to stand our generic animation down in favour
 * of the artwork's own (see `styles/storyset.css`).
 */
function markSelfAnimated(markup) {
  if (!/class="animable"/i.test(markup)) return { markup, selfAnimated: false };

  const withClass = markup.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
    const classAttr = attrs.match(/\sclass\s*=\s*["']([^"']*)["']/i);
    if (!classAttr) return `<svg${attrs} class="animated">`;
    if (/\banimated\b/.test(classAttr[1])) return match;
    return `<svg${attrs.replace(/(\sclass\s*=\s*["'])/i, '$1animated ')}>`;
  });

  return { markup: withClass, selfAnimated: true };
}

/** Reads `/illustrations/about.svg` from `public/`. */
async function readLocalSvg(pathname) {
  const rel = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '').replace(/^[/\\]+/, '');
  const file = path.join(process.cwd(), 'public', rel);

  // Refuse anything that escaped the public directory.
  if (!file.startsWith(path.join(process.cwd(), 'public') + path.sep)) return null;

  return fs.readFile(file, 'utf8');
}

async function readRemoteSvg(url) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || !ALLOWED_HOSTS.has(parsed.hostname)) return null;
  if (!/\.svg($|\?)/i.test(parsed.pathname)) return null;

  const res = await fetch(parsed.toString(), { headers: { Accept: 'image/svg+xml' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

const loadSvg = unstable_cache(
  async (src) => {
    const isLocal = src.startsWith('/');
    if (!isLocal && !/^https:\/\//i.test(src)) return null;
    if (!/\.svg($|\?)/i.test(src)) return null;

    const body = isLocal ? await readLocalSvg(src) : await readRemoteSvg(src);
    if (!body || body.length > MAX_BYTES || !/<svg[\s>]/i.test(body)) return null;

    return markSelfAnimated(sanitizeSvg(body));
  },
  ['illustration-svg'],
  { revalidate: 3600, tags: ['illustrations'] },
);

/**
 * @returns {Promise<{markup: string, selfAnimated: boolean}|null>}
 *   null when the URL isn't an inlinable SVG — callers fall back to an <img>.
 */
export async function getIllustration(src) {
  if (!src) return null;
  try {
    return await loadSvg(src);
  } catch (err) {
    console.error('[illustration] could not inline', src, err.message);
    return null;
  }
}
