/**
 * The URL for the profile picture, re-coloured to match the theme (see
 * lib/recolor.js and app/api/profile-image).
 *
 * The URL carries `v`, a short hash of everything the result depends on — the
 * theme colours and the source image. When any of those
 * change, the URL changes, so the response can be cached "forever" by browsers
 * and the CDN without ever going stale. Pure functions: usable on the server
 * (to build the URLs) and in plain node.
 */

import { presetTheme } from './themePresets';

function hash(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

const themeText = (theme) =>
  ['primaryColor', 'secondaryColor', 'tertiaryColor']
    .map((key) => String(theme?.[key] || '').toLowerCase())
    .join('|');

// Bump when the recolouring itself changes (lib/recolor.js), so browsers and the
// CDN drop images cached under the old algorithm. History: 2 = added the hair shine.
const RECOLOR_VERSION = 2;

// A visitor's own template (lib/visitorTheme.js) is named in the URL, so the
// response depends on the URL alone and can be cached by it. Only a template key
// is ever sent — never colours.
const forVisitor = (theme) => (theme?.visitor ? `&t=${encodeURIComponent(theme.preset)}` : '');

/** The profile picture, recoloured. `variant` is "light" or "dark". */
export function portraitUrl(variant, theme, src) {
  if (!src) return src;
  return `/api/profile-image/${variant}?v=${hash(`${RECOLOR_VERSION}|${themeText(theme)}|${src}`)}${forVisitor(theme)}`;
}

/**
 * The same URL, for a theme state the browser knows about but the server has not
 * rendered yet: `{ preset, visitor }` as the theme provider holds it, plus the
 * site's own colours. Gives exactly the URL the server would, so an image
 * preloaded here is the one the page later asks for.
 */
export function portraitFor(variant, { preset, visitor }, siteColours, src) {
  const colours = visitor ? presetTheme(preset) : null;
  return portraitUrl(variant, colours ? { ...colours, preset, visitor: true } : siteColours, src);
}
