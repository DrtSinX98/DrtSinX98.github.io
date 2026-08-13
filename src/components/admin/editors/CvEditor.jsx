'use client';

import React from 'react';
import EditorPage from '../EditorPage';
import { Card, Text, TextArea, ListEditor, IconPicker, StringList } from '../ui';

const TABS = [
  { key: 'header', label: 'Header' },
  { key: 'summary', label: 'Summary & skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'publications', label: 'Publications' },
];

/** Shared field layout for the experience and education entries. */
function renderEntry(item, update, withPoints) {
  return (
    <>
      <div className="admin-grid cols-2">
        <Text label="Organisation" value={item.org} onChange={(v) => update({ org: v })} />
        <Text label="Location" hint="Rendered next to the name, e.g. | Uppsala, SE" value={item.place} onChange={(v) => update({ place: v })} />
        <Text label="Dates" value={item.date} onChange={(v) => update({ date: v })} />
        <Text label="Role" value={item.role} onChange={(v) => update({ role: v })} />
      </div>
      {withPoints && (
        <StringList label="Bullet points" items={item.points || []} onChange={(v) => update({ points: v })} />
      )}
      <div className="admin-grid cols-2">
        <Text label="Note label" hint="e.g. Supervisors: or Key courses:" value={item.noteLabel} onChange={(v) => update({ noteLabel: v })} />
        <Text label="Note" value={item.note} onChange={(v) => update({ note: v })} />
      </div>
    </>
  );
}

export default function CvEditor() {
  return (
    <EditorPage
      section="cv"
      title="CV"
      subtitle="The modal opened from the About page, and its PDF export"
      tabs={TABS}
      render={(data, set, active) => (
        <>
          {active === 'header' && (
            <>
              <Card title="Identity">
                <div className="admin-grid cols-2">
                  <Text label="Name" value={data.name} onChange={(v) => set('name', v)} />
                  <Text label="Subtitle" value={data.subtitle} onChange={(v) => set('subtitle', v)} />
                  <Text label="Email" value={data.email} onChange={(v) => set('email', v)} />
                  <Text label="Location" value={data.location} onChange={(v) => set('location', v)} />
                  <Text label="Website label" value={data.website?.label} onChange={(v) => set('website.label', v)} />
                  <Text label="Website URL" value={data.website?.href} onChange={(v) => set('website.href', v)} />
                </div>
                <Text
                  label="PDF file name"
                  hint="Used when the visitor downloads the CV."
                  value={data.fileName}
                  onChange={(v) => set('fileName', v)}
                />
              </Card>

              <Card title="Profile links">
                <ListEditor
                  items={data.socials || []}
                  onChange={(v) => set('socials', v)}
                  addLabel="Add link"
                  title={(item) => item.label || 'Untitled'}
                  newItem={{ label: '', icon: 'link', href: 'https://' }}
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
            </>
          )}

          {active === 'summary' && (
            <>
              <Card title="Summary">
                <Text label="Section title" value={data.summaryTitle} onChange={(v) => set('summaryTitle', v)} />
                <TextArea label="Intro line" value={data.summaryIntro} onChange={(v) => set('summaryIntro', v)} />
                <StringList label="Bullet points" items={data.summaryPoints || []} onChange={(v) => set('summaryPoints', v)} />
              </Card>

              <Card title="Technical skills">
                <Text label="Section title" value={data.skillsTitle} onChange={(v) => set('skillsTitle', v)} />
                <ListEditor
                  items={data.skillGroups || []}
                  onChange={(v) => set('skillGroups', v)}
                  addLabel="Add skill group"
                  title={(item) => item.title || 'Untitled'}
                  newItem={{ title: '', items: [] }}
                  renderItem={(item, update) => (
                    <>
                      <Text label="Group title" value={item.title} onChange={(v) => update({ title: v })} />
                      <StringList label="Skills" items={item.items || []} onChange={(v) => update({ items: v })} />
                    </>
                  )}
                />
              </Card>

              <Card title="Test scores">
                <Text label="Section title" value={data.testScoresTitle} onChange={(v) => set('testScoresTitle', v)} />
                <ListEditor
                  items={data.testScores || []}
                  onChange={(v) => set('testScores', v)}
                  addLabel="Add score"
                  title={(item) => item.label || 'Untitled'}
                  newItem={{ label: '', value: '' }}
                  renderItem={(item, update) => (
                    <div className="admin-grid cols-2">
                      <Text label="Label" value={item.label} onChange={(v) => update({ label: v })} />
                      <Text label="Value" value={item.value} onChange={(v) => update({ value: v })} />
                    </div>
                  )}
                />
              </Card>
            </>
          )}

          {active === 'experience' && (
            <Card title="Research experience">
              <Text label="Section title" value={data.experienceTitle} onChange={(v) => set('experienceTitle', v)} />
              <ListEditor
                items={data.experience || []}
                onChange={(v) => set('experience', v)}
                addLabel="Add position"
                title={(item) => item.org || 'Untitled'}
                newItem={{ org: '', place: '', date: '', role: '', points: [], noteLabel: 'Supervisors:', note: '' }}
                renderItem={(item, update) => renderEntry(item, update, true)}
              />
            </Card>
          )}

          {active === 'education' && (
            <Card title="Education">
              <Text label="Section title" value={data.educationTitle} onChange={(v) => set('educationTitle', v)} />
              <ListEditor
                items={data.education || []}
                onChange={(v) => set('education', v)}
                addLabel="Add degree"
                title={(item) => item.org || 'Untitled'}
                newItem={{ org: '', place: '', date: '', role: '', noteLabel: 'Key courses:', note: '' }}
                renderItem={(item, update) => renderEntry(item, update, false)}
              />
            </Card>
          )}

          {active === 'publications' && (
            <Card title="Publications">
              <Text label="Section title" value={data.publicationsTitle} onChange={(v) => set('publicationsTitle', v)} />
              <ListEditor
                items={data.publications || []}
                onChange={(v) => set('publications', v)}
                addLabel="Add publication"
                title={(item) => item.title || 'Untitled'}
                newItem={{ title: '', authors: '', journal: '', date: '', link: '' }}
                renderItem={(item, update) => (
                  <>
                    <TextArea label="Title" rows={2} value={item.title} onChange={(v) => update({ title: v })} />
                    <Text label="Authors" value={item.authors} onChange={(v) => update({ authors: v })} />
                    <div className="admin-grid cols-3">
                      <Text label="Journal" value={item.journal} onChange={(v) => update({ journal: v })} />
                      <Text
                        label="Status badge"
                        hint="Shown when there is no link, e.g. Submitted."
                        value={item.date}
                        onChange={(v) => update({ date: v })}
                      />
                      <Text label="DOI / link" value={item.link} onChange={(v) => update({ link: v })} />
                    </div>
                  </>
                )}
              />
            </Card>
          )}
        </>
      )}
    />
  );
}
