import React from "react";
import Typewriter from "typewriter-effect";

function TerminalCard() {
  return (
    <div className="card terminal-card">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <div className="terminal-title">guest@pritish-joshi:~</div>
      </div>
      <div className="terminal-body">
        <Typewriter
          options={{
            cursor: "█",
            delay: 30,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString('<span class="prompt">guest@pritish-joshi:~$</span> cat details.json<br/>')
              .pauseFor(500)
              .typeString('{<br/>')
              .typeString('&nbsp;&nbsp;<span class="key">"name"</span>: <span class="string">"Pritish Joshi"</span>,<br/>')
              .typeString('&nbsp;&nbsp;<span class="key">"education"</span>: [<br/>')
              .typeString('&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"M.Sc Computational Chemistry - IIT Dhanbad"</span>,<br/>')
              .typeString('&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"B.Sc Chemistry Majors - IGNOU New Delhi"</span><br/>')
              .typeString('&nbsp;&nbsp;],<br/>')
              .typeString('&nbsp;&nbsp;<span class="key">"interests"</span>: [<br/>')
              .typeString('&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"Coding"</span>, <span class="string">"Teaching"</span>, <span class="string">"Research"</span>, <span class="string">"Anime"</span><br/>')
              .typeString('&nbsp;&nbsp;],<br/>')
              .typeString('&nbsp;&nbsp;<span class="key">"works"</span>: [<br/>')
              .typeString('&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"Research Project"</span>, <span class="string">"Custom ROM Development"</span>, <span class="string">"Web Development"</span>, <span class="string">"Education"</span><br/>')
              .typeString('&nbsp;&nbsp;]<br/>')
              .typeString('}<br/>')
              .pauseFor(500)
              .typeString('<span class="prompt">guest@pritish-joshi:~$</span> ')
              .start();
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
