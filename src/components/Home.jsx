import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import TerminalCard from './TerminalCard';
import Rimage from './Rimage';
import Bio from './Bio';
import Icon from './Icon';
import Buttons from './Buttons';
import { ElementTile } from './ui/Eyebrow';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';
import { PAGE_ART } from '@/lib/pages';
import { artUrl, portraitUrl } from '@/lib/portrait';

/**
 * Home is now a hub, not a dead end: after the hero and the terminal there is a
 * way into every other page. The thumbnails are the same Storyset artwork the
 * pages open with, so each door previews the room.
 */
function Explore({ nav, theme }) {
  const items = nav.filter((item) => item.href !== '/');
  if (items.length === 0) return null;

  return (
    <nav className="vx-explore" aria-label="Explore the site">
      <Reveal>
        <h2 className="vx-explore__title">Explore</h2>
      </Reveal>
      <RevealGroup className="vx-explore__list" role="list" stagger={0.06}>
        {items.map((item) => (
          <RevealItem key={item.key} role="listitem">
            <Link href={item.href} className="vx-explore__link">
              <span className="vx-explore__art">
                {/* Served recoloured to the active theme. `unoptimized` skips the
                    image optimiser, which would otherwise refuse SVG. */}
                {PAGE_ART[item.key] ? (
                  <Image src={artUrl(item.key, theme)} alt="" width={72} height={72} unoptimized />
                ) : (
                  <Icon name={item.icon} size="2x" />
                )}
              </span>
              <span className="vx-explore__text">
                <span className="vx-explore__label">{item.label}</span>
                <ElementTile page={item.key} size="sm" />
              </span>
              <ArrowUpRight className="vx-explore__arrow" size={20} aria-hidden="true" />
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </nav>
  );
}

function Home({ content = {}, serverHour, nav = [], theme }) {
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
        <Explore nav={nav} theme={theme} />
      </section>
    </>
  );
}

export default Home;
