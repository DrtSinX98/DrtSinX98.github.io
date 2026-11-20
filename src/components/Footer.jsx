import React from 'react';
import Link from 'next/link';
import Icon from './Icon';

/**
 * Footer: ownership line, a repeat of the primary links (so the end of a long
 * page isn't a dead end), and the stack credit. `nav` is optional — without it
 * the middle column simply doesn't render.
 */
function Footer({ owner = 'Pritish Joshi', writtenIn = 'Written in', nav = [] }) {
  return (
    <footer className="vx-footer">
      <div className="vx-wrap vx-footer__inner">
        <p className="vx-footer__owner">
          <span className="pink">&copy;</span> {new Date().getFullYear()} {owner}
        </p>

        {nav.length > 0 ? (
          <nav className="vx-footer__nav" aria-label="Footer">
            <ul>
              {nav.map((item) => (
                <li key={item.key || item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <p className="vx-footer__stack">
          {writtenIn} <Icon name="react" title="React" /> &amp; <Icon name="bootstrap" title="Bootstrap" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
