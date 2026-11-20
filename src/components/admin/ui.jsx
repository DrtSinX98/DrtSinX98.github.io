'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, CircleCheck, Info, Plus, Trash2, TriangleAlert, X } from 'lucide-react';
import { ICON_NAMES } from '@/lib/icons';
import Icon from '@/components/Icon';

/* ---------------------------------------------------------------- primitives */

export function Card({ title, hint, children, actions }) {
  return (
    <section className="admin-card">
      {(title || actions) && (
        <div className="admin-card__head">
          <div className="admin-card__titles">
            {title && <h2>{title}</h2>}
            {hint && <p className="hint">{hint}</p>}
          </div>
          {actions}
        </div>
      )}
      {!title && hint && <p className="hint">{hint}</p>}
      {children}
    </section>
  );
}

/**
 * A labelled control. `htmlFor` ties the label to its input: the old version
 * rendered a bare <label>, so no field in the panel had an accessible name.
 */
export function Field({ label, hint, htmlFor, children }) {
  return (
    <div className="admin-field">
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
      {hint && (
        <div className="field-hint" id={htmlFor ? `${htmlFor}-hint` : undefined}>
          {hint}
        </div>
      )}
    </div>
  );
}

export function Text({ label, hint, value, onChange, placeholder, type = 'text', ...rest }) {
  const id = useId();
  const input = (
    <input
      id={id}
      className="admin-input"
      type={type}
      value={value ?? ''}
      placeholder={placeholder}
      aria-describedby={hint ? `${id}-hint` : undefined}
      onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      {...rest}
    />
  );

  return (
    <Field label={label} hint={hint} htmlFor={id}>
      {type === 'color' ? (
        // A swatch alone doesn't say which colour it is; show the hex beside it.
        <div className="admin-colorfield">
          {input}
          <code>{value || '—'}</code>
        </div>
      ) : (
        input
      )}
    </Field>
  );
}

