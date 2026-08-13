'use client';

import React from 'react';
import EditorPage from '../EditorPage';
import { Card, Text, ListEditor, IconPicker, StringList } from '../ui';
import RichTextEditor from '../RichTextEditor';
import ImageField from '../ImageField';

const TABS = [
  { key: 'bio', label: 'Bio & greeting' },
  { key: 'profile', label: 'Profile image' },
  { key: 'buttons', label: 'Social buttons' },
  { key: 'terminal', label: 'Terminal card' },
];

export default function HomeEditor() {
  return (
    <EditorPage
      section="home"
      title="Home"
      subtitle="The landing page — greeting, profile blob, buttons and terminal"
      tabs={TABS}
      render={(data, set, active) => (
        <>
          {active === 'bio' && (
            <>
              <Card title="Time-based greeting" hint="Chosen from the visitor's local clock.">
                <div className="admin-grid cols-4">
                  <Text label="Before 12:00" value={data.greetings?.morning} onChange={(v) => set('greetings.morning', v)} />
                  <Text label="12:00 – 17:00" value={data.greetings?.afternoon} onChange={(v) => set('greetings.afternoon', v)} />
                  <Text label="17:00 – 21:00" value={data.greetings?.evening} onChange={(v) => set('greetings.evening', v)} />
                  <Text label="After 21:00" value={data.greetings?.night} onChange={(v) => set('greetings.night', v)} />
                </div>
              </Card>

              <Card
                title="Typewriter"
                hint="Typed one after another next to the greeting; each is deleted before the next is typed."
              >
                <StringList
                  label="Phrases"
                  items={data.typewriter || []}
                  onChange={(v) => set('typewriter', v)}
                  placeholder="I'm Pritish Joshi"
                />
              </Card>

              <Card title="Introduction">
                <Text label="Tagline" value={data.tagline} onChange={(v) => set('tagline', v)} />
                <RichTextEditor label="Paragraph" value={data.intro} onChange={(v) => set('intro', v)} rows={5} />
              </Card>
            </>
          )}

          {active === 'profile' && (
            <Card
              title="Profile pictures"
              hint="Shown inside the animated blob. The site swaps between them with the light and dark theme."
            >
              <ImageField label="Light theme" value={data.profileImageLight} onChange={(v) => set('profileImageLight', v)} />
              <ImageField label="Dark theme" value={data.profileImageDark} onChange={(v) => set('profileImageDark', v)} />
            </Card>
          )}

          {active === 'buttons' && (
            <Card title="Social buttons" hint="The pill buttons under the introduction.">
              <ListEditor
                items={data.buttons || []}
                onChange={(v) => set('buttons', v)}
                addLabel="Add button"
                title={(item) => item.label || 'Untitled'}
                newItem={{ label: 'New link', icon: 'link', href: 'https://' }}
                renderItem={(item, update) => (
                  <>
                    <div className="admin-grid cols-2">
                      <Text label="Label" value={item.label} onChange={(v) => update({ label: v })} />
                      <Text label="URL" value={item.href} onChange={(v) => update({ href: v })} />
                    </div>
                    <IconPicker value={item.icon} onChange={(v) => update({ icon: v })} />
                  </>
                )}
              />
            </Card>
          )}

          {active === 'terminal' && (
            <>
              <Card title="Window" hint="The fake terminal typed out below the introduction.">
                <div className="admin-grid cols-3">
                  <Text label="Title bar" value={data.terminal?.title} onChange={(v) => set('terminal.title', v)} />
                  <Text label="Prompt" value={data.terminal?.prompt} onChange={(v) => set('terminal.prompt', v)} />
                  <Text label="Command" value={data.terminal?.command} onChange={(v) => set('terminal.command', v)} />
                </div>
                <Text label="name" value={data.terminal?.name} onChange={(v) => set('terminal.name', v)} />
              </Card>

              <Card title="JSON contents" hint="Each list is printed as an array in the typed output.">
                <StringList label="education" items={data.terminal?.education || []} onChange={(v) => set('terminal.education', v)} />
                <StringList label="interests" items={data.terminal?.interests || []} onChange={(v) => set('terminal.interests', v)} />
                <StringList label="works" items={data.terminal?.works || []} onChange={(v) => set('terminal.works', v)} />
              </Card>
            </>
          )}
        </>
      )}
    />
  );
}
