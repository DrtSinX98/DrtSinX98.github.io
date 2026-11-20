'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

/**
 * The constellation behind the site — kept, but rebalanced.
 *
 *   - It sits *behind* the page (z-index -1) rather than competing with it, and
 *     the particles are smaller and sparser so text stays the loudest thing.
 *   - Hovering used to scatter the particles away from the cursor; now they
 *     reach *toward* it and draw lines to it (`grab`), which reads as the
 *     network noticing you instead of flinching.
 *   - The Admin -> Settings values still drive count, colour, link distance and
 *     opacity. Speed is scaled down: the stored default of 2 was a lot of
 *     movement for a background.
 *   - Under reduced motion the field is drawn but frozen.
 */
const SPEED_SCALE = 0.35;
const COUNT_SCALE = 0.6;

const ParticlesBG = ({ config = {} }) => {
  const [init, setInit] = useState(false);
  const reduced = usePrefersReducedMotion();

  const {
    enabled = true,
    color = '#c91574',
    count = 150,
    speed = 2,
    linkDistance = 150,
    linkOpacity = 0.3,
    opacity = 0.4,
  } = config;

  useEffect(() => {
    if (!enabled) return;
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [enabled]);

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      fpsLimit: 60,
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      interactivity: {
        // Listen on the window: the canvas sits behind the content, so it would
        // otherwise never see the pointer.
        detectsOn: 'window',
        events: {
          onClick: { enable: false },
          onHover: { enable: !reduced, mode: 'grab' },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: Math.max(120, linkDistance), links: { opacity: Math.min(1, linkOpacity + 0.25) } },
        },
      },
      particles: {
        color: { value: color },
        links: {
          color,
          distance: linkDistance,
          enable: true,
          opacity: linkOpacity,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: !reduced,
          outModes: { default: 'bounce' },
          random: false,
          speed: Math.max(0.15, speed * SPEED_SCALE),
          straight: false,
        },
        number: {
          density: { enable: true },
          value: Math.max(24, Math.round(count * COUNT_SCALE)),
        },
        opacity: { value: opacity },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
    }),
    [color, count, speed, linkDistance, linkOpacity, opacity, reduced],
  );

  if (init && enabled) {
    return <Particles id="tsparticles" options={options} />;
  }

  return null;
};

export default ParticlesBG;
