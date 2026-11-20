'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the OS "reduce motion" setting. CSS handles most motion on its own,
 * but a few things only JavaScript can stop: the typewriter, the blob morph,
 * SMIL orbit dots and the particle field.
 *
 * Starts as `false` so server and first client render agree, then corrects.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
