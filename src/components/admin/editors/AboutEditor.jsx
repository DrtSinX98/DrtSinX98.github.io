'use client';

import React from 'react';
import EditorPage from '../EditorPage';
import { Card, Text, TextArea, Select, ListEditor, IconPicker, StringList } from '../ui';
import RichTextEditor from '../RichTextEditor';
import ImageField from '../ImageField';

const TABS = [
  { key: 'intro', label: 'Intro' },
  { key: 'journey', label: 'Journey' },
  { key: 'skills', label: 'Tech stack' },
  { key: 'projects', label: 'Projects' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'highlights', label: 'Interests & socials' },
];

const linkList = (items, onChange, addLabel) => (
  <ListEditor
    items={items || []}
    onChange={onChange}
    addLabel={addLabel}
    title={(item) => item.title || 'Untitled'}
    newItem={{ title: '', subtitle: '', link: '#' }}
    renderItem={(item, update) => (
      <>
        <TextArea label="Title" rows={2} value={item.title} onChange={(v) => update({ title: v })} />
        <div className="admin-grid cols-2">
          <Text label="Subtitle" value={item.subtitle} onChange={(v) => update({ subtitle: v })} />
          <Text label="Link" hint="Use # for no link." value={item.link} onChange={(v) => update({ link: v })} />
        </div>
      </>
    )}
  />
);

