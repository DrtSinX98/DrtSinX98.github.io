'use client';

import React, { useId } from "react";
import Icon from './Icon';
import { useTheme } from "./ThemeProvider";

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  // Was a hardcoded id="checkbox" — generic enough to collide with anything
  // else on the page, and duplicated if the switch is ever rendered twice.
  const id = useId();

  return (
    <div className="d-none d-lg-block">
      <input
        type="checkbox"
        className="theme-switch-input"
        id={id}
        checked={theme === 'dark'}
        onChange={toggleTheme}
        aria-label="Switch between dark and light mode"
      />
      <label htmlFor={id} className="theme-switch-label">
        <Icon name="moon" />
        <Icon name="sun" />
        <span className="ball"></span>
      </label>
    </div>
  );
}

export default ThemeSwitch;
