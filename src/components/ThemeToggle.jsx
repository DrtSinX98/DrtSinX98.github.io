'use client';

import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import VisitorThemePicker from './VisitorThemePicker';
import { useTheme } from './ThemeProvider';
import { VISITOR_COOKIE } from '@/lib/themePresets';

const RAPID_CLICKS = 5; // this many clicks…
const RAPID_WINDOW_MS = 1500; // …within this long unlocks the picker
const LONG_PRESS_MS = 600; // hold this long to open it once unlocked
const UNLOCKED_KEY = 'vx-theme-picker';

// Storage can throw (private windows, blocked cookies); the egg just stays locked.
const isUnlocked = () => {
  try {
    return localStorage.getItem(UNLOCKED_KEY) === '1';
  } catch {
    return false;
  }
};
const remember = () => {
  try {
    localStorage.setItem(UNLOCKED_KEY, '1');
  } catch {
    /* nothing to do */
  }
};

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
 * Easter egg: click it five times quickly and a colour-template picker opens;
 * from then on, pressing and holding the button (or holding Enter/Space on it)
 * opens it again. The choice is a cookie in the visitor's own browser — it
 * changes what they see and nothing else (see lib/visitorTheme.js).
 */
export default function ThemeToggle() {
  const { theme, toggleTheme, visitorPreset } = useTheme();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState(visitorPreset);
  const clicks = useRef([]);
  const holdTimer = useRef(null);
  const wasHeld = useRef(false);
  const button = useRef(null);

  useEffect(() => setChosen(visitorPreset), [visitorPreset]);
  useEffect(() => () => clearTimeout(holdTimer.current), []);

  const close = useCallback(() => {
    setOpen(false);
    button.current?.focus();
  }, []);

  const startHold = () => {
    wasHeld.current = false;
    clearTimeout(holdTimer.current);
    if (!isUnlocked() && !visitorPreset) return;
    holdTimer.current = setTimeout(() => {
      wasHeld.current = true;
      setOpen(true);
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

    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < RAPID_WINDOW_MS), now];
    if (clicks.current.length >= RAPID_CLICKS) {
      clicks.current = [];
      remember();
      setOpen(true);
    }
  };

  const pick = (key) => {
    setChosen(key);
    // `key` null = back to the site's own theme.
    document.cookie = key
      ? `${VISITOR_COOKIE}=${key}; path=/; max-age=31536000; samesite=lax`
      : `${VISITOR_COOKIE}=; path=/; max-age=0; samesite=lax`;
    // Re-render on the server, which now reads the cookie: colours, portrait,
    // illustrations, logo and particles all follow.
    startTransition(() => router.refresh());
  };

  return (
    <div className="vx-themewrap">
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
        onContextMenu={(e) => (isUnlocked() || visitorPreset) && e.preventDefault()}
      >
        <Icon name="sun" className="vx-themebtn__sun" />
        <Icon name="moon" className="vx-themebtn__moon" />
      </button>

      {open && <VisitorThemePicker chosen={chosen} onPick={pick} onClose={close} anchor={button} />}
    </div>
  );
}
