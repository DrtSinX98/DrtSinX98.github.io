import React from 'react';
import Eyebrow, { ElementTile } from './Eyebrow';
import Orbit from './Orbit';
import RichText from '../RichText';
import Illustration from '../Illustration';
import { Reveal } from '../motion/Reveal';

/**
 * The opening of every inner page. One structure instead of four hand-built
 * copies: element-tile eyebrow, display heading, lead, and the page's animated
 * illustration on a stage ringed by the site's orbit motif.
 *
 *   `lead`      a node, so a page can compose its own (the CV button on About,
 *               the e-mail button on Contact).
 *   `children`  optional extra content under the lead.
 *
 * A page with no illustration yet shows its element tile, large, in the orbit —
 * so the hero keeps its shape instead of leaving an empty stage.
 */
export default function PageHero({
  page,
  label,
  heading,
  lead,
  children,
  illustration,
  image,
  alt,
  animate = true,
}) {
  return (
    <header className="vx-pagehero vx-wrap">
      <div className="vx-pagehero__copy">
        <Reveal>
          <Eyebrow page={page}>{label}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="vx-pagehero__title">
            <RichText value={heading} />
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={0.1}>
            <div className="vx-lead">{lead}</div>
          </Reveal>
        ) : null}
        {children}
      </div>

      <div className="vx-pagehero__stage">
        <Orbit className="vx-pagehero__orbit" />
        {illustration?.markup || image ? (
          <Illustration
            illustration={illustration}
            src={image}
            alt={alt}
            animate={animate}
            className="vx-pagehero__art"
          />
        ) : (
          <span className="vx-pagehero__tile">
            <ElementTile page={page} size="xl" />
          </span>
        )}
      </div>
    </header>
  );
}
