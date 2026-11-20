'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ExternalLink, FileText, Gauge, Globe, House, Images, LogOut, Mail, Menu, MessageSquare, Settings, User, Video, X } from 'lucide-react';
import { ADMIN_NAV, ADMIN_NAV_GROUPS } from './nav';
import AdminThemeToggle from './AdminThemeToggle';

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

/** A periodic-table tile, the same motif the public site uses for its pages. */
export function AdminTile({ tile, brand = false, size = 'md' }) {
  if (!tile && !brand) return null;
  return (
    <span className={`admin-tile admin-tile--${size}${brand ? ' admin-tile--brand' : ''}`} aria-hidden="true">
      {brand ? <i>59</i> : tile.num ? <i>{tile.num}</i> : null}
      <b>{brand ? 'Pr' : tile.code}</b>
    </span>
  );
}

export default function AdminShell({ title, subtitle, children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const currentSection = searchParams.get('section');

  const isItemActive = (item) =>
    pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`));

  const isChildActive = (child) => {
    const [path, query] = child.href.split('?');
    if (pathname !== path) return false;
    if (!query) return !currentSection;
    return query === `section=${currentSection}`;
  };

  const current = ADMIN_NAV.find(isItemActive);

  // Unread count for the sidebar badge. The inbox broadcasts changes so the
  // badge follows along without another request.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/messages/unread', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled && json) setUnread(json.unread);
      })
      .catch(() => {});

    const onUnread = (e) => setUnread(e.detail);
    window.addEventListener('admin:unread', onUnread);
    return () => {
      cancelled = true;
      window.removeEventListener('admin:unread', onUnread);
    };
  }, [pathname]);

  // The drawer: Escape closes it, and the page behind it stops scrolling.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <div className="admin-layout">
      <a className="admin-skip" href="#admin-main">
        Skip to content
      </a>

      <aside id="admin-sidebar" className={`admin-sidebar${open ? ' open' : ''}`}>
        <div className="admin-brand">
          <AdminTile brand />
          <div className="admin-brand__text">
            <strong>Vortex</strong>
            <span>Admin</span>
          </div>
          <button type="button" className="admin-btn icon-only admin-drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={16} />
          </button>
        </div>

        <nav className="admin-nav" aria-label="Admin sections">
          {ADMIN_NAV_GROUPS.map((group) => (
            <div className="admin-nav-section" key={group.label}>
              <p className="admin-nav-caption">{group.label}</p>

              {group.items.map((item) => {
                const active = isItemActive(item);
                const Glyph = NAV_ICONS[item.icon] || Gauge;
                return (
                  <div className="admin-nav-group" key={item.href}>
                    <Link
                      href={item.href}
                      className={`admin-nav-link${active ? ' active' : ''}`}
                      aria-current={pathname === item.href && !currentSection ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                    >
                      <Glyph size={18} aria-hidden="true" />
                      <span>{item.label}</span>
                      {item.badge === 'unread' && unread > 0 && (
                        <span className="admin-badge" aria-label={`${unread} unread`}>
                          {unread}
                        </span>
                      )}
                    </Link>

                    {active && item.children && (
                      <div className="admin-nav-subs">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`admin-nav-sub${isChildActive(child) ? ' active' : ''}`}
                            aria-current={isChildActive(child) ? 'page' : undefined}
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Tapping outside the drawer closes it. */}
      {open && <button type="button" className="admin-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-btn icon-only admin-menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="admin-sidebar"
          >
            <Menu size={16} />
          </button>

          <AdminTile tile={current?.tile} />

          <div className="admin-topbar__titles">
            <h1>{title}</h1>
            {subtitle && <p className="sub">{subtitle}</p>}
          </div>

          <div className="admin-topbar__actions">
            <a className="admin-btn" href="/" target="_blank" rel="noreferrer">
              <ExternalLink size={16} aria-hidden="true" />
              <span className="admin-hide-sm">View site</span>
            </a>
            <AdminThemeToggle />
            <button type="button" className="admin-btn" onClick={logout}>
              <LogOut size={16} aria-hidden="true" />
              <span className="admin-hide-sm">Log out</span>
            </button>
          </div>
        </header>

        <main id="admin-main" className="admin-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}

/** Tab strip driven by the `?section=` query parameter. */
export function SectionTabs({ tabs, active }) {
  const pathname = usePathname();
  return (
    <nav className="admin-tabs" aria-label="Sections">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={`${pathname}?section=${tab.key}`}
          className={`admin-tab${active === tab.key ? ' active' : ''}`}
          aria-current={active === tab.key ? 'page' : undefined}
          scroll={false}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
