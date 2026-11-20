'use client';

import React, { useId, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button, Field } from './ui';

/**
 * URL field with a preview and an "Upload to ImgBB" button.
 * Existing images keep their current CDN URLs until they're replaced.
 */
export default function ImageField({ label, hint, value, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const id = useId();

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
    <Field label={label} hint={hint} htmlFor={id}>
      <div className="admin-image-field">
        <div
          className="admin-image-preview"
          role="img"
          aria-label={value ? `${label || 'Image'} preview` : 'No image set'}
          style={value ? { backgroundImage: `url("${value}")` } : undefined}
        >
          {!value && 'No image'}
        </div>
        <div className="controls">
          <input
            id={id}
            className="admin-input"
            value={value ?? ''}
            placeholder="https://i.ibb.co/..."
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="admin-actions">
            <Button onClick={() => inputRef.current?.click()} disabled={busy}>
              {busy ? <span className="admin-spinner" aria-hidden="true" /> : <Upload size={16} aria-hidden="true" />}
              {busy ? 'Uploading…' : 'Upload to ImgBB'}
            </Button>
            {value && (
              <Button variant="danger" size="sm" onClick={() => onChange('')}>
                <X size={14} aria-hidden="true" /> Clear
              </Button>
            )}
          </div>
          {error && (
            <div className="field-hint field-hint--error" role="alert">
              {error}
            </div>
          )}
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
