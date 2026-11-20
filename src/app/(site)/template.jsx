'use client';

import * as m from 'motion/react-m';

/**
 * Route transition.
 *
 * Next remounts `template.jsx` on every navigation (unlike `layout.jsx`, which
 * persists), so a plain mount animation gives a per-route enter transition with
 * no AnimatePresence bookkeeping. There is no exit half: the outgoing tree is
 * already gone by the time this mounts.
 *
 * `data-reveal` lets the root layout's <noscript> rule force this visible when
 * JS never runs — otherwise the server-rendered `opacity: 0` would hide the
 * entire page.
 */
export default function Template({ children }) {
  return (
    <m.div
      data-reveal
      initial={{ opacity: 0, transform: 'translateY(8px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 0.35, ease: [0.2, 0, 0.2, 1] }}
    >
      {children}
    </m.div>
  );
}
