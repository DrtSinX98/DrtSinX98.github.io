'use client';

import React from 'react';
import EditorPage from '../EditorPage';
import { Card, Text, Switch, ListEditor, StringList } from '../ui';
import RichTextEditor from '../RichTextEditor';
import ImageField from '../ImageField';

const TABS = [
  { key: 'intro', label: 'Intro' },
  { key: 'modules', label: 'Modules' },
];

export default function LecturesEditor() {
  return (
    <EditorPage
      section="lectures"
      title="Lectures"
      subtitle="Course modules, topics and sub-topics"
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
                <RichTextEditor label="Lead paragraph" value={data.lead} onChange={(v) => set('lead', v)} rows={7} />
              </Card>
            </>
          )}

          {active === 'modules' && (
            <Card
              title="Modules"
              hint="Two-column modules show each topic's sub-topics in a side panel; single-column modules just list the topics."
            >
              <ListEditor
                items={data.modules || []}
                onChange={(v) => set('modules', v)}
                addLabel="Add module"
                title={(item) => `${item.header || ''} — ${item.title || 'Untitled'}`}
                newItem={{ header: 'Module', title: '', split: false, topics: [] }}
                renderItem={(mod, updateModule) => (
                  <>
                    <div className="admin-grid cols-2">
                      <Text label="Card header" value={mod.header} onChange={(v) => updateModule({ header: v })} />
                      <Text label="Module title" value={mod.title} onChange={(v) => updateModule({ title: v })} />
                    </div>
                    <Switch
                      label="Two-column layout with sub-topic panel"
                      checked={mod.split}
                      onChange={(v) => updateModule({ split: v })}
                    />
                    <ListEditor
                      items={mod.topics || []}
                      onChange={(v) => updateModule({ topics: v })}
                      addLabel="Add topic"
                      title={(t) => t.title || 'Untitled topic'}
                      newItem={{ title: '', subtopics: [] }}
                      renderItem={(topic, updateTopic) => (
                        <>
                          <Text label="Topic" value={topic.title} onChange={(v) => updateTopic({ title: v })} />
                          <StringList
                            label="Sub-topics"
                            hint={mod.split ? undefined : 'Only shown when the module uses the two-column layout.'}
                            items={topic.subtopics || []}
                            onChange={(v) => updateTopic({ subtopics: v })}
                          />
                        </>
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
