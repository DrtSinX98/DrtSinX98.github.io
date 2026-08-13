'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGauge,
  faGlobe,
  faHouse,
  faUser,
  faFilePdf,
  faImages,
  faVideo,
  faMessage,
  faEnvelope,
  faGear,
  faArrowUpRightFromSquare,
  faRightFromBracket,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { ADMIN_NAV } from './nav';

const NAV_ICONS = {
  gauge: faGauge,
  globe: faGlobe,
  house: faHouse,
  user: faUser,
  filePdf: faFilePdf,
  images: faImages,
  video: faVideo,
  message: faMessage,
  envelope: faEnvelope,
  gear: faGear,
};

export default function AdminShell({ title, subtitle, children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const currentSection = searchParams.get('section');

  const isItemActive = (item) =>
    pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`));

  const isChildActive = (child) => {
    const [path, query] = child.href.split('?');
    if (pathname !== path) return false;
    if (!query) return !currentSection;
    return query === `section=${currentSection}`;
  };

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar${open ? ' open' : ''}`}>
        <div className="admin-brand">
          <span className="dot" />
          Vortex Admin
        </div>

        {ADMIN_NAV.map((item) => {
          const active = isItemActive(item);
          return (
            <div className="admin-nav-group" key={item.href}>
              <Link
                href={item.href}
                className={`admin-nav-link${active ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={NAV_ICONS[item.icon] || faGauge} />
                </span>
                {item.label}
              </Link>

              {active &&
                item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`admin-nav-sub${isChildActive(child) ? ' active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
            </div>
          );
        })}
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-btn icon-only d-md-none"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1>{title}</h1>
            {subtitle && <p className="sub">{subtitle}</p>}
          </div>

          <div className="d-flex gap-2">
            <a className="admin-btn" href="/" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              <span className="d-none d-sm-inline">View site</span>
            </a>
            <button type="button" className="admin-btn" onClick={logout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span className="d-none d-sm-inline">Log out</span>
            </button>
          </div>
        </div>

        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

/** Tab strip driven by the `?section=` query parameter. */
export function SectionTabs({ tabs, active }) {
  const pathname = usePathname();
  return (
    <div className="admin-tabs">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={`${pathname}?section=${tab.key}`}
          className={`admin-tab${active === tab.key ? ' active' : ''}`}
          scroll={false}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
