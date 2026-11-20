'use client';

import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

/**
 * Two tilted electron orbits, each with two electrons on opposite sides — the
 * site's recurring ornament, a nod to the element tile in the logo. Used around the profile blob and behind every page
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

// `lap` is how far round the ring (0–1) the electron starts. The second electron
// on each ring starts half a lap on, so the pair stay opposite one another: a
// negative `begin` runs the animation as if it had started that long ago.
function Electron({ path, dur, lap = 0, reduced }) {
  // At rest the ring's two ends, which are opposite each other.
  const at = lap === 0 ? [97, 50] : [3, 50];
  return (
    <circle className="vx-orbit__dot" r="1.7" cx={reduced ? at[0] : 0} cy={reduced ? at[1] : 0}>
      {reduced ? null : (
        <animateMotion dur={`${dur}s`} begin={lap ? `-${dur * lap}s` : '0s'} repeatCount="indefinite" path={path} />
      )}
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
        <Electron path={FORWARD} dur={19} reduced={reduced} />
        <Electron path={FORWARD} dur={19} lap={0.5} reduced={reduced} />
      </g>
      <g transform="rotate(28 50 50)">
        <ellipse className="vx-orbit__ring" cx="50" cy="50" rx="47" ry="17" />
        <Electron path={BACKWARD} dur={27} reduced={reduced} />
        <Electron path={BACKWARD} dur={27} lap={0.5} reduced={reduced} />
      </g>
    </svg>
  );
}
