'use client';

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ThemeProvider";

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="d-lg-none">
      <button onClick={toggleTheme} aria-label="Switch between dark and light mode" className="theme-button">
        <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} />
      </button>
      <style>
        {`
          .theme-button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            transition: transform 0.8s ease;
          }

          .theme-button:active {
            transform: rotate(180deg);
          }
        `}
      </style>
    </div>
  );
}

export default ThemeButton;
