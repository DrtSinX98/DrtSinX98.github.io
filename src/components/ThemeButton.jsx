import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function ThemeButton() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }, []);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="d-lg-none">
      <button onClick={switchTheme} aria-label="Switch between dark and light mode" className="theme-button">
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
