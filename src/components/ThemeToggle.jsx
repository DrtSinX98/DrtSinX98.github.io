'use client';

import React, { useCallback, useEffect, useId, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import ThemePill from './ThemePill';
import { useTheme } from './ThemeProvider';
import { VISITOR_COOKIE } from '@/lib/themePresets';
import { morph, morphOrigin } from '@/lib/themeMorph';

const LONG_PRESS_MS = 600; // hold this long to open the theme pill
const USED_KEY = 'vx-theme-used'; // set once the visitor has opened the pill
const HINT_KEY = 'vx-theme-hint'; // how many times the hint has been shown
const HINT_MAX = 3; // …before it stops appearing
const HINT_DELAY_MS = 350; // hover this long before it shows
const TOUCH_DELAY_MS = 3000; // on touch screens: after the page has settled…
const TOUCH_SHOWN_MS = 5000; // …shown this long, since there is no pointer to leave

// Storage can throw (private windows, blocked cookies); the hint then just shows.
const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
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
 * Press and hold the button (or hold Enter/Space on it) and the circle stretches
 * into a pill showing the current colour template; click the pill to see them all. The
 * choice is a cookie in the visitor's own browser — it changes what they see and
 * nothing else (see lib/visitorTheme.js).
 *
 * A visitor who has not found the long press yet gets a small hint when they
 * hover (or keyboard-focus) the button — at most three times, and never once they
 * have opened the pill. Touch has no hover, so there it appears by itself a few
 * seconds after the page loads and fades after a few more.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme, preset, sitePreset, visitor, applyPreset } = useTheme();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [phase, setPhase] = useState('closed'); // closed | pill | list
  const holdTimer = useRef(null);
  const wasHeld = useRef(false);
  const button = useRef(null);

  const [hint, setHint] = useState(false); // false | 'hover' | 'touch'
  const hintTimer = useRef(null);
  const touchTimer = useRef(null);
  const hintId = useId();

  useEffect(
    () => () => {
      clearTimeout(holdTimer.current);
      clearTimeout(hintTimer.current);
      clearTimeout(touchTimer.current);
    },
    [],
  );

  const showHint = () => {
    if (phase !== 'closed' || read(USED_KEY) || Number(read(HINT_KEY)) >= HINT_MAX) return;
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => {
      setHint('hover');
      write(HINT_KEY, String(Number(read(HINT_KEY)) + 1));
    }, HINT_DELAY_MS);
  };
  const hideHint = useCallback(() => {
    clearTimeout(hintTimer.current);
    clearTimeout(touchTimer.current);
    setHint(false);
  }, []);

  // Touch screens: no hover to wait for, so show it once the page has settled.
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return undefined;
    if (read(USED_KEY) || Number(read(HINT_KEY)) >= HINT_MAX) return undefined;
    hintTimer.current = setTimeout(() => {
      setHint('touch');
      write(HINT_KEY, String(Number(read(HINT_KEY)) + 1));
      touchTimer.current = setTimeout(() => setHint(false), TOUCH_SHOWN_MS);
    }, TOUCH_DELAY_MS);
    return () => {
      clearTimeout(hintTimer.current);
      clearTimeout(touchTimer.current);
    };
  }, []);

  // The hint gives way to the pill, and Escape dismisses it (it must be
  // dismissible without moving the pointer or focus).
  useEffect(() => {
    if (phase === 'closed') return undefined;
    write(USED_KEY, '1');
    hideHint();
    return undefined;
  }, [phase, hideHint]);
  useEffect(() => {
    if (!hint) return undefined;
    const onKey = (e) => e.key === 'Escape' && hideHint();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [hint, hideHint]);

  const close = useCallback(() => {
    setPhase('closed');
    button.current?.focus();
  }, []);

  const startHold = () => {
    wasHeld.current = false;
    hideHint();
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

  const pick = async (key) => {
    // `key` null = back to the site's own theme.
    document.cookie = key
      ? `${VISITOR_COOKIE}=${key}; path=/; max-age=31536000; samesite=lax`
      : `${VISITOR_COOKIE}=; path=/; max-age=0; samesite=lax`;
    // The server re-renders in parallel (it now reads the cookie) for what only it
    // can draw: illustrations, logo and particles.
    startTransition(() => router.refresh());
    // Colours and portrait change here and now, as a wash spreading out from the
    // portrait. The pill stays as it is until the wash is over, then closes.
    await morph(() => applyPreset(key), morphOrigin(button.current));
    setPhase('closed');
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
          aria-describedby={hint ? hintId : undefined}
          className="vx-themebtn"
          onClick={onClick}
          onPointerEnter={(e) => e.pointerType === 'mouse' && showHint()}
          onFocus={(e) => e.currentTarget.matches(':focus-visible') && showHint()}
          onBlur={hideHint}
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={() => {
            endHold();
            hideHint();
          }}
          onPointerCancel={endHold}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !e.repeat && startHold()}
          onKeyUp={endHold}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Icon name="sun" className="vx-themebtn__sun" />
          <Icon name="moon" className="vx-themebtn__moon" />
        </button>
      </ThemePill>

      {hint && (
        <span id={hintId} role="tooltip" className="vx-themehint">
          {hint === 'touch' ? 'Touch and hold to change theme' : 'Hold to change theme'}
        </span>
      )}
    </div>
  );
}
