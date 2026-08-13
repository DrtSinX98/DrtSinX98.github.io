'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import AdminShell, { SectionTabs } from './AdminShell';
import SaveBar from './SaveBar';
import useContentEditor from './useContentEditor';

/**
 * Shared scaffolding for every content section: loads the document, renders the
 * component tabs, and wires the save bar. `render(data, set, editor)` draws the
 * fields for the active tab.
 */
export default function EditorPage({ section, title, subtitle, tabs, render }) {
  const searchParams = useSearchParams();
  const editor = useContentEditor(section);
  const active = tabs.some((t) => t.key === searchParams.get('section'))
    ? searchParams.get('section')
    : tabs[0].key;

  return (
    <AdminShell title={title} subtitle={subtitle}>
      <SectionTabs tabs={tabs} active={active} />

      {editor.loading && <div className="admin-empty">Loading…</div>}

      {!editor.loading && editor.status.type === 'error' && !editor.data && (
        <div className="admin-alert error">{editor.status.message}</div>
      )}

      {!editor.loading && editor.data && render(editor.data, editor.set, active, editor)}

      {!editor.loading && editor.data && (
        <SaveBar
          dirty={editor.dirty}
          saving={editor.saving}
          status={editor.status}
          onSave={editor.save}
          onReset={editor.reset}
          onRestoreDefaults={editor.restoreDefaults}
        />
      )}
    </AdminShell>
  );
}
