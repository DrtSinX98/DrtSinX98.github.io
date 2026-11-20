'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe, Images, Mail, MapPin } from 'lucide-react';
import AdminShell, { AdminTile } from './AdminShell';
import { Alert, Card } from './ui';
import { ADMIN_NAV } from './nav';

export default function Dashboard({ stats }) {
  const tiles = [
    { label: 'Countries on the globe', value: stats.countries, href: '/admin/gallery/countries', icon: Globe },
    { label: 'Gallery photos', value: stats.photos, href: '/admin/gallery/photos', icon: Images },
    { label: 'Cities', value: stats.cities, href: '/admin/gallery/photos', icon: MapPin },
    { label: 'Unread messages', value: stats.unreadMessages, href: '/admin/messages', icon: Mail, alert: stats.unreadMessages > 0 },
  ];

  const pages = ADMIN_NAV.filter((item) => item.children);

  return (
    <AdminShell title="Dashboard" subtitle="Everything on the site is editable from here">
      {stats.error && <Alert type="error">{stats.error}</Alert>}

      <div className="admin-stats">
        {tiles.map((tile) => {
          const Glyph = tile.icon;
          return (
            <Link key={tile.label} href={tile.href} className={`admin-stat${tile.alert ? ' is-alert' : ''}`}>
              <span className="admin-stat__icon" aria-hidden="true">
                <Glyph size={18} />
              </span>
              <span className="admin-stat__value">{tile.value}</span>
              <span className="admin-stat__label">{tile.label}</span>
              <ArrowUpRight className="admin-stat__arrow" size={18} aria-hidden="true" />
            </Link>
          );
        })}
      </div>

      <Card title="Pages" hint="Each page lists the components you can edit.">
        <div className="admin-pagegrid">
          {pages.map((page) => (
            <div className="admin-pagecard" key={page.href}>
              <div className="admin-pagecard__head">
                <AdminTile tile={page.tile} />
                <Link href={page.href} className="admin-pagecard__title">
                  {page.label}
                </Link>
              </div>
              <ul className="admin-chips">
                {page.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className="admin-chip admin-chip--link">
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Reference material, so it folds away instead of taking a screen. */}
      <details className="admin-card admin-note">
        <summary>How content is stored</summary>
        <p className="hint">
          Text lives in the <code>content</code> collection in MongoDB, one document per page. Photos live in{' '}
          <code>photos</code>, country facts in <code>countries</code>, and contact-form submissions in{' '}
          <code>messages</code>. Images already on the site are served from jsDelivr; anything you upload here goes to
          ImgBB. Every page re-reads the database on each request, so saving a change publishes it immediately.
        </p>
      </details>
    </AdminShell>
  );
}
