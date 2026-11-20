import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LUCIDE_ICONS, BRAND_ICONS } from '@/lib/icons';
import { Link as LinkIcon } from 'lucide-react';

/**
 * One entry point for both icon families (see lib/icons.js).
 *
 * `size` keeps the Font Awesome vocabulary the call sites already used ("lg",
 * "2x", "3x") so swapping the library didn't mean re-tuning every icon, and
 * resolves to em units — icons then scale with their surrounding text instead
 * of being pinned to a pixel size.
 */
const SIZES = {
  xs: '0.75em',
  sm: '0.875em',
  lg: '1.25em',
  '2x': '2em',
  '3x': '3em',
  '4x': '4em',
};

export default function Icon({ name, size, className, title, ...rest }) {
  const dimension = SIZES[size] || (size ? String(size) : '1em');
  const brand = BRAND_ICONS[name];

  if (brand) {
    return (
      <FontAwesomeIcon
        icon={brand}
        className={className}
        style={{ width: dimension, height: dimension }}
        title={title}
        {...rest}
      />
    );
  }

  const Glyph = LUCIDE_ICONS[name] || LinkIcon;

  return (
    <Glyph
      width={dimension}
      height={dimension}
      className={className}
      // Decorative by default: these sit beside a text label almost everywhere.
      // Pass a title to opt into an accessible name.
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      aria-label={title}
      {...rest}
    />
  );
}
