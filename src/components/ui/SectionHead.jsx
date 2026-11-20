import React from 'react';
import Icon from '../Icon';
import { Reveal } from '../motion/Reveal';

/**
 * A section title with a mono index ("01") and an optional icon. The index is a
 * quiet cue for scanning a long page, in the same spirit as the element tiles.
 */
export default function SectionHead({ id, index, icon, title, children }) {
  return (
    <Reveal className="vx-sechead">
      {index ? <span className="vx-sechead__index" aria-hidden="true">{index}</span> : null}
      <h2 id={id} className="vx-sechead__title">
        {icon ? <Icon name={icon} className="vx-sechead__icon" /> : null}
        {title}
      </h2>
      {children}
    </Reveal>
  );
}
