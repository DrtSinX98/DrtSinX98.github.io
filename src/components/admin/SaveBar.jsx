'use client';

import React, { useState } from 'react';
import { Button } from './ui';

export default function SaveBar({ dirty, saving, status, onSave, onReset, onRestoreDefaults }) {
  const [confirming, setConfirming] = useState(false);

  let cls = 'status';
  let text = 'No unsaved changes.';
  if (status?.type === 'error') {
    cls = 'status error';
    text = status.message;
  } else if (dirty) {
    cls = 'status dirty';
    text = 'You have unsaved changes.';
  } else if (status?.type === 'saved') {
    cls = 'status saved';
    text = status.message;
  }

  return (
    <div className="admin-savebar">
      <span className={cls}>{text}</span>

      {onRestoreDefaults &&
        (confirming ? (
          <>
            <span className="status dirty">Replace all content with the original site text?</span>
            <Button size="sm" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setConfirming(false);
                onRestoreDefaults();
              }}
            >
              Yes, restore
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={() => setConfirming(true)} disabled={saving}>
            Restore defaults
          </Button>
        ))}

      <Button onClick={onReset} disabled={!dirty || saving}>
        Discard
      </Button>
      <Button variant="primary" onClick={onSave} disabled={!dirty || saving}>
        {saving ? <span className="admin-spinner" /> : null}
        {saving ? 'Saving…' : 'Save changes'}
      </Button>
    </div>
  );
}
