'use client';

import React from "react";
import Icon from './Icon';
import { useTheme } from "./ThemeProvider";

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="d-lg-none">
      <button onClick={toggleTheme} aria-label="Switch between dark and light mode" className="theme-button">
        <Icon name={theme === 'light' ? "sun" : "moon"} />
      </button>
    </div>
  );
}

export default ThemeButton;
