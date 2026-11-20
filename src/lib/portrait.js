/**
 * URLs for artwork that is re-coloured to match the theme (see lib/recolor.js and
 * the two routes under app/api).
 *
 * Each URL carries `v`, a short hash of everything the result depends on — the
 * theme colours and, for the portraits, the source image. When any of those
 * change, the URL changes, so the response can be cached "forever" by browsers
 * and the CDN without ever going stale. Pure functions: usable on the server
 * (to build the URLs) and in plain node.
 */

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

/** The profile picture, recoloured. `variant` is "light" or "dark". */
export function portraitUrl(variant, theme, src) {
  if (!src) return src;
  return `/api/profile-image/${variant}?v=${hash(`${themeText(theme)}|${src}`)}`;
}

/** A page illustration, recoloured. Used for the small thumbnails on Home. */
export function artUrl(name, theme) {
  return `/api/theme-art/${name}?v=${hash(themeText(theme))}`;
}
