import React from 'react';
import Icon from './Icon';

/** Footer: the ownership line and the stack credit. */
function Footer({ owner = 'Pritish Joshi', writtenIn = 'Written in' }) {
  return (
    <footer className="vx-footer">
      <div className="vx-wrap vx-footer__inner">
        <p className="vx-footer__owner">
          <span className="pink">&copy;</span> {new Date().getFullYear()} {owner}
        </p>

        <p className="vx-footer__stack">
          {writtenIn} <Icon name="react" title="React" /> &amp; <Icon name="bootstrap" title="Bootstrap" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
