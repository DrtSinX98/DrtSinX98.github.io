'use client';

import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import ThemePill from './ThemePill';
import { useTheme } from './ThemeProvider';
import { VISITOR_COOKIE } from '@/lib/themePresets';

const LONG_PRESS_MS = 600; // hold this long to open the theme pill

/**
 * One theme control for every screen size — it replaces a hidden-on-mobile
 * checkbox switch and a separate mobile button, which gave the page two
 * differently-labelled controls for the same thing.
 *
 * Which icon shows is decided in CSS from the `data-bs-theme` attribute that the
 * inline script sets before first paint, so the right icon is there from the
 * first frame with nothing to hydrate. `role="switch"` + `aria-checked` carry
 * the state for assistive tech.
 *
 * Press and hold the button (or hold Enter/Space on it) and the circle stretches
 * into a pill showing the current colour template; click the pill to see them all. The
 * choice is a cookie in the visitor's own browser — it changes what they see and
 * nothing else (see lib/visitorTheme.js).
 */
export default function ThemeToggle() {
  const { theme, toggleTheme, preset, sitePreset, visitor } = useTheme();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [phase, setPhase] = useState('closed'); // closed | pill | list
  const holdTimer = useRef(null);
  const wasHeld = useRef(false);
  const button = useRef(null);

  useEffect(() => () => clearTimeout(holdTimer.current), []);

  const close = useCallback(() => {
    setPhase('closed');
    button.current?.focus();
  }, []);

  const startHold = () => {
    wasHeld.current = false;
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => {
      wasHeld.current = true;
      setPhase((p) => (p === 'closed' ? 'pill' : p));
    }, LONG_PRESS_MS);
  };
  const endHold = () => clearTimeout(holdTimer.current);

  const onClick = () => {
    // The release at the end of a long press is not a click on the switch.
    if (wasHeld.current) {
      wasHeld.current = false;
      return;
    }
    toggleTheme();
  };

  const pick = (key) => {
    // `key` null = back to the site's own theme.
    document.cookie = key
      ? `${VISITOR_COOKIE}=${key}; path=/; max-age=31536000; samesite=lax`
      : `${VISITOR_COOKIE}=; path=/; max-age=0; samesite=lax`;
    setPhase('closed');
    // Re-render on the server, which now reads the cookie: colours, portrait,
    // illustrations, logo and particles all follow.
    startTransition(() => router.refresh());
  };

  return (
    <div className="vx-themewrap">
      <ThemePill
        phase={phase}
        setPhase={setPhase}
        preset={preset}
        sitePreset={sitePreset}
        visitor={visitor}
        onPick={pick}
        onClose={close}
      >
        <button
          ref={button}
          type="button"
          role="switch"
          aria-checked={theme === 'dark'}
          aria-label="Dark mode"
          className="vx-themebtn"
          onClick={onClick}
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          onPointerCancel={endHold}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !e.repeat && startHold()}
          onKeyUp={endHold}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Icon name="sun" className="vx-themebtn__sun" />
          <Icon name="moon" className="vx-themebtn__moon" />
        </button>
      </ThemePill>
    </div>
  );
}
