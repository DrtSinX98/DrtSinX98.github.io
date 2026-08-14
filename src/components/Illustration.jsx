import React from 'react';
import { Image } from 'react-bootstrap';

/**
 * Page illustration.
 *
 * When the server managed to inline the SVG (see `lib/illustrations.js`) the
 * markup is dropped in so `styles/illustrations.css` can animate each layer.
 * Otherwise this renders exactly the <img> the page used before — a raster
 * upload, an unreachable CDN or a disabled animation all land here.
 */
export default function Illustration({ illustration, src, alt, className = '', animate = true }) {
  if (!animate || !illustration?.markup) {
    return (
      <span className={['vx-illustration', animate && 'is-raster', className].filter(Boolean).join(' ')}>
        <Image src={src} alt={alt} fluid />
      </span>
    );
  }

  const classes = ['vx-illustration', illustration.selfAnimated && 'is-self-animated', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      role="img"
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: illustration.markup }}
    />
  );
}
