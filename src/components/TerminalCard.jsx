'use client';

import React, { useMemo } from 'react';
import Typewriter from 'typewriter-effect';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const INDENT = '&nbsp;&nbsp;';
const INDENT2 = '&nbsp;&nbsp;&nbsp;&nbsp;';

const str = (v) => `<span class="string">"${esc(v)}"</span>`;
const key = (k) => `<span class="key">"${esc(k)}"</span>`;

/** Chunks a list into typed lines of at most `perLine` quoted values. */
function listLines(values, perLine) {
  const lines = [];
  for (let i = 0; i < values.length; i += perLine) {
    const chunk = values.slice(i, i + perLine);
    const isLast = i + perLine >= values.length;
    lines.push(`${INDENT2}${chunk.map(str).join(', ')}${isLast ? '' : ','}<br/>`);
  }
  return lines;
}

/**
 * The `cat whoami.json` terminal.
 *
 * Still typed out line by line, but it is now a fixed dark instrument panel in
 * both themes (a terminal is dark by nature — on the light theme that also makes
 * it the one high-contrast object on the page).
 *
 * Accessibility: typed text is invisible to assistive tech (`aria-hidden`) and a
 * complete visually-hidden copy is provided instead, so a screen reader gets the
 * whole document rather than a stream of single characters. Under reduced motion
 * the typing is skipped and the finished output is shown at once.
 */
function TerminalCard({ content = {} }) {
  const {
    title = 'root@pritish:~',
    prompt = 'root@pritish:~#',
    command = 'cat whoami.json',
    name = '',
    education = [],
    interests = [],
    works = [],
  } = content;

  const reduced = usePrefersReducedMotion();
  const promptSpan = `<span class="prompt">${esc(prompt)}</span>`;

  const lines = useMemo(
    () => [
      `${promptSpan} ${esc(command)}<br/>`,
      '{<br/>',
      `${INDENT}${key('name')}: ${str(name)},<br/>`,
      `${INDENT}${key('education')}: [<br/>`,
      ...education.map((item, i) => `${INDENT2}${str(item)}${i < education.length - 1 ? ',' : ''}<br/>`),
      `${INDENT}],<br/>`,
      `${INDENT}${key('interests')}: [<br/>`,
      ...listLines(interests, 3),
      `${INDENT}],<br/>`,
      `${INDENT}${key('works')}: [<br/>`,
      ...listLines(works, 3),
      `${INDENT}]<br/>`,
      '}<br/>',
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prompt, command, name, education, interests, works],
  );

  const plain = JSON.stringify({ name, education, interests, works }, null, 2);

  return (
    <div className="vx-term" role="group" aria-label={`Terminal: ${command}`}>
      <div className="vx-term__bar">
        <span className="vx-term__lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="vx-term__title">{title}</span>
      </div>

      <div className="vx-term__body">
        <pre className="vx-sr-only">{`${prompt} ${command}\n${plain}`}</pre>

        <div className="vx-term__screen" aria-hidden="true">
          {reduced ? (
            <div dangerouslySetInnerHTML={{ __html: `${lines.join('')}${promptSpan} ` }} />
          ) : (
            <Typewriter
              options={{ cursor: '█', delay: 28 }}
              onInit={(typewriter) => {
                let tw = typewriter;
                lines.forEach((line, i) => {
                  tw = tw.typeString(line);
                  if (i === 0) tw = tw.pauseFor(500);
                });
                tw.pauseFor(500).typeString(`${promptSpan} `).start();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalCard;
