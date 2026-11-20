'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * A single back-to-top button for the whole site. It replaces the one the
 * gallery built for itself (an unlabelled "↑" glyph, only on the country view),
 * so long pages everywhere get the same control, in the same place.
 */
export default function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`vx-scrolltop${show ? ' is-visible' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
      // Out of the tab order while invisible, so keyboard users don't land on
      // an element they can't see.
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
