'use client';

import React, { useEffect, useId, useRef } from 'react';
import { Check, Palette, X } from 'lucide-react';
import { THEME_PRESETS } from '@/lib/themePresets';

// "Manual" is the admin's own free-form option; visitors choose from the templates.
const OPTIONS = THEME_PRESETS.filter((p) => p.theme);

/**
 * The easter egg's panel: the site owner's colour templates, for this visitor
 * only. A real radio group (arrow keys, announced as "n of 6"), Escape closes it
 * and hands focus back to the switch, and so does a click anywhere outside.
 *
 * The selected card carries a tick and a heavier border, not just colour.
 */
export default function VisitorThemePicker({ chosen, onPick, onClose, anchor }) {
  const name = useId();
  const panel = useRef(null);

  // Move focus into the panel, onto the current choice.
  useEffect(() => {
    const target = panel.current?.querySelector('input:checked') || panel.current?.querySelector('input');
    target?.focus();
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      if (panel.current?.contains(e.target) || anchor.current?.contains(e.target)) return;
      onClose();
    };
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [anchor, onClose]);

  const current = chosen || 'default';

  return (
    <div className="vx-themepick" ref={panel} role="dialog" aria-label="Choose your theme">
      <div className="vx-themepick__head">
        <Palette size={18} aria-hidden="true" />
        <strong>Your theme</strong>
        <button type="button" className="vx-themepick__close" onClick={onClose} aria-label="Close theme picker">
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <fieldset className="vx-themepick__list">
        <legend className="vx-sr-only">Colour template</legend>
        {[{ key: 'default', label: 'Site default', theme: null }, ...OPTIONS].map((option) => {
          const selected = current === option.key;
          return (
            <label key={option.key} className={`vx-themepick__opt${selected ? ' is-selected' : ''}`}>
              <input
                type="radio"
                name={name}
                className="vx-themepick__input"
                checked={selected}
                onChange={() => onPick(option.key === 'default' ? null : option.key)}
              />
              <span className="vx-themepick__swatches" aria-hidden="true">
                {option.theme ? (
                  [option.theme.tertiaryColor, option.theme.secondaryColor, option.theme.primaryColor, option.theme.primaryColorDark].map(
                    (colour) => <i key={colour} style={{ background: colour }} />,
                  )
                ) : (
                  <Palette size={16} />
                )}
              </span>
              <span className="vx-themepick__text">
                <span className="vx-themepick__label">{option.label}</span>
                {option.blurb && <span className="vx-themepick__blurb">{option.blurb}</span>}
              </span>
              {selected && <Check size={18} className="vx-themepick__tick" aria-hidden="true" />}
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}
