'use client';

import React, { useEffect, useState } from 'react';
import Icon from '../Icon';

/**
 * Sticky in-page navigation for long pages (About runs to five screens).
 * Plain anchors, so it works without JS and with find/keyboard; an
 * IntersectionObserver only decides which one to highlight.
 *
 * `aria-current="location"` marks the current section — a shape (underline) as
 * well as colour, so it isn't conveyed by colour alone.
 */
export default function SectionNav({ items = [] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!targets.length) return undefined;

    // A thin band around the upper-middle of the viewport: whichever section
    // crosses it is "current". Sections taller than the band still register.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav className="vx-secnav" aria-label="On this page">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>
              {item.icon ? <Icon name={item.icon} /> : null}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
