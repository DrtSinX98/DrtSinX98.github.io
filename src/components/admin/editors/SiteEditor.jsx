'use client';

import React from 'react';
import EditorPage from '../EditorPage';
import ThemePreview from '../ThemePreview';
import ThemePresetPicker from '../ThemePresetPicker';
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
              hint="Appears in the header on desktop and the bottom bar on mobile. The icon is only used on mobile. Turn a page off to hide it without deleting anything: it leaves the menu, footer and home page, and its address shows a 404, until you turn it back on."
            >
              <ListEditor
                items={data.nav || []}
                onChange={(v) => set('nav', v)}
                addLabel="Add menu item"
                title={(item) => `${item.label || item.href}${item.enabled === false ? ' — hidden' : ''}`}
                newItem={{ key: '', label: 'New page', href: '/', icon: 'link', enabled: true }}
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
                    {/* The home page is the site's front door and cannot be switched off. */}
                    {item.href !== '/' && (
                      <Switch
                        label="Show this page"
                        hint="Off hides it from the menu, footer and home page, and its address shows a 404. Its content is kept."
                        checked={item.enabled !== false}
                        onChange={(v) => update({ enabled: v })}
                      />
                    )}
                  </>
                )}
              />
            </Card>
          )}

          {active === 'appearance' && (
            <>
              <Card
                title="Theme colours"
                hint="Pick a template, or choose Manual to set the four colours yourself. Every shade on the site is derived from them, and the profile picture, page illustrations, logo and particles follow along. The preview is not live until you save."
              >
                <ThemePresetPicker
                  theme={data.theme}
                  onPick={(preset) => {
                    // Manual keeps the current colours; a template replaces all four
                    // (and the particles, which should match the accent).
                    set('theme.preset', preset.key);
                    if (!preset.theme) return;
                    Object.entries(preset.theme).forEach(([key, value]) => set(`theme.${key}`, value));
                    set('particles.color', preset.theme.secondaryColor);
                  }}
                />
                <div className="admin-grid cols-4">
                  {[
                    ['Primary', 'primaryColor'],
                    ['Accent', 'secondaryColor'],
                    ['Light', 'tertiaryColor'],
                    ['Dark background', 'primaryColorDark'],
                  ].map(([label, key]) => (
                    <Text
                      key={key}
                      label={label}
                      type="color"
                      value={data.theme?.[key]}
                      onChange={(v) => {
                        set(`theme.${key}`, v);
                        set('theme.preset', 'manual');
                      }}
                    />
                  ))}
                </div>
                <ThemePreview theme={data.theme} />
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

              <Card
                title="Illustrations"
                hint="The page artwork is inlined so each layer of the drawing animates into place when the page loads. Turn this off to serve the SVG as a plain image instead."
              >
                <Switch
                  label="Animate the page illustrations"
                  checked={data.animations?.illustrations !== false}
                  onChange={(v) => set('animations.illustrations', v)}
                />
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
