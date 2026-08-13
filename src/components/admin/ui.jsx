'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowUp, faArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ICON_NAMES, getIcon } from '@/lib/icons';

/* ---------------------------------------------------------------- primitives */

export function Card({ title, hint, children, actions }) {
  return (
    <div className="admin-card">
      {(title || actions) && (
        <div className="d-flex align-items-start justify-content-between gap-3">
          <div style={{ minWidth: 0 }}>
            {title && <h2>{title}</h2>}
            {hint && <p className="hint">{hint}</p>}
          </div>
          {actions}
        </div>
      )}
      {!title && hint && <p className="hint">{hint}</p>}
      {children}
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <div className="admin-field">
      {label && <label>{label}</label>}
      {children}
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  );
}

export function Text({ label, hint, value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <Field label={label} hint={hint}>
      <input
        className="admin-input"
        type={type}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        {...rest}
      />
    </Field>
  );
}

export function TextArea({ label, hint, value, onChange, rows = 3, placeholder }) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        className="admin-textarea"
        rows={rows}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function Select({ label, hint, value, onChange, options }) {
  return (
    <Field label={label} hint={hint}>
      <select className="admin-select" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => {
          const { value: v, label: l } = typeof opt === 'string' ? { value: opt, label: opt } : opt;
          return (
            <option key={v} value={v}>
              {l}
            </option>
          );
        })}
      </select>
    </Field>
  );
}

export function Switch({ label, checked, onChange, hint }) {
  // Label first, toggle last: the track has to stay immediately after the input
  // so the `input:checked + .track` styling keeps working.
  return (
    <div className="admin-field">
      <label className="admin-switch">
        <span className="switch-label">{label}</span>
        <input type="checkbox" checked={Boolean(checked)} onChange={(e) => onChange(e.target.checked)} />
        <span className="track" />
      </label>
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  );
}

export function Button({ children, variant, size, className, ...rest }) {
  const cls = ['admin-btn', variant, size, className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

export function IconPicker({ label = 'Icon', value, onChange }) {
  return (
    <Field label={label}>
      <div className="d-flex align-items-center gap-2">
        <span
          style={{
            width: 38,
            height: 38,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--admin-border)',
            borderRadius: 8,
            color: 'var(--admin-accent)',
          }}
        >
          <FontAwesomeIcon icon={getIcon(value)} />
        </span>
        <select className="admin-select" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">— none —</option>
          {ICON_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </Field>
  );
}

/* ------------------------------------------------------------- list editing */

/**
 * Reorderable list of objects. `renderItem(item, update, index)` renders the
 * body; `title(item, index)` labels the collapsed header.
 */
export function ListEditor({ items = [], onChange, renderItem, title, newItem, addLabel = 'Add item', empty }) {
  const update = (index, patch) => {
    const next = [...items];
    next[index] = typeof patch === 'function' ? patch(next[index]) : { ...next[index], ...patch };
    onChange(next);
  };

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div>
      {items.length === 0 && <div className="admin-empty">{empty || 'Nothing here yet.'}</div>}

      {items.map((item, index) => (
        <div className="admin-item" key={index}>
          <div className="admin-item-head">
            <span className="index">{index + 1}</span>
            <span className="title">{title ? title(item, index) : `Item ${index + 1}`}</span>
            <div className="admin-item-actions">
              <Button size="sm" className="icon-only" onClick={() => move(index, -1)} disabled={index === 0} title="Move up">
                <FontAwesomeIcon icon={faArrowUp} />
              </Button>
              <Button size="sm" className="icon-only" onClick={() => move(index, 1)} disabled={index === items.length - 1} title="Move down">
                <FontAwesomeIcon icon={faArrowDown} />
              </Button>
              <Button size="sm" variant="danger" onClick={() => remove(index)} title="Delete">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>
          <div className="admin-item-body">{renderItem(item, (patch) => update(index, patch), index)}</div>
        </div>
      ))}

      <Button onClick={() => onChange([...items, typeof newItem === 'function' ? newItem() : { ...newItem }])}>
        <FontAwesomeIcon icon={faPlus} /> {addLabel}
      </Button>
    </div>
  );
}

/** Editor for a plain array of strings, shown as removable chips. */
export function StringList({ label, hint, items = [], onChange, placeholder = 'Add and press Enter' }) {
  const [draft, setDraft] = React.useState('');

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft('');
  };

  return (
    <Field label={label} hint={hint}>
      <div className="admin-chips mb-2">
        {items.map((item, i) => (
          <span className="admin-chip" key={`${item}-${i}`}>
            {item}
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label={`Remove ${item}`}>
              ×
            </button>
          </span>
        ))}
        {items.length === 0 && <span className="field-hint">No entries yet.</span>}
      </div>
      <div className="d-flex gap-2">
        <input
          className="admin-input"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button onClick={add}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </Field>
  );
}
