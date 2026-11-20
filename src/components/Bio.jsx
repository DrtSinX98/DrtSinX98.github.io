'use client';

import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import RichText from './RichText';
import Eyebrow from './ui/Eyebrow';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

function greetingFor(hours, greetings) {
  if (hours < 12) return greetings.morning;
  if (hours >= 12 && hours < 17) return greetings.afternoon;
  if (hours >= 17 && hours < 21) return greetings.evening;
  return greetings.night;
}

/**
 * The hero copy. The time-of-day greeting and the typewriter line are the soul
 * of the page, so they get the biggest type on the site.
 *
 * Accessibility notes: the typewriter rewrites its text one character at a time,
 * which a screen reader would announce as noise. The heading carries a complete
 * `aria-label` instead and the animated text is hidden from the accessibility
 * tree. Under reduced motion the typewriter is replaced by its final line.
 */
function Bio({ content = {}, serverHour = 12 }) {
  const greetings = content.greetings || {};
  const reduced = usePrefersReducedMotion();
  // Rendered with the server's clock first, then corrected to the visitor's
  // local time on mount so the markup stays hydration-safe.
  const [timeOfDay, setTimeOfDay] = useState(() => greetingFor(serverHour, greetings));

  useEffect(() => {
    setTimeOfDay(greetingFor(new Date().getHours(), greetings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.greetings]);

  const strings = content.typewriter?.length ? content.typewriter : ['Welcome!'];
  const last = strings[strings.length - 1];

  return (
    <div className="vx-bio">
      <Eyebrow page="home">{content.tagline}</Eyebrow>

      <h1 className="vx-bio__title" aria-label={`${timeOfDay}, ${last}`}>
        <span className="vx-bio__greet pink" aria-hidden="true">
          {timeOfDay},
        </span>
        <span className="vx-bio__type" aria-hidden="true">
          {reduced ? (
            last
          ) : (
            <Typewriter
              options={{ cursor: '_' }}
              onInit={(typewriter) => {
                let tw = typewriter;
                strings.forEach((str, i) => {
                  tw = tw.typeString(str);
                  if (i < strings.length - 1) tw = tw.pauseFor(1000).deleteAll();
                });
                tw.start();
              }}
            />
          )}
        </span>
      </h1>

      <p className="vx-lead">
        <RichText value={content.intro} />
      </p>
    </div>
  );
}

export default Bio;
