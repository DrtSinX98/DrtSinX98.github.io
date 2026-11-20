'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CircleCheck, TriangleAlert } from 'lucide-react';
import { Button } from './ui';

/**
 * The bar that follows you down a long editor. It sticks to the bottom of the
 * content column rather than being pinned to the window, so it never needs to
 * know how wide the sidebar is.
 *
 * - The status line is a polite live region, so "Saved" is announced.
 * - ⌘S / Ctrl+S saves (and stops the browser offering to save the page).
 */
export default function SaveBar({ dirty, saving, status, onSave, onReset, onRestoreDefaults }) {
  const [confirming, setConfirming] = useState(false);

  let tone = 'idle';
  let text = 'No unsaved changes.';
  if (status?.type === 'error') {
    tone = 'error';
    text = status.message;
  } else if (dirty) {
    tone = 'dirty';
    text = 'You have unsaved changes.';
  } else if (status?.type === 'saved') {
    tone = 'saved';
    text = status.message;
  }

  // Keep the latest values in a ref so the key handler is registered once.
  const latest = useRef({ dirty, saving, onSave });
  latest.current = { dirty, saving, onSave };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        const { dirty: d, saving: s, onSave: save } = latest.current;
        if (d && !s) save();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="admin-savebar">
      <p className={`admin-savebar__status is-${tone}`} role="status" aria-live="polite">
        {tone === 'saved' && <CircleCheck size={16} aria-hidden="true" />}
        {tone === 'error' && <TriangleAlert size={16} aria-hidden="true" />}
        {tone === 'dirty' && <span className="admin-savebar__dot" aria-hidden="true" />}
        <span>{text}</span>
      </p>

      <div className="admin-savebar__actions">
        {onRestoreDefaults &&
          (confirming ? (
            <>
              <span className="admin-savebar__ask">Replace all content with the original site text?</span>
              <Button size="sm" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="danger solid"
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
        <Button variant="primary" onClick={onSave} disabled={!dirty || saving} title="Save (⌘S / Ctrl+S)">
          {saving ? <span className="admin-spinner" aria-hidden="true" /> : null}
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}
