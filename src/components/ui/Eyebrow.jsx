import React from 'react';
import { PAGE_META } from '@/lib/pages';

/**
 * The small label above a page title: a periodic-table "element tile" (page
 * number and symbol) followed by a mono caption. Purely wayfinding — the tile is
 * decorative, the caption carries the meaning.
 */
export function ElementTile({ page, size = 'md' }) {
  const meta = PAGE_META[page];
  if (!meta) return null;
  return (
    <span className={`vx-tile vx-tile--${size}`} aria-hidden="true">
      <i>{meta.num}</i>
      <b>{meta.code}</b>
    </span>
  );
}

export default function Eyebrow({ page, children, className = '' }) {
  return (
    <p className={`vx-eyebrow ${className}`.trim()}>
      <ElementTile page={page} />
      {children ? <span className="vx-eyebrow__text">{children}</span> : null}
    </p>
  );
}
