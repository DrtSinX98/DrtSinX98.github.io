'use client';

import React from 'react';
import EditorPage from '../EditorPage';
import { Card, Text, Switch, ListEditor, IconPicker } from '../ui';
import RichTextEditor from '../RichTextEditor';
import ImageField from '../ImageField';

const TABS = [
  { key: 'intro', label: 'Intro' },
  { key: 'cards', label: 'Contact cards' },
  { key: 'form', label: 'Message form' },
];

export default function ContactEditor() {
  return (
    <EditorPage
      section="contact"
      title="Contact"
      subtitle="Social cards and the message form"
      tabs={TABS}
      render={(data, set, active) => (
        <>
          {active === 'intro' && (
            <>
              <Card title="Illustration">
                <ImageField value={data.image} onChange={(v) => set('image', v)} />
              </Card>
              <Card title="Heading and lead" hint="The e-mail button sits between the two lead halves.">
                <RichTextEditor label="Heading" value={data.heading} onChange={(v) => set('heading', v)} rows={2} />
                <RichTextEditor label="Lead — before the button" value={data.leadPrefix} onChange={(v) => set('leadPrefix', v)} rows={4} />
                <div className="admin-grid cols-2">
                  <Text label="E-mail button label" value={data.emailButtonLabel} onChange={(v) => set('emailButtonLabel', v)} />
                  <Text label="E-mail address" value={data.email} onChange={(v) => set('email', v)} />
                </div>
                <Text label="Lead — after the button" value={data.leadSuffix} onChange={(v) => set('leadSuffix', v)} />
              </Card>
            </>
          )}

          {active === 'cards' && (
            <Card title="Contact cards">
              <ListEditor
                items={data.cards || []}
                onChange={(v) => set('cards', v)}
                addLabel="Add card"
                title={(item) => item.title || 'Untitled'}
                newItem={{ title: '', icon: 'link', text: '', href: 'https://' }}
                renderItem={(card, update) => (
                  <>
                    <div className="admin-grid cols-2">
                      <Text label="Title" value={card.title} onChange={(v) => update({ title: v })} />
                      <Text label="URL" value={card.href} onChange={(v) => update({ href: v })} />
                    </div>
                    <Text label="Description" value={card.text} onChange={(v) => update({ text: v })} />
                    <div className="admin-grid cols-2">
                      <Text
                        label="Accent word"
                        hint="Optional. This word inside the description is coloured pink."
                        value={card.highlight}
                        onChange={(v) => update({ highlight: v })}
                      />
                      <IconPicker value={card.icon} onChange={(v) => update({ icon: v })} />
                    </div>
                  </>
                )}
              />
            </Card>
          )}

          {active === 'form' && (
            <Card
              title="Message form"
              hint="Submissions are stored in MongoDB and appear under Messages."
            >
              <Switch
                label="Show the message form"
                checked={data.form?.enabled !== false}
                onChange={(v) => set('form.enabled', v)}
              />
              <Text label="Form heading" value={data.form?.title} onChange={(v) => set('form.title', v)} />
              <div className="admin-grid cols-2">
                <Text label="Name label" value={data.form?.nameLabel} onChange={(v) => set('form.nameLabel', v)} />
                <Text label="Name placeholder" value={data.form?.namePlaceholder} onChange={(v) => set('form.namePlaceholder', v)} />
                <Text label="Email label" value={data.form?.emailLabel} onChange={(v) => set('form.emailLabel', v)} />
                <Text label="Email placeholder" value={data.form?.emailPlaceholder} onChange={(v) => set('form.emailPlaceholder', v)} />
                <Text label="Message label" value={data.form?.messageLabel} onChange={(v) => set('form.messageLabel', v)} />
                <Text label="Message placeholder" value={data.form?.messagePlaceholder} onChange={(v) => set('form.messagePlaceholder', v)} />
                <Text label="Submit button" value={data.form?.submitLabel} onChange={(v) => set('form.submitLabel', v)} />
                <Text label="Submitting button" value={data.form?.submittingLabel} onChange={(v) => set('form.submittingLabel', v)} />
                <Text label="Success message" value={data.form?.successMessage} onChange={(v) => set('form.successMessage', v)} />
                <Text label="Error message" value={data.form?.errorMessage} onChange={(v) => set('form.errorMessage', v)} />
              </div>
            </Card>
          )}
        </>
      )}
    />
  );
}
