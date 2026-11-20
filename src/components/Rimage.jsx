'use client';

import { useState, useEffect, useId } from 'react';
import { useSpring, animated } from '@react-spring/web';
import blobshape from 'blobshape';
import Orbit from './ui/Orbit';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

/**
 * The hero portrait: the same living, morphing blob as before, now square-framed
 * (so it scales cleanly to any width) and ringed by two electron orbits.
 */
function Rimage({ light, dark }) {
  // The blob paths are randomised on every frame, so they can't be server
  // rendered. The fixed-ratio wrapper below is, which keeps the layout stable.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="vx-hero__visual">
      <div className="vx-blob">
        <Orbit className="vx-blob__orbit" />
        {mounted && (
          <>
            <Blob color="var(--secondary-color)" style={{ opacity: 0.8 }} />
            <Blob color="var(--primary-color)" style={{ opacity: 1 }} />
            <Blob color="var(--secondary-color)" style={{ opacity: 1 }} />
            <Blob image light={light} dark={dark} style={{ opacity: 0.95 }} />
          </>
        )}
      </div>
    </div>
  );
}

function getRandomPath() {
  return blobshape({
    growth: 8,
    edges: 15,
  }).path;
}

function Blob(props) {
  // Imperative API on purpose. The original declared `to`/`from` inline and
  // relied on `onRest` re-rendering with fresh random paths to keep going; under
  // React 18 that spring settles on its target without ever animating. Driving
  // the loop explicitly gives the same continuous morph and survives the
  // double-mount that Strict Mode does in development.
  const [{ path }, api] = useSpring(() => ({ path: getRandomPath() }));
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Hold the current shape rather than morphing forever. The blob still
    // renders — it just stops moving.
    if (reducedMotion) {
      api.stop();
      return undefined;
    }

    let cancelled = false;
    const duration = props.image ? 3000 : 2000;

    const morph = async () => {
      while (!cancelled) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.all(api.start({ path: getRandomPath(), config: { duration } }));
      }
    };
    morph();

    return () => {
      cancelled = true;
      api.stop();
    };
  }, [api, props.image, reducedMotion]);

  // Was a hardcoded id="a" — a document-wide identifier from a component that
  // renders four times on the page.
  const clipId = `blob-clip-${useId().replace(/:/g, '')}`;

  return (
    <svg
      className="vx-blob__layer"
      // blobshape draws in a 400-unit box and the portrait fills exactly that
      // box. Shifting the viewBox (rather than moving the shapes) centres the
      // blob in its square frame without disturbing the clip alignment. The
      // margin (12 units each side, was 50) sets how much of the frame the blob
      // fills: ~94%, up from 80%. Keep it above the few units a morphing blob
      // can overshoot its box by, or its edge would be clipped.
      viewBox="-12 -12 424 424"
      style={props.style}
      aria-hidden={props.image ? undefined : true}
      role={props.image ? 'img' : undefined}
      aria-label={props.image ? 'Profile portrait' : undefined}
    >
      {!props.image && <animated.path fill={props.color} d={path} />}

      {props.image && (
        <>
          <defs>
            <clipPath id={clipId}>
              <animated.path fill={props.color} d={path} />
            </clipPath>
          </defs>
          {/* Explicit user units: a percentage would resolve against the viewBox. */}
          <image
            className="pfp-light"
            width="400"
            height="400"
            clipPath={`url(#${clipId})`}
            href={props.light}
            preserveAspectRatio="xMidYMid slice"
          />
          <image
            className="pfp-dark"
            width="400"
            height="400"
            clipPath={`url(#${clipId})`}
            href={props.dark}
            preserveAspectRatio="xMidYMid slice"
          />
        </>
      )}
    </svg>
  );
}

export default Rimage;
