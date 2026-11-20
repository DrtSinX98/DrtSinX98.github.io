'use client';

import React, { useState } from 'react';
import { ExternalLink, FileText, Gauge, Globe, House, Images, LogOut, Mail, Menu, MessageSquare, Settings, User, Video } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ADMIN_NAV } from './nav';

const NAV_ICONS = {
  gauge: Gauge,
  globe: Globe,
  house: House,
  user: User,
  filePdf: FileText,
  images: Images,
  video: Video,
  message: MessageSquare,
  envelope: Mail,
  gear: Settings,
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
                  {(() => { const G = NAV_ICONS[item.icon] || Gauge; return <G size={16} />; })()}
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
            <Menu size={16} />
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1>{title}</h1>
            {subtitle && <p className="sub">{subtitle}</p>}
          </div>

          <div className="d-flex gap-2">
            <a className="admin-btn" href="/" target="_blank" rel="noreferrer">
              <ExternalLink size={16} />
              <span className="d-none d-sm-inline">View site</span>
            </a>
            <button type="button" className="admin-btn" onClick={logout}>
              <LogOut size={16} />
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
