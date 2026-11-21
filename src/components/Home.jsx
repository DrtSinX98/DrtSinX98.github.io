import React from 'react';
import TerminalCard from './TerminalCard';
import Rimage from './Rimage';
import Bio from './Bio';
import Buttons from './Buttons';
import { Reveal } from './motion/Reveal';

function Home({ content = {}, serverHour }) {
  return (
    <>
      <section className="vx-hero vx-wrap">
        <div className="vx-hero__copy">
          <Bio content={content} serverHour={serverHour} />
          <Reveal delay={0.25}>
            <Buttons buttons={content.buttons || []} />
          </Reveal>
        </div>
        <Rimage light={content.profileImageLight} dark={content.profileImageDark} />
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
