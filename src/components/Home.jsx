import React from 'react';
import TerminalCard from './TerminalCard';
import Rimage from './Rimage';
import Bio from './Bio';
import Buttons from './Buttons';
import { Reveal } from './motion/Reveal';
import { portraitUrl } from '@/lib/portrait';

function Home({ content = {}, serverHour, theme }) {
  return (
    <>
      <section className="vx-hero vx-wrap">
        <div className="vx-hero__copy">
          <Bio content={content} serverHour={serverHour} />
          <Reveal delay={0.25}>
            <Buttons buttons={content.buttons || []} />
          </Reveal>
        </div>
        <Rimage
          light={portraitUrl('light', theme, content.profileImageLight)}
          dark={portraitUrl('dark', theme, content.profileImageDark)}
        />
      </section>

      <section className="vx-bento vx-wrap">
        <Reveal className="vx-bento__main">
          <TerminalCard content={content.terminal || {}} />
        </Reveal>
      </section>
    </>
  );
}

export default Home;
