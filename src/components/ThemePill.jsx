'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Palette } from 'lucide-react';
import { THEME_PRESETS } from '@/lib/themePresets';

// "Manual" is the admin's own free-form option; visitors choose from the templates.
const OPTIONS = THEME_PRESETS.filter((p) => p.theme);
const themeOf = (key) => THEME_PRESETS.find((p) => p.key === key);
const FLY_MS = 520; // the chosen row glides up into the top row (= its CSS transition)…
const FOLD_MS = 450; // …the list folds away (= --dur-slow) and only then does the colour wash start

const Swatches = ({ theme }) => (
  <span className="vx-themepill__swatches" aria-hidden="true">
    {theme ? (
      [theme.tertiaryColor, theme.secondaryColor, theme.primaryColor, theme.primaryColorDark].map((colour) => (
        <i key={colour} style={{ background: colour }} />
      ))
    ) : (
      <Palette size={16} />
    )}
  </span>
);

/**
 * The theme switch's body: the round sun/moon button (passed in as `children`)
 * and, beside it, the current theme. At rest it is just the circle; on a long
 * press the same shape stretches leftwards into a pill, and clicking the pill
 * lets it grow downwards into the list of every other theme. The current theme
 * stays in the top row; choosing another bounces that row up into its place
 * before the shape folds back into the circle.
 *
 * One element changes shape between `closed`, `pill` and `list`, so every step,
 * in and out, is the same transition. Collapsed parts are `visibility: hidden`,
 * so nothing invisible can take focus.
 */
export default function ThemePill({ phase, setPhase, preset, sitePreset, visitor, onPick, onClose, children }) {
  const listId = useId();
  const panel = useRef(null);
  const head = useRef(null);
  const timer = useRef(null);
  const open = phase !== 'closed';

  // A pick plays out in steps: `flying` (the row rises), then `landed` (the list
  // folds away and the top row shows the new name), then the page washes (onPick),
  // then the shape closes — which resets all three.
  const [flying, setFlying] = useState(null);
  const [landed, setLanded] = useState(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (phase !== 'closed') return;
    setFlying(null);
    setLanded(null);
  }, [phase]);

  // What the top row names: the pick once it has landed, else what is on screen.
  const shown = themeOf(landed || preset);

  const rows = [
    ...(visitor
      ? [
          {
            key: 'default',
            label: 'Site default',
            theme: themeOf(sitePreset)?.theme,
          },
        ]
      : []),
    ...OPTIONS.filter((o) => o.key !== preset),
  ];

  useEffect(() => {
    if (phase === 'pill') head.current?.focus();
  }, [phase]);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !panel.current?.contains(e.target) && setPhase('closed');
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, setPhase]);

  const choose = (option, row) => {
    if (flying) return;
    // Slide the row up by exactly the distance to the top row.
    const dy = head.current.getBoundingClientRect().top - row.getBoundingClientRect().top;
    row.style.setProperty('--fly', `${dy}px`);
    setFlying(option.key);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = setTimeout(
      () => {
        setLanded(option.key === 'default' ? sitePreset : option.key);
        setPhase('pill');
        timer.current = setTimeout(() => onPick(option.key === 'default' ? null : option.key), reduced ? 0 : FOLD_MS);
      },
      reduced ? 0 : FLY_MS,
    );
  };

  return (
    <div className={`vx-themepill is-${phase}${flying ? ' is-picking' : ''}${landed ? ' is-landed' : ''}`} ref={panel}>
      <div className="vx-themepill__row">
        <button
          ref={head}
          type="button"
          className="vx-themepill__head"
          aria-expanded={phase === 'list'}
          aria-controls={listId}
          aria-label={`Colour theme: ${shown && shown.key !== 'manual' ? shown.label : 'Custom'}`}
          onClick={() => setPhase(phase === 'list' ? 'pill' : 'list')}
        >
          <Swatches theme={shown?.theme} />
          <span className="vx-themepill__name">{shown && shown.key !== 'manual' ? shown.label : 'Custom'}</span>
          <ChevronDown size={18} className="vx-themepill__chev" aria-hidden="true" />
        </button>
        {children}
      </div>

      <div className="vx-themepill__body" id={listId}>
        <ul className="vx-themepill__list" aria-label="Colour themes">
          {rows.map((option) => (
            <li key={option.key}>
              <button
                type="button"
                className={`vx-themepill__opt${flying === option.key ? ' is-flying' : ''}`}
                onClick={(e) => choose(option, e.currentTarget)}
              >
                <Swatches theme={option.theme} />
                <span className="vx-themepill__name">{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
