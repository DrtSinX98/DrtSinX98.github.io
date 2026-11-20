'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {}, preset: 'rose', sitePreset: 'rose', visitor: false });

export const useTheme = () => useContext(ThemeContext);

/**
 * Owns the `data-bs-theme` attribute.
 *
 * Same rules as the original site: a manual choice is remembered for the
 * session, otherwise the theme follows the clock. The inline script in the root
 * layout applies this before first paint; this provider only keeps React state
 * in sync so the switch and the mobile button never disagree.
 *
 * `preset` is the key of the colour template on screen, `visitor` says whether
 * this visitor picked it themselves (long-press on the switch) or it is the
 * site's own, and `sitePreset` is the site's own whichever is on screen.
 */
export default function ThemeProvider({ children, dayStartHour = 6, nightStartHour = 18, preset = 'rose', sitePreset = 'rose', visitor = false }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const manualOverride = sessionStorage.getItem('darkModeManual');
    let initialTheme;
    if (manualOverride) {
      initialTheme = manualOverride;
    } else {
      const hour = new Date().getHours();
      initialTheme = hour >= dayStartHour && hour < nightStartHour ? 'light' : 'dark';
    }
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-bs-theme', initialTheme);
  }, [dayStartHour, nightStartHour]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', next);
      sessionStorage.setItem('darkModeManual', next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme, preset, sitePreset, visitor }}>{children}</ThemeContext.Provider>;
}
