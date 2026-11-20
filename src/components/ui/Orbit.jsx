'use client';

import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

/**
 * Two tilted electron orbits — the site's recurring ornament, a nod to the
 * element tile in the logo. Used around the profile blob and behind every page
 * illustration so the whole site shares one visual idea.
 *
 * Flat strokes only. The electrons ride the rings with SMIL `animateMotion`
 * (works everywhere, no JS per frame); under reduced motion they simply sit
 * still on the ring, because SMIL ignores `prefers-reduced-motion` on its own.
 *
 * Sizes itself to its parent — position it absolutely and let it overflow.
 */
const FORWARD = 'M 97 50 A 47 17 0 1 1 3 50 A 47 17 0 1 1 97 50 Z';
const BACKWARD = 'M 97 50 A 47 17 0 1 0 3 50 A 47 17 0 1 0 97 50 Z';

function Electron({ path, dur, reduced }) {
  return (
    <circle className="vx-orbit__dot" r="1.7" cx={reduced ? 97 : 0} cy={reduced ? 50 : 0}>
      {reduced ? null : <animateMotion dur={dur} repeatCount="indefinite" path={path} />}
    </circle>
  );
}

export default function Orbit({ className = '' }) {
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      className={`vx-orbit ${className}`.trim()}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="rotate(-28 50 50)">
        <ellipse className="vx-orbit__ring" cx="50" cy="50" rx="47" ry="17" />
        <Electron path={FORWARD} dur="19s" reduced={reduced} />
      </g>
      <g transform="rotate(28 50 50)">
        <ellipse className="vx-orbit__ring" cx="50" cy="50" rx="47" ry="17" />
        <Electron path={BACKWARD} dur="27s" reduced={reduced} />
      </g>
    </svg>
  );
}
