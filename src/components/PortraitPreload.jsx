'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { THEME_PRESETS } from '@/lib/themePresets';
import { portraitFor } from '@/lib/portrait';

const TEMPLATES = THEME_PRESETS.filter((p) => p.theme);

/**
 * Warms the browser cache with every recolouring of the portrait — the site's own
 * and each template, in both light and dark — so choosing a theme swaps the
 * picture with no wait. It starts once the page has loaded and the browser is
 * idle, one image at a time, the current light/dark mode first; each response is
 * cached "forever" (see lib/portrait.js), so this costs bandwidth once per visitor.
 * Skipped on data-saver connections.
 *
 * Renders nothing. The images are kept in a ref so the decoded copies stay in memory.
 */
export default function PortraitPreload({ light, dark }) {
  const { sitePreset, siteColours } = useTheme();
  const kept = useRef([]);
  const colours = useRef(siteColours);
  colours.current = siteColours;

  useEffect(() => {
    if (navigator.connection?.saveData) return undefined;
    let stopped = false;

    const run = async () => {
      const mode = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
      const states = [{ preset: sitePreset, visitor: false }, ...TEMPLATES.map((t) => ({ preset: t.key, visitor: true }))];
      for (const variant of [mode, mode === 'dark' ? 'light' : 'dark']) {
        const src = variant === 'light' ? light : dark;
        for (const state of states) {
          if (stopped || !src) break;
          const img = new Image();
          img.src = portraitFor(variant, state, colours.current, src);
          kept.current.push(img);
          // One at a time, so this never competes with the page itself.
          // eslint-disable-next-line no-await-in-loop
          await img.decode().catch(() => {});
        }
      }
    };

    const start = () => (window.requestIdleCallback ? window.requestIdleCallback(run) : setTimeout(run, 1500));
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      stopped = true;
      window.removeEventListener('load', start);
    };
  }, [light, dark, sitePreset]);

  return null;
}