export default function AboutEditor() {
  return (
    <EditorPage
      section="about"
      title="About"
      subtitle="Illustration, timeline, skills, projects and achievements"
      tabs={TABS}
      render={(data, set, active) => (
        <>
          {active === 'intro' && (
            <>
              <Card title="Illustration">
                <ImageField value={data.image} onChange={(v) => set('image', v)} />
              </Card>
              <Card title="Heading and lead">
                <RichTextEditor label="Heading" value={data.heading} onChange={(v) => set('heading', v)} rows={2} />
                <RichTextEditor
                  label="Lead paragraph"
                  value={data.lead}
                  onChange={(v) => set('lead', v)}
                  rows={7}
                  allowCv
                />
              </Card>
            </>
          )}

          {active === 'journey' && (
            <Card title="Journey timeline">
              <Text label="Section title" value={data.journeyTitle} onChange={(v) => set('journeyTitle', v)} />
              <ListEditor
                items={data.journey || []}
                onChange={(v) => set('journey', v)}
                addLabel="Add entry"
                title={(item) => item.title || 'Untitled'}
                newItem={{ title: '', subtitle: '', tags: [] }}
                renderItem={(item, update) => (
                  <>
                    <div className="admin-grid cols-2">
                      <Text label="Organisation" value={item.title} onChange={(v) => update({ title: v })} />
                      <Text label="Role / description" value={item.subtitle} onChange={(v) => update({ subtitle: v })} />
                    </div>
                    <StringList label="Tags" items={item.tags || []} onChange={(v) => update({ tags: v })} />
                  </>
                )}
              />
            </Card>
          )}

          {active === 'skills' && (
            <Card title="Tech stack & tools">
              <Text label="Section title" value={data.skillsTitle} onChange={(v) => set('skillsTitle', v)} />
              <ListEditor
                items={data.skillGroups || []}
                onChange={(v) => set('skillGroups', v)}
                addLabel="Add skill group"
                title={(item) => item.title || 'Untitled group'}
                newItem={{ title: '', icon: 'code', variant: 'solid', items: [] }}
                renderItem={(item, update) => (
                  <>
                    <div className="admin-grid cols-2">
                      <Text label="Group title" value={item.title} onChange={(v) => update({ title: v })} />
                      <Select
                        label="Chip style"
                        value={item.variant}
                        onChange={(v) => update({ variant: v })}
                        options={[
                          { value: 'solid', label: 'Solid (gradient)' },
                          { value: 'outline', label: 'Outline' },
                          { value: 'soft', label: 'Soft tint' },
                        ]}
                      />
                    </div>
                    <IconPicker value={item.icon} onChange={(v) => update({ icon: v })} />
                    <StringList label="Skills" items={item.items || []} onChange={(v) => update({ items: v })} />
                  </>
                )}
              />
            </Card>
          )}

          {active === 'projects' && (
            <Card title="Projects & portfolios" hint="Each group becomes a tab on the About page.">
              <Text label="Section title" value={data.projectsTitle} onChange={(v) => set('projectsTitle', v)} />
              <ListEditor
                items={data.projectTabs || []}
                onChange={(v) => set('projectTabs', v)}
                addLabel="Add tab"
                title={(item) => item.title || 'Untitled tab'}
                newItem={() => ({ key: `tab${Date.now()}`, title: 'New tab', projects: [] })}
                renderItem={(tab, updateTab) => (
                  <>
                    <div className="admin-grid cols-2">
                      <Text label="Tab title" value={tab.title} onChange={(v) => updateTab({ title: v })} />
                      <Text label="Key" hint="Must be unique." value={tab.key} onChange={(v) => updateTab({ key: v })} />
                    </div>
                    <ListEditor
                      items={tab.projects || []}
                      onChange={(v) => updateTab({ projects: v })}
                      addLabel="Add project"
                      title={(p) => p.title || 'Untitled project'}
                      newItem={{ title: '', desc: '', icon: 'code', link: 'https://' }}
                      renderItem={(project, updateProject) => (
                        <>
                          <div className="admin-grid cols-2">
                            <Text label="Title" value={project.title} onChange={(v) => updateProject({ title: v })} />
                            <Text label="Link" value={project.link} onChange={(v) => updateProject({ link: v })} />
                          </div>
                          <TextArea label="Description" value={project.desc} onChange={(v) => updateProject({ desc: v })} />
                          <IconPicker value={project.icon} onChange={(v) => updateProject({ icon: v })} />
                        </>
                      )}
                    />
                  </>
                )}
              />
            </Card>
          )}

          {active === 'achievements' && (
            <>
              <Card title="Section heading">
                <Text label="Section title" value={data.achievementsTitle} onChange={(v) => set('achievementsTitle', v)} />
              </Card>

              <Card title="Publications & thesis">
                <Text label="Accordion label" value={data.publicationsTitle} onChange={(v) => set('publicationsTitle', v)} />
                {linkList(data.publications, (v) => set('publications', v), 'Add publication')}
              </Card>

              <Card title="National level exams">
                <Text label="Accordion label" value={data.examsTitle} onChange={(v) => set('examsTitle', v)} />
                {linkList(data.exams, (v) => set('exams', v), 'Add exam')}
              </Card>

              <Card title="Online certifications" hint="The count in the accordion label is added automatically.">
                <Text label="Accordion label" value={data.certificatesTitle} onChange={(v) => set('certificatesTitle', v)} />
                <ListEditor
                  items={data.certificates || []}
                  onChange={(v) => set('certificates', v)}
                  addLabel="Add certificate"
                  title={(item) => item.title || 'Untitled'}
                  newItem={{ title: '', link: 'https://' }}
                  renderItem={(item, update) => (
                    <div className="admin-grid cols-2">
                      <Text label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                      <Text label="Link" value={item.link} onChange={(v) => update({ link: v })} />
                    </div>
                  )}
                />
              </Card>
            </>
          )}

          {active === 'highlights' && (
            <Card
              title="Interests & socials"
              hint="The three cards at the bottom of the page. Use badges or links — a card can show either."
            >
              <ListEditor
                items={data.highlights || []}
                onChange={(v) => set('highlights', v)}
                addLabel="Add card"
                title={(item) => item.title || 'Untitled card'}
                newItem={{ icon: 'star', title: '', desc: '', badges: [], links: [] }}
                renderItem={(card, update) => (
                  <>
                    <div className="admin-grid cols-2">
                      <Text label="Title" value={card.title} onChange={(v) => update({ title: v })} />
                      <Text label="Description" value={card.desc} onChange={(v) => update({ desc: v })} />
                    </div>
                    <IconPicker value={card.icon} onChange={(v) => update({ icon: v })} />
                    <StringList label="Badges" items={card.badges || []} onChange={(v) => update({ badges: v })} />
                    <ListEditor
                      items={card.links || []}
                      onChange={(v) => update({ links: v })}
                      addLabel="Add link pill"
                      title={(l) => l.label || 'Untitled'}
                      newItem={{ label: '', href: 'https://' }}
                      empty="No link pills on this card."
                      renderItem={(link, updateLink) => (
                        <div className="admin-grid cols-2">
                          <Text label="Label" value={link.label} onChange={(v) => updateLink({ label: v })} />
                          <Text label="URL" value={link.href} onChange={(v) => updateLink({ href: v })} />
                        </div>
                      )}
                    />
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
