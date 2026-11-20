/**
 * Re-colours the site's artwork to follow the chosen theme.
 *
 * The artwork was drawn in Rosé, and is made of almost nothing else: the profile
 * pictures are five colours (dark purple, magenta, lavender, a mid lavender for
 * shading and a plum for the shine on the hair) plus the antialiasing between them, and each page illustration is
 * a single magenta over neutrals. That is what makes this tractable — there are
 * no skin tones or photographs to protect, so it is a palette swap rather than a
 * hue shift (which would turn a face green).
 *
 * Pure functions, no imports: runs under plain node, so it can be tested and
 * previewed outside the app.
 */

/* ------------------------------------------------------------------- colour */

export const hexToRgb = (hex) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export const rgbToHex = (rgb) =>
  `#${rgb.map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('')}`;

/* --------------------------------------------------------------- the source */

/** The colours the artwork was drawn in, measured from the images. */
const SOURCE = {
  dark: [0x32, 0x17, 0x36],
  accent: [0xc9, 0x15, 0x74],
  light: [0xeb, 0xe5, 0xfd],
  mid: [0xd0, 0xac, 0xea],
  shine: [0x53, 0x26, 0x54], // the highlights on the hair
};

/** The theme Rosé is made of: no recolouring needed when it is the active one. */
export const SOURCE_THEME = {
  primaryColor: '#301934',
  secondaryColor: '#c91574',
  tertiaryColor: '#eeeafc',
};

export const SOURCE_ACCENT = '#c91574';

/**
 * The mid-lavender is not a theme colour of its own; it is how the artwork
 * shades the lavender. Measured against the three theme colours it comes out as
 * ~77% light, ~15% accent, ~8% dark — so it is rebuilt that way for any theme.
 */
const MID_WEIGHTS = { light: 0.774, accent: 0.146, dark: 0.081 };

/**
 * The hair highlight is likewise a tint of the dark (79%) toward the accent (12%)
 * and the light (9%). Without it the nearest anchor is the dark, and the shine
 * disappears on every theme but Rosé.
 */
const SHINE_WEIGHTS = { dark: 0.79, accent: 0.12, light: 0.09 };

const mix = (weights, { dark, accent, light }) =>
  [0, 1, 2].map((i) => weights.dark * dark[i] + weights.accent * accent[i] + weights.light * light[i]);

/** The five anchor colours for a theme, in the same order as SOURCE. */
function targetAnchors(theme) {
  const dark = hexToRgb(theme.primaryColor);
  const accent = hexToRgb(theme.secondaryColor);
  const light = hexToRgb(theme.tertiaryColor);
  if (!dark || !accent || !light) return null;

  const parts = { dark, accent, light };
  return [dark, accent, light, mix(MID_WEIGHTS, parts), mix(SHINE_WEIGHTS, parts)];
}

const SOURCE_ANCHORS = [SOURCE.dark, SOURCE.accent, SOURCE.light, SOURCE.mid, SOURCE.shine];

/** True when recolouring would change nothing. */
export function isSourceTheme(theme) {
  const t = (key) => String(theme?.[key] || '').toLowerCase();
  return (
    t('primaryColor') === SOURCE_THEME.primaryColor &&
    t('secondaryColor') === SOURCE_THEME.secondaryColor &&
    t('tertiaryColor') === SOURCE_THEME.tertiaryColor
  );
}

/* ------------------------------------------------------------------- raster */

/**
 * Maps one source colour to the target palette.
 *
 * Each pixel is closest to one of the five anchors, or lies between two where
 * the artwork antialiases an edge. Inverse-distance weighting (a steep power, so
 * a pixel on an anchor stays exactly on it) blends the target anchors in the
 * same proportions, which carries those soft edges across cleanly.
 */
function mapPixel(r, g, b, targets, out, offset) {
  let totalWeight = 0;
  let outR = 0;
  let outG = 0;
  let outB = 0;

  for (let i = 0; i < SOURCE_ANCHORS.length; i += 1) {
    const s = SOURCE_ANCHORS[i];
    const dr = r - s[0];
    const dg = g - s[1];
    const db = b - s[2];
    const d2 = dr * dr + dg * dg + db * db;

    if (d2 < 4) {
      // Effectively on the anchor: take its target exactly.
      out[offset] = targets[i][0];
      out[offset + 1] = targets[i][1];
      out[offset + 2] = targets[i][2];
      return;
    }
    const w = 1 / (d2 * d2); // distance^4
    totalWeight += w;
    outR += w * targets[i][0];
    outG += w * targets[i][1];
    outB += w * targets[i][2];
  }

  out[offset] = outR / totalWeight;
  out[offset + 1] = outG / totalWeight;
  out[offset + 2] = outB / totalWeight;
}

/**
 * Re-colours raw pixel data in place-compatible form.
 *
 * @param {Uint8Array|Buffer} pixels  interleaved samples, `channels` per pixel
 * @param {number} channels           3 (RGB) or 4 (RGBA — alpha is left alone)
 * @param {object} theme              { primaryColor, secondaryColor, tertiaryColor }
 * @returns {Uint8Array} a new buffer of the same layout
 */
export function recolorRaster(pixels, channels, theme) {
  const targets = targetAnchors(theme);
  const result = new Uint8Array(pixels.length);
  if (!targets) {
    result.set(pixels);
    return result;
  }

  const px = [0, 0, 0];
  for (let i = 0; i < pixels.length; i += channels) {
    mapPixel(pixels[i], pixels[i + 1], pixels[i + 2], targets, px, 0);
    result[i] = Math.round(px[0]);
    result[i + 1] = Math.round(px[1]);
    result[i + 2] = Math.round(px[2]);
    if (channels === 4) result[i + 3] = pixels[i + 3];
  }
  return result;
}

/* ---------------------------------------------------------------------- svg */

/**
 * The page illustrations use one themed colour, #c91574, over neutrals and
 * transparency layers, so recolouring is an exact swap. Matches the forms the
 * artwork actually uses (any case, `fill:` styles and attributes).
 */
export function recolorSvg(markup, theme) {
  const accent = hexToRgb(theme?.secondaryColor);
  if (!accent || isSourceTheme(theme)) return markup;
  const hex = rgbToHex(accent);
  return markup
    .replace(/#c91574\b/gi, hex)
    .replace(/rgb\(\s*201\s*,\s*21\s*,\s*116\s*\)/gi, hex);
}

/** A short stable hash of the colours, for cache-busting recoloured URLs. */
export function themeKey(theme) {
  const text = ['primaryColor', 'secondaryColor', 'tertiaryColor']
    .map((k) => String(theme?.[k] || '').toLowerCase().replace('#', ''))
    .join('');
  return text || 'default';
}
