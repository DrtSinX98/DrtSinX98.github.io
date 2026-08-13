'use client';

import React from 'react';
import EditorPage from '../EditorPage';
import { Card, Text, TextArea, Switch, ListEditor, IconPicker, StringList } from '../ui';

const TABS = [
  { key: 'general', label: 'General' },
  { key: 'navigation', label: 'Navigation' },
  { key: 'appearance', label: 'Appearance' },
];

export default function SiteEditor() {
  return (
    <EditorPage
      section="site"
      title="Site"
      subtitle="Branding, navigation and global appearance"
      tabs={TABS}
      render={(data, set, active) => (
        <>
          {active === 'general' && (
            <>
              <Card title="Branding" hint="Shown in the header next to the logo and in the browser tab.">
                <div className="admin-grid cols-2">
                  <Text label="Brand text" value={data.brand} onChange={(v) => set('brand', v)} />
                  <Text label="Page title" value={data.title} onChange={(v) => set('title', v)} />
                </div>
                <TextArea
                  label="Meta description"
                  hint="Used by search engines and link previews."
                  rows={2}
                  value={data.description}
                  onChange={(v) => set('description', v)}
                />
              </Card>

              <Card title="Footer">
                <div className="admin-grid cols-2">
                  <Text label="Owner" value={data.footer?.owner} onChange={(v) => set('footer.owner', v)} />
                  <Text
                    label="Built-with prefix"
                    hint="Followed by the React and Bootstrap icons."
                    value={data.footer?.writtenIn}
                    onChange={(v) => set('footer.writtenIn', v)}
                  />
                </div>
              </Card>
            </>
          )}

          {active === 'navigation' && (
            <Card
              title="Menu items"
              hint="Appears in the header on desktop and the bottom bar on mobile. The icon is only used on mobile."
            >
              <ListEditor
                items={data.nav || []}
                onChange={(v) => set('nav', v)}
                addLabel="Add menu item"
                title={(item) => item.label || item.href}
                newItem={{ key: '', label: 'New page', href: '/', icon: 'link' }}
                renderItem={(item, update) => (
                  <>
                    <div className="admin-grid cols-3">
                      <Text label="Label" value={item.label} onChange={(v) => update({ label: v })} />
                      <Text label="Path" value={item.href} onChange={(v) => update({ href: v })} />
                      <Text
                        label="Key"
                        hint="Internal identifier."
                        value={item.key}
                        onChange={(v) => update({ key: v })}
                      />
                    </div>
                    <IconPicker label="Mobile icon" value={item.icon} onChange={(v) => update({ icon: v })} />
                  </>
                )}
              />
            </Card>
          )}

          {active === 'appearance' && (
            <>
              <Card
                title="Theme colours"
                hint="Applied as CSS variables. A few accent tints elsewhere are still the fixed pink, so large colour changes may look uneven."
              >
                <div className="admin-grid cols-4">
                  <Text label="Primary" type="color" value={data.theme?.primaryColor} onChange={(v) => set('theme.primaryColor', v)} />
                  <Text label="Accent" type="color" value={data.theme?.secondaryColor} onChange={(v) => set('theme.secondaryColor', v)} />
                  <Text label="Light" type="color" value={data.theme?.tertiaryColor} onChange={(v) => set('theme.tertiaryColor', v)} />
                  <Text label="Dark background" type="color" value={data.theme?.primaryColorDark} onChange={(v) => set('theme.primaryColorDark', v)} />
                </div>
                <div className="admin-grid cols-2">
                  <Text
                    label="Light theme starts at (hour)"
                    type="number"
                    value={data.theme?.dayStartHour}
                    onChange={(v) => set('theme.dayStartHour', v)}
                  />
                  <Text
                    label="Dark theme starts at (hour)"
                    type="number"
                    value={data.theme?.nightStartHour}
                    onChange={(v) => set('theme.nightStartHour', v)}
                  />
                </div>
              </Card>

              <Card title="Particle background">
                <Switch
                  label="Show the animated particle background"
                  checked={data.particles?.enabled}
                  onChange={(v) => set('particles.enabled', v)}
                />
                <div className="admin-grid cols-3">
                  <Text label="Colour" type="color" value={data.particles?.color} onChange={(v) => set('particles.color', v)} />
                  <Text label="Particle count" type="number" value={data.particles?.count} onChange={(v) => set('particles.count', v)} />
                  <Text label="Speed" type="number" step="0.1" value={data.particles?.speed} onChange={(v) => set('particles.speed', v)} />
                  <Text label="Link distance" type="number" value={data.particles?.linkDistance} onChange={(v) => set('particles.linkDistance', v)} />
                  <Text label="Link opacity" type="number" step="0.05" value={data.particles?.linkOpacity} onChange={(v) => set('particles.linkOpacity', v)} />
                  <Text label="Particle opacity" type="number" step="0.05" value={data.particles?.opacity} onChange={(v) => set('particles.opacity', v)} />
                </div>
              </Card>

              <Card
                title="Loading screen"
                hint="The original site preloads these images behind a spinner before showing the page. Turning it off makes the first paint instant, since content is now server rendered."
              >
                <Switch
                  label="Show the loading spinner while images preload"
                  checked={data.preloader?.enabled}
                  onChange={(v) => set('preloader.enabled', v)}
                />
                <StringList
                  label="Preloaded image URLs"
                  items={data.preloader?.images || []}
                  onChange={(v) => set('preloader.images', v)}
                  placeholder="https://…"
                />
              </Card>
            </>
          )}
        </>
      )}
    />
  );
}
