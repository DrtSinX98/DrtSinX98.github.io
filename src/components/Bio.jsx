'use client';

import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import RichText from "./RichText";

function greetingFor(hours, greetings) {
  if (hours < 12) return greetings.morning;
  if (hours >= 12 && hours < 17) return greetings.afternoon;
  if (hours >= 17 && hours < 21) return greetings.evening;
  return greetings.night;
}

function Bio({ content = {}, serverHour = 12 }) {
  const greetings = content.greetings || {};
  // Rendered with the server's clock first, then corrected to the visitor's
  // local time on mount so the markup stays hydration-safe.
  const [timeOfDay, setTimeOfDay] = useState(() => greetingFor(serverHour, greetings));

  useEffect(() => {
    setTimeOfDay(greetingFor(new Date().getHours(), greetings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.greetings]);

  const strings = content.typewriter?.length ? content.typewriter : ["Welcome!"];

  return (
    <div>
      <div className="greet">
        <h1>
          <span className="pink">{timeOfDay},</span>
          <Typewriter
            options={{
              cursor: "_",
            }}
            onInit={(typewriter) => {
              let tw = typewriter;
              strings.forEach((str, i) => {
                tw = tw.typeString(str);
                if (i < strings.length - 1) tw = tw.pauseFor(1000).deleteAll();
              });
              tw.start();
            }}
          />
        </h1>
      </div>
      <p className="lead">{content.tagline}</p>
      <p className="lead">
        <RichText value={content.intro} />
      </p>
      <style>
        {`
          h1 {
            font-size: 50px;
            font-weight: bold;
          }

          .lead {
            font-size: 24px;
            line-height: 1.5;
          }

          .pink {
            color: var(--secondary-color);
          }

          @media (max-width: 767px) {
            .greet {
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Bio;
