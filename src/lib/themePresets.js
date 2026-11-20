/**
 * Theme presets: ready-made values for the four colours the whole interface is
 * derived from (see styles/index.css). Each one works in light and dark mode:
 * the light theme uses `tertiary` as the page and `primary` as the ink; the dark
 * theme uses `primaryDark` as the page and `tertiary` as the ink, and `primary`
 * tints its cards.
 *
 * How they were made: Rosé is the original. The others keep its structure — the
 * same saturation and lightness for each of the four roles — and only move the
 * hue (Newspaper drops it altogether). Every one was then checked against the
 * contrast formulas the site itself uses, in both modes:
 *
 *   - white text on the accent (buttons, the active nav pill)          >= 4.5:1
 *   - accent as text, on the page and on cards, light and dark         >= 4.5:1
 *   - body text on the page, light and dark                            >= 7:1
 *   - muted text                                                       >= 4.5:1
 *   - the accent as a shape against the page, light and dark           >= 3:1
 *
 * That last one is why Newspaper's accent is #666 rather than a darker grey: at
 * #525252 it all but vanished against the near-black dark page. Lime is dark for
 * the opposite reason: a bright yellow cannot carry white button text or readable
 * link text on a cream page, so its accent is a golden olive (#7a7600).
 *
 * `manual` has no colours of its own — it means "whatever is typed in".
 */

export const THEME_PRESETS = [
  {
    key: 'rose',
    label: 'Rosé',
    blurb: 'Magenta on lavender. The original.',
    theme: { primaryColor: '#301934', secondaryColor: '#c91574', tertiaryColor: '#eeeafc', primaryColorDark: '#130A15' },
  },
  {
    key: 'forest',
    label: 'Forest',
    blurb: 'Deep greens on mint.',
    theme: { primaryColor: '#1a3225', secondaryColor: '#147b44', tertiaryColor: '#eaf6ee', primaryColorDark: '#09100d' },
  },
  {
    key: 'ocean',
    label: 'Ocean',
    blurb: 'Blues on a pale sky.',
    theme: { primaryColor: '#162841', secondaryColor: '#1860bf', tertiaryColor: '#eaf2fa', primaryColorDark: '#080e17' },
  },
  {
    key: 'autumn',
    label: 'Autumn',
    blurb: 'Burnt orange and rust on cream.',
    theme: { primaryColor: '#361e16', secondaryColor: '#b4400e', tertiaryColor: '#faf0e5', primaryColorDark: '#150c09' },
  },
  {
    key: 'newspaper',
    label: 'Newspaper',
    blurb: 'Black, grey and newsprint.',
    theme: { primaryColor: '#1a1a1a', secondaryColor: '#666666', tertiaryColor: '#f1f0ed', primaryColorDark: '#0f0f0f' },
  },
  {
    key: 'lime',
    label: 'Lime',
    blurb: 'Golden olive on butter yellow.',
    theme: { primaryColor: '#343319', secondaryColor: '#7a7600', tertiaryColor: '#fbfae7', primaryColorDark: '#15140a' },
  },
  {
    key: 'hell',
    label: 'Hell',
    blurb: 'Fire-engine red on blush.',
    theme: { primaryColor: '#341919', secondaryColor: '#d91212', tertiaryColor: '#fbe8e7', primaryColorDark: '#150a0a' },
  },
  {
    key: 'amethyst',
    label: 'Amethyst',
    blurb: 'Violet on pale lilac.',
    theme: { primaryColor: '#281934', secondaryColor: '#9343d0', tertiaryColor: '#f2e6fb', primaryColorDark: '#100a15' },
  },
  {
    key: 'ladybird',
    label: 'Ladybird',
    blurb: 'Black, red and white.',
    theme: { primaryColor: '#161616', secondaryColor: '#d8141c', tertiaryColor: '#fafafa', primaryColorDark: '#0b0b0b' },
  },
  {
    key: 'manual',
    label: 'Manual',
    blurb: 'Choose every colour yourself.',
    theme: null,
  },
];

export const DEFAULT_PRESET = 'rose';

/** The cookie a visitor's own theme choice is kept in (see lib/visitorTheme.js). */
export const VISITOR_COOKIE = 'vx-theme';

/**
 * The four colours of a named template, or null for anything else — including
 * `manual` and unknown keys. The only way a request can pick colours, so the
 * public image routes stay limited to this fixed list.
 */
export function presetTheme(key) {
  return THEME_PRESETS.find((p) => p.key === key)?.theme || null;
}

const COLOUR_KEYS = ['primaryColor', 'secondaryColor', 'tertiaryColor', 'primaryColorDark'];

const same = (a, b) => String(a || '').toLowerCase() === String(b || '').toLowerCase();

/** True when `theme` has exactly the preset's four colours. */
export function matchesPreset(theme = {}, preset) {
  return Boolean(preset?.theme) && COLOUR_KEYS.every((key) => same(theme[key], preset.theme[key]));
}

/**
 * Which preset a saved theme is. A site saved before presets existed has no
 * `preset` field, and one whose colours were edited by hand may carry a stale
 * one, so the colours have the last word: a named preset only counts if the
 * colours really are its own.
 */
export function presetOf(theme = {}) {
  const named = THEME_PRESETS.find((p) => p.key === theme.preset);
  if (named?.key === 'manual') return 'manual';
  if (named && matchesPreset(theme, named)) return named.key;

  const found = THEME_PRESETS.find((p) => matchesPreset(theme, p));
  return found ? found.key : 'manual';
}

/** The four colours with defaults filled in, so callers never see `undefined`. */
export function resolveTheme(theme = {}) {
  const base = THEME_PRESETS[0].theme;
  return Object.fromEntries(COLOUR_KEYS.map((key) => [key, theme[key] || base[key]]));
}
