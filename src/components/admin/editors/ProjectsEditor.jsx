'use client';

import React from 'react';
import EditorPage from '../EditorPage';
import { Card, Text, TextArea, Select, Switch, ListEditor, IconPicker, StringList } from '../ui';
import RichTextEditor from '../RichTextEditor';
import ImageField from '../ImageField';

const TABS = [
  { key: 'intro', label: 'Intro' },
  { key: 'areas', label: 'Areas' },
  { key: 'projects', label: 'Projects' },
];

const STATUSES = [
  { value: '', label: 'Not shown' },
  { value: 'active', label: 'Active' },
  { value: 'maintained', label: 'Maintained' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
];

export default function ProjectsEditor() {
  return (
    <EditorPage
      section="projects"
      title="Projects"
      subtitle="Your work, grouped by area, with links to each"
      tabs={TABS}
      render={(data, set, active) => {
        const areas = data.categories || [];
        return (
          <>
            {active === 'intro' && (
              <>
                <Card
                  title="Illustration"
                  hint="Clear it to show the page's periodic-table tile instead."
                >
                  <ImageField value={data.image} onChange={(v) => set('image', v)} />
                </Card>
                <Card title="Heading and lead">
                  <RichTextEditor label="Heading" value={data.heading} onChange={(v) => set('heading', v)} rows={2} />
                  <RichTextEditor label="Lead paragraph" value={data.lead} onChange={(v) => set('lead', v)} rows={4} />
                </Card>
              </>
            )}

            {active === 'areas' && (
              <Card
                title="Areas"
                hint="Each area becomes a filter button above the projects. An area with no projects is hidden."
              >
                <ListEditor
                  items={areas}
                  onChange={(v) => set('categories', v)}
                  addLabel="Add area"
                  title={(item) => item.title || 'Untitled area'}
                  newItem={() => ({ key: `area${Date.now()}`, title: 'New area' })}
                  renderItem={(area, update) => (
                    <div className="admin-grid cols-2">
                      <Text label="Name" value={area.title} onChange={(v) => update({ title: v })} />
                      <Text
                        label="Key"
                        hint="Internal and unique; projects point to it. Change it only if you also change the projects."
                        value={area.key}
                        onChange={(v) => update({ key: v })}
                      />
                    </div>
                  )}
                />
              </Card>
            )}

            {active === 'projects' && (
              <Card
                title="Projects"
                hint="Featured projects are shown wider. Everything except the title is optional."
              >
                <ListEditor
                  items={data.items || []}
                  onChange={(v) => set('items', v)}
                  addLabel="Add project"
                  title={(item) => `${item.title || 'Untitled project'}${item.featured ? ' — featured' : ''}`}
                  newItem={() => ({
                    title: '',
                    summary: '',
                    category: areas[0]?.key || '',
                    role: '',
                    year: '',
                    status: '',
                    icon: 'code',
                    image: '',
                    tags: [],
                    links: [],
                    featured: false,
                  })}
                  renderItem={(project, update) => (
                    <>
                      <div className="admin-grid cols-2">
                        <Text label="Title" value={project.title} onChange={(v) => update({ title: v })} />
                        <Select
                          label="Area"
                          value={project.category}
                          onChange={(v) => update({ category: v })}
                          options={[
                            ...(areas.some((a) => a.key === project.category) ? [] : [{ value: project.category || '', label: 'Choose an area…' }]),
                            ...areas.map((a) => ({ value: a.key, label: a.title })),
                          ]}
                        />
                      </div>
                      <TextArea label="Summary" rows={3} value={project.summary} onChange={(v) => update({ summary: v })} />
                      <div className="admin-grid cols-3">
                        <Text label="Your role" value={project.role} onChange={(v) => update({ role: v })} />
                        <Text label="Year" value={project.year} onChange={(v) => update({ year: v })} />
                        <Select
                          label="Status"
                          value={project.status}
                          onChange={(v) => update({ status: v })}
                          options={STATUSES}
                        />
                      </div>
                      <StringList
                        label="Tags"
                        hint="Short labels for the stack or topic."
                        items={project.tags || []}
                        onChange={(v) => update({ tags: v })}
                      />
                      <ListEditor
                        items={project.links || []}
                        onChange={(v) => update({ links: v })}
                        addLabel="Add link"
                        title={(link) => link.label || link.href || 'New link'}
                        newItem={{ label: 'GitHub', href: 'https://' }}
                        renderItem={(link, updateLink) => (
                          <div className="admin-grid cols-2">
                            <Text label="Button label" value={link.label} onChange={(v) => updateLink({ label: v })} />
                            <Text label="Address" value={link.href} onChange={(v) => updateLink({ href: v })} />
                          </div>
                        )}
                      />
                      <IconPicker value={project.icon} onChange={(v) => update({ icon: v })} />
                      <ImageField
                        label="Cover image"
                        hint="Optional. Shown across the top of the card."
                        value={project.image}
                        onChange={(v) => update({ image: v })}
                      />
                      <Switch
                        label="Feature this project (wider card)"
                        checked={Boolean(project.featured)}
                        onChange={(v) => update({ featured: v })}
                      />
                    </>
                  )}
                />
              </Card>
            )}
          </>
        );
      }}
    />
  );
}
