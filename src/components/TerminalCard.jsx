'use client';

import React from "react";
import Typewriter from "typewriter-effect";

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

  const promptSpan = `<span class="prompt">${esc(prompt)}</span>`;

  const lines = [
    `${promptSpan} ${esc(command)}<br/>`,
    '{<br/>',
    `${INDENT}${key('name')}: ${str(name)},<br/>`,
    `${INDENT}${key('education')}: [<br/>`,
    ...education.map((item, i) => `${INDENT2}${str(item)}${i < education.length - 1 ? ',' : ''}<br/>`),
    `${INDENT}],<br/>`,
    `${INDENT}${key('interests')}: [<br/>`,
    ...listLines(interests, 4),
    `${INDENT}],<br/>`,
    `${INDENT}${key('works')}: [<br/>`,
    ...listLines(works, 4),
    `${INDENT}]<br/>`,
    '}<br/>',
  ];

  return (
    <div className="card terminal-card">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <div className="terminal-title">{title}</div>
      </div>
      <div className="terminal-body">
        <Typewriter
          options={{
            cursor: "█",
            delay: 30,
          }}
          onInit={(typewriter) => {
            let tw = typewriter;
            lines.forEach((line, i) => {
              tw = tw.typeString(line);
              if (i === 0) tw = tw.pauseFor(500);
            });
            tw.pauseFor(500).typeString(`${promptSpan} `).start();
          }}
        />
      </div>
      <style>
        {`
        .terminal-card {
          border-radius: 10px;
          padding: 0;
          overflow: hidden;
          font-family: 'Courier New', Courier, monospace;
          margin-bottom: 2rem;
          width: 100%;
        }

        .terminal-header {
          background-color: rgba(0, 0, 0, 0.1);
          padding: 10px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .terminal-buttons {
          display: flex;
          gap: 8px;
          z-index: 1;
        }

        .terminal-btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .close { background-color: #ff5f56; }
        .minimize { background-color: #ffbd2e; }
        .maximize { background-color: #27c93f; }

        .terminal-title {
          flex-grow: 1;
          text-align: center;
          font-size: 14px;
          color: #858585;
          position: absolute;
          width: 100%;
          left: 0;
          pointer-events: none;
        }

        .terminal-body {
          padding: 20px;
          font-size: 16px;
          line-height: 1.6;
          min-height: 350px;
          text-align: left;
        }

        .prompt {
          color: var(--secondary-color);
          font-weight: bold;
        }

        .key {
          color: var(--bs-card-color);
          font-weight: bold;
        }

        .string {
          color: var(--secondary-color);
        }

        .Typewriter__cursor {
          color: inherit;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (max-width: 767px) {
          .terminal-body {
            font-size: 14px;
            min-height: 400px;
          }
        }
        `}
      </style>
    </div>
  );
}

export default TerminalCard;
