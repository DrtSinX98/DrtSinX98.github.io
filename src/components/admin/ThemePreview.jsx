'use client';

import React from 'react';
import { CircleCheck, TriangleAlert } from 'lucide-react';

/**
 * Live preview of the four theme colours, with a contrast check.
 *
 * The preview panels use the colours directly (inline), not the site's tokens:
 * those are resolved once at the page root from the *saved* theme, so they would
 * not react to unsaved edits. The "accent as text" shades mirror the formulas in
 * styles/index.css (darkened on light, lifted toward white on dark), so what
 * you see here is what the site will render.
 */

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));

function parse(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const toHex = ([r, g, b]) => `#${[r, g, b].map((c) => clamp(c).toString(16).padStart(2, '0')).join('')}`;

/** `amount` of `a` mixed with the rest `b` (0..1), like color-mix(in srgb). */
const mix = (a, b, amount) => a.map((c, i) => c * amount + b[i] * (1 - amount));

function luminance([r, g, b]) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const WHITE = [255, 255, 255];
const BLACK = [0, 0, 0];

function Check({ label, ratio }) {
  const pass = ratio >= 4.5;
  return (
    <li className={`admin-preview__check${pass ? ' is-pass' : ' is-fail'}`}>
      {pass ? <CircleCheck size={16} aria-hidden="true" /> : <TriangleAlert size={16} aria-hidden="true" />}
      <span>{label}</span>
      <strong>
        {ratio.toFixed(1)}:1 <span>{pass ? 'passes AA' : 'low contrast'}</span>
      </strong>
    </li>
  );
}

export default function ThemePreview({ theme = {} }) {
  const primary = parse(theme.primaryColor);
  const accent = parse(theme.secondaryColor);
  const light = parse(theme.tertiaryColor);
  const dark = parse(theme.primaryColorDark);

  if (!primary || !accent || !light || !dark) {
    return <p className="field-hint">Enter four valid colours to see a preview.</p>;
  }

  // Same formulas as styles/index.css.
  const accentOnLight = mix(accent, BLACK, 0.88);
  const accentOnDark = mix(accent, WHITE, 0.66);

  const panel = (name, bg, fg, accentText) => (
    <div className="admin-preview__panel" style={{ background: toHex(bg), color: toHex(fg) }}>
      <span className="admin-preview__name">{name}</span>
      <p className="admin-preview__title">
        Hello, <span style={{ color: toHex(accentText) }}>world</span>
      </p>
      <p className="admin-preview__text">Body copy sits on the page colour.</p>
      <span className="admin-preview__button" style={{ background: toHex(accent) }}>
        Button
      </span>
    </div>
  );

  return (
    <div className="admin-preview">
      <div className="admin-preview__panels" aria-hidden="true">
        {panel('Light theme', light, primary, accentOnLight)}
        {panel('Dark theme', dark, light, accentOnDark)}
      </div>
      <ul className="admin-preview__checks" aria-label="Contrast checks">
        <Check label="White text on the accent (buttons)" ratio={contrast(WHITE, accent)} />
        <Check label="Accent text on the light theme" ratio={contrast(accentOnLight, light)} />
        <Check label="Accent text on the dark theme" ratio={contrast(accentOnDark, dark)} />
      </ul>
    </div>
  );
}
