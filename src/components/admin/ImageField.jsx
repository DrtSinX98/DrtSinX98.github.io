'use client';

import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Button, Field } from './ui';

/**
 * URL field with a preview and an "Upload to ImgBB" button.
 * Existing images keep their current CDN URLs until they're replaced.
 */
export default function ImageField({ label, hint, value, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.src);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div className="admin-image-field">
        <div
          className="admin-image-preview"
          style={value ? { backgroundImage: `url("${value}")` } : undefined}
        >
          {!value && 'No image'}
        </div>
        <div className="controls">
          <input
            className="admin-input mb-2"
            value={value ?? ''}
            placeholder="https://i.ibb.co/..."
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <Button onClick={() => inputRef.current?.click()} disabled={busy}>
              {busy ? <span className="admin-spinner" /> : <FontAwesomeIcon icon={faUpload} />}
              {busy ? 'Uploading…' : 'Upload to ImgBB'}
            </Button>
            {value && (
              <Button variant="danger" size="sm" onClick={() => onChange('')}>
                Clear
              </Button>
            )}
          </div>
          {error && <div className="field-hint" style={{ color: '#ff8f8f' }}>{error}</div>}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => upload(e.target.files?.[0])}
          />
        </div>
      </div>
    </Field>
  );
}
