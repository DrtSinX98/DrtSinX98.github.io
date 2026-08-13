import React from 'react';

/**
 * Renders an editable rich-text value.
 *
 * Content is stored as an array of fragments so the admin panel can offer a
 * simple "text + accent + line break" editor without needing a full HTML editor:
 *
 *   [{ text: "I'm " }, { text: 'currently', pink: true }, { br: true }]
 *
 * A plain string is also accepted and rendered as-is.
 */
export default function RichText({ value, renderSpecial }) {
  if (!value) return null;
  if (typeof value === 'string') return <>{value}</>;
  if (!Array.isArray(value)) return null;

  return (
    <>
      {value.map((part, i) => {
        if (!part) return null;
        if (part.br) return <br key={i} />;

        const special = renderSpecial?.(part, i);
        if (special !== undefined && special !== null) return <React.Fragment key={i}>{special}</React.Fragment>;

        if (part.pink) {
          return (
            <span className="pink" key={i}>
              {part.text}
            </span>
          );
        }
        return <React.Fragment key={i}>{part.text}</React.Fragment>;
      })}
    </>
  );
}

/** Flattens fragments to plain text — used for <title>/meta values. */
export function richTextToString(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (!Array.isArray(value)) return '';
  return value.map((p) => (p?.br ? ' ' : p?.text || '')).join('');
}
