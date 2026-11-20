'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ADMIN_THEME_KEY = 'vortex-admin-theme';

/**
 * Light/dark for the admin panel only. It is deliberately separate from the
 * site's day/night clock (the panel used to be forced dark regardless), and is
 * remembered per browser rather than per session.
 *
 * The attribute lives on `#admin-root`; an inline script in the admin layout
 * applies the saved choice before first paint, so there is no flash. Which icon
 * shows is chosen in CSS from that attribute, so there is nothing to hydrate —
 * only the `aria-checked` state needs the effect.
 */
export default function AdminThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.getElementById('admin-root')?.getAttribute('data-bs-theme') === 'light');
  }, []);

  const toggle = () => {
    const next = light ? 'dark' : 'light';
    document.getElementById('admin-root')?.setAttribute('data-bs-theme', next);
    try {
      localStorage.setItem(ADMIN_THEME_KEY, next);
    } catch {
      /* storage can be blocked; the choice just won't persist */
    }
    setLight(!light);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="Light mode"
      title="Light / dark"
      className="admin-btn icon-only admin-theme"
      onClick={toggle}
    >
      <Sun size={16} className="admin-theme__sun" aria-hidden="true" />
      <Moon size={16} className="admin-theme__moon" aria-hidden="true" />
    </button>
  );
}
