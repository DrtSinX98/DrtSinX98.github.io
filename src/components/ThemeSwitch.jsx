import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons";

function ThemeSwitch() {

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
        <div className="d-none d-lg-block">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={switchTheme}
            aria-label="Switch between dark and light mode"/>
            <label htmlFor="checkbox" className="checkbox-label">
            <FontAwesomeIcon icon={faMoon} />
            <FontAwesomeIcon icon={faSun} />
            <span className="ball"></span>
            </label>
            <style>
              {`
                .checkbox {
                  opacity: 0;
                  position: absolute;
                  display: flex;
                }

                .checkbox-label {
                  background-color: #111;
                  width: 50px;
                  height: 26px;
                  border-radius: 50px;
                  position: relative;
                  padding: 5px;
                  cursor: pointer;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }

                .fa-moon {
                  color: var(--tertiary-color);
                }

                .fa-sun {
                  color: var(--tertiary-color);
                }

                .checkbox-label .ball {
                  background-color: var(--secondary-color);
                  width: 22px;
                  height: 22px;
                  position: absolute;
                  left: 2px;
                  top: 2px;
                  border-radius: 50%;
                  transition: transform 0.2s linear;
                }

                .checkbox:checked + .checkbox-label .ball {
                  transform: translateX(24px);
                }
              `}
            </style>
        </div>
    );
}
export default ThemeSwitch;