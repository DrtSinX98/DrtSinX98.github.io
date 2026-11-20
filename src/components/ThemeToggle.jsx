'use client';

import React from 'react';
import Icon from './Icon';
import { useTheme } from './ThemeProvider';

/**
 * One theme control for every screen size — it replaces a hidden-on-mobile
 * checkbox switch and a separate mobile button, which gave the page two
 * differently-labelled controls for the same thing.
 *
 * Which icon shows is decided in CSS from the `data-bs-theme` attribute that the
 * inline script sets before first paint, so the right icon is there from the
 * first frame with nothing to hydrate. `role="switch"` + `aria-checked` carry
 * the state for assistive tech.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label="Dark mode"
      className="vx-themebtn"
      onClick={toggleTheme}
    >
      <Icon name="sun" className="vx-themebtn__sun" />
      <Icon name="moon" className="vx-themebtn__moon" />
    </button>
  );
}
