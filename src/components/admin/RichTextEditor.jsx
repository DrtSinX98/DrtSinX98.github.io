'use client';

import React from 'react';
import { Field } from './ui';

/**
 * The site stores rich text as fragments (see `components/RichText.jsx`).
 * Editing raw fragments is miserable, so this presents them as plain text with
 * two markers:
 *
 *   **accent**            -> { text, pink: true }
 *   [cv]Label[/cv]        -> the CV-modal chip on the About page
 *   line break            -> { br: true }
 */

const TOKEN = /(\*\*[\s\S]*?\*\*|\[cv\][\s\S]*?\[\/cv\])/g;

export function fragmentsToText(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (!Array.isArray(value)) return '';

  return value
    .map((part) => {
      if (!part) return '';
      if (part.br) return '\n';
      if (part.cv) return `[cv]${part.text ?? ''}[/cv]`;
      if (part.pink) return `**${part.text ?? ''}**`;
      return part.text ?? '';
    })
    .join('');
}

export function textToFragments(text) {
  const fragments = [];

  const pushPlain = (chunk) => {
    // Newlines become explicit break fragments.
    const lines = chunk.split('\n');
    lines.forEach((line, i) => {
      if (i > 0) fragments.push({ br: true });
      if (line) fragments.push({ text: line });
    });
  };

  for (const piece of String(text ?? '').split(TOKEN)) {
    if (!piece) continue;
    if (piece.startsWith('**') && piece.endsWith('**') && piece.length >= 4) {
      fragments.push({ text: piece.slice(2, -2), pink: true });
    } else if (piece.startsWith('[cv]') && piece.endsWith('[/cv]')) {
      fragments.push({ text: piece.slice(4, -5), cv: true });
    } else {
      pushPlain(piece);
    }
  }

  return fragments;
}

export default function RichTextEditor({ label, hint, value, onChange, rows = 4, allowCv = false }) {
  const defaultHint = `Wrap text in **double asterisks** for the pink accent. Press Enter for a line break.${
    allowCv ? ' Use [cv]Label[/cv] for the CV chip.' : ''
  }`;

  return (
    <Field label={label} hint={hint || defaultHint}>
      <textarea
        className="admin-textarea"
        rows={rows}
        value={fragmentsToText(value)}
        onChange={(e) => onChange(textToFragments(e.target.value))}
      />
    </Field>
  );
}