export function TextArea({ label, hint, value, onChange, rows = 3, placeholder }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <textarea
        id={id}
        className="admin-textarea"
        rows={rows}
        value={value ?? ''}
        placeholder={placeholder}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function Select({ label, hint, value, onChange, options }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <select
        id={id}
        className="admin-select"
        value={value ?? ''}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
      >
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

/**
 * The real checkbox is visually hidden but still focusable (it used to be
 * `display: none`, which removed every switch from the keyboard and from
 * assistive tech). The track must stay immediately after the input so the
 * `input:checked + .track` selectors work.
 */
export function Switch({ label, checked, onChange, hint }) {
  const id = useId();
  return (
    <div className="admin-field">
      <label className="admin-switch" htmlFor={id}>
        <span className="switch-label">{label}</span>
        <input
          id={id}
          className="admin-switch__input"
          type="checkbox"
          role="switch"
          checked={Boolean(checked)}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="track" aria-hidden="true" />
      </label>
      {hint && (
        <div className="field-hint" id={`${id}-hint`}>
          {hint}
        </div>
      )}
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

/** Status message with an icon and the right live-region role. */
export function Alert({ type = 'info', children }) {
  const Glyph = { error: TriangleAlert, success: CircleCheck }[type] || Info;
  return (
    <div className={`admin-alert ${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <Glyph size={18} aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

/** Flat pulsing placeholders while data loads. */
export function LoadingBlock({ label = 'Loading', rows = 3 }) {
  return (
    <div className="admin-loading" role="status" aria-live="polite">
      <span className="admin-sr-only">{label}…</span>
      {Array.from({ length: rows }, (_, i) => (
        <span key={i} className="admin-loading__bar" aria-hidden="true" />
      ))}
    </div>
  );
}

export function IconPicker({ label = 'Icon', value, onChange }) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id}>
      <div className="admin-iconpicker">
        <span className="admin-iconpicker__preview" aria-hidden="true">
          <Icon name={value} />
        </span>
        <select id={id} className="admin-select" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
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

/* --------------------------------------------------------------- dialogs */

/**
 * In-panel replacements for window.confirm / window.prompt, built on the native
 * <dialog> element (so focus trapping, Escape and the backdrop come for free).
 *
 *   const { confirm, prompt, dialog } = useAdminDialogs();
 *   if (await confirm({ title: 'Delete?', danger: true })) …
 *   const name = await prompt({ title: 'New city', label: 'Name' });   // null if cancelled
 *
 * Render `{dialog}` once anywhere in the component.
 */
function DialogView({ config, onClose }) {
  const ref = useRef(null);
  const [value, setValue] = useState(config.defaultValue || '');
  const uid = useId();
  const isPrompt = config.kind === 'prompt';
  const cancelValue = isPrompt ? null : false;

  useEffect(() => {
    const el = ref.current;
    el.showModal();
    return () => {
      if (el.open) el.close();
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!isPrompt) return onClose(true);
    const trimmed = value.trim();
    return onClose(trimmed || null);
  };

  return (
    <dialog
      ref={ref}
      className="admin-dialog"
      aria-labelledby={`${uid}-title`}
      // Escape fires `cancel`; stop the browser closing it itself so the
      // promise is always settled through onClose.
      onCancel={(e) => {
        e.preventDefault();
        onClose(cancelValue);
      }}
      // A click on the backdrop targets the <dialog> element itself.
      onClick={(e) => {
        if (e.target === ref.current) onClose(cancelValue);
      }}
    >
      <form className="admin-dialog__form" onSubmit={submit}>
        <h2 id={`${uid}-title`}>{config.title}</h2>
        {config.message && <p className="admin-dialog__message">{config.message}</p>}

        {isPrompt && (
          <Field label={config.label} hint={config.hint} htmlFor={`${uid}-input`}>
            <input
              id={`${uid}-input`}
              className="admin-input"
              value={value}
              placeholder={config.placeholder}
              list={config.options?.length ? `${uid}-options` : undefined}
              autoComplete="off"
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
            {/* Native suggestions: typing filters them, and it is keyboard- and
                screen-reader-accessible without any extra widget. */}
            {config.options?.length > 0 && (
              <datalist id={`${uid}-options`}>
                {config.options.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            )}
          </Field>
        )}

        <div className="admin-dialog__actions">
          <Button onClick={() => onClose(cancelValue)}>Cancel</Button>
          <Button type="submit" variant={config.danger ? 'danger solid' : 'primary'} disabled={isPrompt && !value.trim()}>
            {config.confirmLabel || (isPrompt ? 'Continue' : 'Confirm')}
          </Button>
        </div>
      </form>
    </dialog>
  );
}

export function useAdminDialogs() {
  const [config, setConfig] = useState(null);
  const resolver = useRef(null);

  const ask = useCallback(
    (cfg) =>
      new Promise((resolve) => {
        resolver.current = resolve;
        setConfig(cfg);
      }),
    [],
  );

  const onClose = useCallback((result) => {
    resolver.current?.(result);
    resolver.current = null;
    setConfig(null);
  }, []);

  return {
    confirm: useCallback((cfg) => ask({ kind: 'confirm', ...cfg }), [ask]),
    prompt: useCallback((cfg) => ask({ kind: 'prompt', ...cfg }), [ask]),
    dialog: config ? <DialogView config={config} onClose={onClose} /> : null,
  };
}

/* ------------------------------------------------------------- list editing */

/**
 * One collapsible row: a toggle for the title (so the whole title is the hit
 * target), action buttons beside it, and a body that stays mounted while hidden
 * so edits and field state survive collapsing.
 *
 * Controlled when `open` is passed; otherwise it manages its own state.
 */
export function CollapsibleItem({ id, index, title, badge, actions, open: openProp, onToggle, defaultOpen = false, children }) {
  const [openState, setOpenState] = useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : openState;
  const bodyId = useId();

  const toggle = () => (controlled ? onToggle?.(!open) : setOpenState((o) => !o));

  return (
    <div id={id} className={`admin-item${open ? ' is-open' : ''}`}>
      <div className="admin-item-head">
        <button type="button" className="admin-item-toggle" onClick={toggle} aria-expanded={open} aria-controls={bodyId}>
          <ChevronDown size={16} className="chev" aria-hidden="true" />
          {index != null && <span className="index">{index}</span>}
          <span className="title">{title}</span>
          {badge}
        </button>
        {actions && <div className="admin-item-actions">{actions}</div>}
      </div>
      <div id={bodyId} className="admin-item-body" hidden={!open}>
        {children}
      </div>
    </div>
  );
}

/**
 * Reorderable list of objects. `renderItem(item, update, index)` renders the
 * body; `title(item, index)` labels the collapsed header.
 *
 * Long lists start collapsed (the About page alone has a dozen-plus entries per
 * list) and short ones start open. Open/closed state is kept in an array
 * parallel to `items` and moved with them, so reordering never leaves a row
 * open or shut by accident.
 */
export function ListEditor({ items = [], onChange, renderItem, title, newItem, addLabel = 'Add item', empty }) {
  const [open, setOpen] = useState(() => items.map(() => items.length <= 4));

  // If the parent swaps the whole list (load, discard, restore defaults) keep
  // the arrays the same length; anything new starts open.
  const count = items.length;
  useEffect(() => {
    setOpen((prev) => (prev.length === count ? prev : Array.from({ length: count }, (_, i) => prev[i] ?? true)));
  }, [count]);

  const isOpen = (i) => open[i] ?? true;
  const allOpen = items.length > 0 && items.every((_, i) => isOpen(i));

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
    const nextOpen = items.map((_, i) => isOpen(i));
    [nextOpen[index], nextOpen[target]] = [nextOpen[target], nextOpen[index]];
    setOpen(nextOpen);
    onChange(next);
  };

  const remove = (index) => {
    setOpen(items.map((_, i) => isOpen(i)).filter((_, i) => i !== index));
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    setOpen([...items.map((_, i) => isOpen(i)), true]);
    onChange([...items, typeof newItem === 'function' ? newItem() : { ...newItem }]);
  };

  return (
    <div className="admin-list">
      {items.length > 1 && (
        <div className="admin-list__bar">
          <span className="admin-list__count">{items.length} items</span>
          <Button size="sm" onClick={() => setOpen(items.map(() => !allOpen))}>
            {allOpen ? 'Collapse all' : 'Expand all'}
          </Button>
        </div>
      )}

      {items.length === 0 && <div className="admin-empty">{empty || 'Nothing here yet.'}</div>}

      {items.map((item, index) => (
        <CollapsibleItem
          key={index}
          index={index + 1}
          title={title ? title(item, index) : `Item ${index + 1}`}
          open={isOpen(index)}
          onToggle={(next) => setOpen(items.map((_, i) => (i === index ? next : isOpen(i))))}
          actions={
            <>
              <Button size="sm" className="icon-only" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up" title="Move up">
                <ArrowUp size={16} />
              </Button>
              <Button size="sm" className="icon-only" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move down" title="Move down">
                <ArrowDown size={16} />
              </Button>
              <Button size="sm" variant="danger" className="icon-only" onClick={() => remove(index)} aria-label="Delete" title="Delete">
                <Trash2 size={16} />
              </Button>
            </>
          }
        >
          {renderItem(item, (patch) => update(index, patch), index)}
        </CollapsibleItem>
      ))}

      <Button onClick={add}>
        <Plus size={16} /> {addLabel}
      </Button>
    </div>
  );
}

/** Editor for a plain array of strings, shown as removable chips. */
export function StringList({ label, hint, items = [], onChange, placeholder = 'Add and press Enter' }) {
  const [draft, setDraft] = useState('');
  const id = useId();

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft('');
  };

  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <div className="admin-chips">
        {items.map((item, i) => (
          <span className="admin-chip" key={`${item}-${i}`}>
            {item}
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label={`Remove ${item}`}>
              <X size={14} aria-hidden="true" />
            </button>
          </span>
        ))}
        {items.length === 0 && <span className="field-hint">No entries yet.</span>}
      </div>
      <div className="admin-inline">
        <input
          id={id}
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
        <Button onClick={add} aria-label="Add entry" title="Add entry">
          <Plus size={16} />
        </Button>
      </div>
    </Field>
  );
}
