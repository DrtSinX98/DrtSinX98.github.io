'use client';

import React from 'react';
import Link from 'next/link';
import AdminShell from './AdminShell';
import { Card } from './ui';
import { ADMIN_NAV } from './nav';

export default function Dashboard({ stats }) {
  const tiles = [
    { label: 'Countries on the globe', value: stats.countries, href: '/admin/gallery/countries' },
    { label: 'Gallery photos', value: stats.photos, href: '/admin/gallery/photos' },
    { label: 'Cities', value: stats.cities, href: '/admin/gallery/photos' },
    { label: 'Unread messages', value: stats.unreadMessages, href: '/admin/messages' },
  ];

  const pages = ADMIN_NAV.filter((item) => item.children);

  return (
    <AdminShell title="Dashboard" subtitle="Everything on the site is editable from here">
      <div className="admin-grid cols-4 mb-4">
        {tiles.map((tile) => (
          <Link key={tile.label} href={tile.href} className="admin-stat" style={{ textDecoration: 'none' }}>
            <div className="value">{tile.value}</div>
            <div className="label">{tile.label}</div>
          </Link>
        ))}
      </div>

      {stats.error && <div className="admin-alert error">{stats.error}</div>}

      <Card title="Pages" hint="Each page lists the components you can edit.">
        <div className="admin-grid cols-2">
          {pages.map((page) => (
            <div className="admin-item" key={page.href} style={{ marginBottom: 0 }}>
              <div className="admin-item-head">
                <Link href={page.href} className="title" style={{ textDecoration: 'none' }}>
                  {page.label}
                </Link>
              </div>
              <div className="admin-item-body">
                <div className="admin-chips">
                  {page.children.map((child) => (
                    <Link key={child.href} href={child.href} className="admin-chip" style={{ textDecoration: 'none', paddingRight: 12 }}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="How content is stored">
        <p className="hint" style={{ marginBottom: 0 }}>
          Text lives in the <code>content</code> collection in MongoDB, one document per page. Photos live in{' '}
          <code>photos</code>, country facts in <code>countries</code>, and contact-form submissions in{' '}
          <code>messages</code>. Images already on the site are served from jsDelivr; anything you upload here goes to
          ImgBB. Every page re-reads the database on each request, so saving a change publishes it immediately.
        </p>
      </Card>
    </AdminShell>
  );
}
