'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { presetTheme, resolveTheme } from '@/lib/themePresets';
import { sweep } from '@/lib/themeMorph';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  preset: 'rose',
  sitePreset: 'rose',
  siteColours: {},
  visitor: false,
  applyPreset: () => {},
});

const VARS = {
  primaryColor: '--primary-color',
  secondaryColor: '--secondary-color',
  tertiaryColor: '--tertiary-color',
  primaryColorDark: '--primary-color-dark',
};

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
export default function ThemeProvider({
  children,
  dayStartHour = 6,
  nightStartHour = 18,
  preset = 'rose',
  sitePreset = 'rose',
  siteColours = {},
  visitor = false,
}) {
  const [theme, setTheme] = useState('light');

  // What is on screen. The server's answer wins whenever it arrives; until then
  // a pick shows immediately.
  const [view, setView] = useState({ preset, visitor });
  useEffect(() => {
    setView({ preset, visitor });
    // The server's own <style> now carries these colours, so drop the early ones.
    Object.values(VARS).forEach((name) => document.documentElement.style.removeProperty(name));
  }, [preset, visitor]);

  const applyPreset = useCallback(
    (key) => {
      const colours = key ? presetTheme(key) : resolveTheme(siteColours);
      flushSync(() => setView(key ? { preset: key, visitor: true } : { preset: sitePreset, visitor: false }));
      Object.entries(VARS).forEach(([k, name]) => document.documentElement.style.setProperty(name, colours[k]));
    },
    [siteColours, sitePreset],
  );

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

  // Light <-> dark, as a diagonal sweep (lib/themeMorph.js). The next mode is read
  // from the page itself, so it is right even when the click comes before React has
  // caught up, and the whole change happens inside the transition's callback.
  const toggleTheme = useCallback(() => {
    sweep(() => {
      const next = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', next);
      sessionStorage.setItem('darkModeManual', next);
      flushSync(() => setTheme(next));
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        preset: view.preset,
        sitePreset,
        siteColours,
        visitor: view.visitor,
        applyPreset,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
