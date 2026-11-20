'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';
import { defaultSite } from '@/lib/defaults';

// useLayoutEffect warns during server rendering; fall back to useEffect there.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Fallback for menu items saved before the icon field existed, so the mobile bar
// never degrades to a row of identical generic glyphs.
const FALLBACK_ICONS = Object.fromEntries(
  defaultSite.nav.flatMap((item) => [
    [item.key, item.icon],
    [item.href, item.icon],
  ]),
);

// Resolves to a *name* now; <Icon> does the lookup.
const iconNameFor = (item) => item.icon || FALLBACK_ICONS[item.key] || FALLBACK_ICONS[item.href];

/**
 * Measures the active link so a single indicator can slide between links.
 *
 * Done with a measurement rather than CSS anchor positioning: that is still
 * missing from Firefox, and this is a few lines either way. Until the first
 * measurement the active link paints its own background (see `.has-ind` in the
 * stylesheet), so the nav is correct without JS and during hydration.
 */
function useIndicator(listRef, activeHref) {
  const [box, setBox] = useState(null);
  const [animate, setAnimate] = useState(false);

  const measure = useCallback(() => {
    const el = listRef.current?.querySelector('[aria-current="page"]');
    setBox(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [listRef]);

  useIsoLayoutEffect(() => {
    measure();
  }, [activeHref, measure]);

  // Re-measure when fonts load or the nav resizes, so the pill never drifts.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [listRef, measure]);

  // Don't animate the very first placement — the pill should appear in place,
  // not slide in from the left edge on every page load.
  useEffect(() => {
    if (!box || animate) return undefined;
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [box, animate]);

  return { box, animate };
}

function Header({ brand = 'Vortex', nav = [] }) {
  const pathname = usePathname();
  const listRef = useRef(null);

  // Longest matching href wins so /about doesn't also light up "/".
  const active =
    nav
      .filter((item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? '/';

  const { box, animate } = useIndicator(listRef, active);

  return (
    <>
      <header className="vx-header">
        <div className="vx-header__inner vx-wrap">
          <Link href="/" className="vx-brand" aria-label={`${brand} — home`}>
            <Logo height="52" width="80" />
            <span className="vx-brand__name">{brand}</span>
          </Link>

          <nav className={`vx-nav${box ? ' has-ind' : ''}`} aria-label="Primary">
            <ul ref={listRef}>
              {nav.map((item) => (
                <li key={item.key || item.href}>
                  <Link href={item.href} aria-current={active === item.href ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* A sibling of the list, not a child: <ul> may only contain <li>.
                The nav is the positioning context, so the links' offsetLeft
                and this element's coordinates share one origin. */}
            {box ? (
              <span
                className={`vx-nav__ind${animate ? ' is-animated' : ''}`}
                style={{ '--x': `${box.x}px`, '--w': `${box.w}px` }}
                aria-hidden="true"
              />
            ) : null}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      {/* Small screens get a floating dock instead: the active destination
          expands to show its label, the rest stay as icons. */}
      <nav className="vx-dock" aria-label="Primary">
        <ul>
          {nav.map((item) => (
            <li key={item.key || item.href}>
              <Link
                href={item.href}
                aria-current={active === item.href ? 'page' : undefined}
                aria-label={item.label}
              >
                <Icon name={iconNameFor(item)} size="lg" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Header;
