'use client';

import React, { useId } from 'react';
import { Check, SlidersHorizontal } from 'lucide-react';
import { THEME_PRESETS, presetOf } from '@/lib/themePresets';

/**
 * Template chooser for the site's colours.
 *
 * A real radio group: the inputs are visually hidden but focusable, so arrow keys
 * move between templates and screen readers announce "Rosé, radio button, 1 of 6,
 * selected". The selected card is marked by a tick and a heavier border as well
 * as colour, so it doesn't rely on colour alone.
 *
 * The swatches are, left to right: the light page, the accent, the ink, and the
 * dark page — i.e. what a template looks like in both modes.
 */
export default function ThemePresetPicker({ theme, onPick }) {
  const name = useId();
  const current = presetOf(theme);

  return (
    <fieldset className="admin-presets">
      <legend>Template</legend>
      <div className="admin-presets__grid">
        {THEME_PRESETS.map((preset) => {
          const selected = current === preset.key;
          return (
            <label key={preset.key} className={`admin-preset${selected ? ' is-selected' : ''}`}>
              <input
                type="radio"
                className="admin-preset__input"
                name={name}
                checked={selected}
                onChange={() => onPick(preset)}
              />
              <span className="admin-preset__swatches" aria-hidden="true">
                {preset.theme ? (
                  [preset.theme.tertiaryColor, preset.theme.secondaryColor, preset.theme.primaryColor, preset.theme.primaryColorDark].map(
                    (colour) => <i key={colour} style={{ background: colour }} />,
                  )
                ) : (
                  <SlidersHorizontal size={20} />
                )}
              </span>
              <span className="admin-preset__label">
                {preset.label}
                {selected && <Check size={16} aria-hidden="true" />}
              </span>
              <span className="admin-preset__blurb">{preset.blurb}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
