import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Icon from './Icon';

/**
 * The hero's outbound links. Plain anchors styled as buttons (they navigate, so
 * they should be links), each with its brand mark and an arrow that signals
 * "leaves the site". `rel` is set because they open a new tab.
 */
function Buttons({ buttons = [] }) {
  if (buttons.length === 0) return null;

  return (
    <div className="vx-actions">
      {buttons.map((button, index) => (
        <a
          key={index}
          className="vx-btn vx-btn--solid"
          href={button.href}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name={button.icon} />
          {button.label}
          <ArrowUpRight className="vx-btn__arrow" size={16} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

export default Buttons;
