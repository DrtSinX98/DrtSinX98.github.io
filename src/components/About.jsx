'use client';

import React, { useState } from 'react';
import { Accordion, Tabs, Tab } from 'react-bootstrap';
import { ArrowUpRight } from 'lucide-react';
import ProjectList from './ProjectList';
import CVModal from './CVModal';
import RichText from './RichText';
import Icon from './Icon';
import PageHero from './ui/PageHero';
import SectionHead from './ui/SectionHead';
import SectionNav from './ui/SectionNav';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

/** A link row used inside the achievements accordion. */
function RowLink({ href, title, subtitle, compact = false }) {
  return (
    <a
      className={`vx-rowlink${compact ? ' is-compact' : ''}`}
      href={href || '#'}
      target="_blank"
      rel="noreferrer"
    >
      <span className="vx-rowlink__text">
        <span className="vx-rowlink__title">{title}</span>
        {subtitle ? <span className="vx-rowlink__sub">{subtitle}</span> : null}
      </span>
      <ArrowUpRight className="vx-rowlink__arrow" size={18} aria-hidden="true" />
    </a>
  );
}

function About({ content = {}, cv = {}, illustration = null, animateIllustration = true }) {
  const [showCVModal, setShowCVModal] = useState(false);
  const certificates = content.certificates || [];
  const projectTabs = content.projectTabs || [];
  const journey = content.journey || [];
  const skillGroups = content.skillGroups || [];
  const highlights = content.highlights || [];

  // The page is long, so it gets an in-page index. Titles come from the same
  // editable content as the section headings, so the two can never disagree.
  const navItems = [
    { id: 'journey', label: content.journeyTitle, icon: 'briefcase' },
    { id: 'skills', label: content.skillsTitle, icon: 'code' },
    { id: 'projects', label: content.projectsTitle, icon: 'projectDiagram' },
    { id: 'achievements', label: content.achievementsTitle, icon: 'trophy' },
  ].filter((item) => item.label);

  return (
    <>
      <PageHero
        page="about"
        label="About"
        heading={content.heading}
        image={content.image}
        illustration={illustration}
        alt="Illustration: a figure sitting on a question mark"
        animate={animateIllustration}
        lead={
          <RichText
            value={content.lead}
            renderSpecial={(part) =>
              part.cv ? (
                // A real button: focusable and operable with Enter/Space, so the
                // CV isn't pointer-only.
                <button type="button" onClick={() => setShowCVModal(true)} className="vx-btn vx-btn--soft vx-btn--sm">
                  <Icon name="filePdf" /> {part.text}
                </button>
              ) : null
            }
          />
        }
      />

      <div className="vx-wrap vx-sections">
        <SectionNav items={navItems} />

        {/* Journey + skills share a row on wide screens. */}
        <div className="vx-split">
          <section id="journey" className="vx-section" aria-labelledby="journey-title">
            <SectionHead id="journey-title" index="01" icon="briefcase" title={content.journeyTitle} />
            <RevealGroup className="vx-timeline" role="list" stagger={0.1}>
              {journey.map((item, index) => (
                <RevealItem key={index} role="listitem" className="vx-timeline__item">
                  <span className="vx-timeline__node" aria-hidden="true" />
                  <article className="vx-card">
                    <h3>{item.title}</h3>
                    <p className="vx-muted">{item.subtitle}</p>
                    {(item.tags || []).length > 0 && (
                      <ul className="vx-tags">
                        {item.tags.map((tag, i) => (
                          <li className="vx-tag" key={i}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          <section id="skills" className="vx-section" aria-labelledby="skills-title">
            <SectionHead id="skills-title" index="02" icon="code" title={content.skillsTitle} />
            <div className="vx-skills">
              {skillGroups.map((group, index) => (
                <Reveal key={index} className="vx-card vx-skillgroup">
                  <h3 className="vx-skillgroup__title">
                    <Icon name={group.icon} /> {group.title}
                  </h3>
                  <RevealGroup className="vx-chips" role="list" stagger={0.03}>
                    {(group.items || []).map((item, i) => (
                      <RevealItem
                        key={i}
                        role="listitem"
                        distance={8}
                        className={`vx-chip vx-chip--${group.variant || 'solid'}`}
                      >
                        {item}
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        <section id="projects" className="vx-section" aria-labelledby="projects-title">
          <SectionHead id="projects-title" index="03" icon="projectDiagram" title={content.projectsTitle} />
          <Reveal className="vx-card vx-card--pad">
            <Tabs defaultActiveKey={projectTabs[0]?.key} id="projects-tabs" className="vx-tabs">
              {projectTabs.map((tab) => (
                <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
                  <ProjectList projects={tab.projects || []} />
                </Tab>
              ))}
            </Tabs>
          </Reveal>
        </section>

        <section id="achievements" className="vx-section" aria-labelledby="achievements-title">
          <SectionHead id="achievements-title" index="04" icon="trophy" title={content.achievementsTitle} />
          <Reveal>
            <Accordion className="vx-accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header>{content.publicationsTitle}</Accordion.Header>
                <Accordion.Body>
                  <div className="vx-rowlist">
                    {(content.publications || []).map((pub, index) => (
                      <RowLink key={index} href={pub.link} title={pub.title} subtitle={pub.subtitle} />
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>{content.examsTitle}</Accordion.Header>
                <Accordion.Body>
                  <div className="vx-rowlist">
                    {(content.exams || []).map((exam, index) => (
                      <RowLink key={index} href={exam.link} title={exam.title} subtitle={exam.subtitle} />
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  {content.certificatesTitle} <span className="vx-count">{certificates.length}</span>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="vx-rowlist vx-rowlist--scroll">
                    {certificates.map((cert, index) => (
                      <RowLink key={index} href={cert.link} title={cert.title} compact />
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Reveal>
        </section>

        {highlights.length > 0 && (
          <RevealGroup className="vx-highlights" stagger={0.1}>
            {highlights.map((card, index) => (
              <RevealItem key={index} className="vx-card vx-highlight">
                <span className="vx-iconbox">
                  <Icon name={card.icon} size="lg" />
                </span>
                <h3>{card.title}</h3>
                <p className="vx-muted">{card.desc}</p>
                {card.badges?.length > 0 && (
                  <ul className="vx-tags">
                    {card.badges.map((badge, i) => (
                      <li className="vx-tag" key={i}>
                        {badge}
                      </li>
                    ))}
                  </ul>
                )}
                {card.links?.length > 0 && (
                  <div className="vx-pills">
                    {card.links.map((link, i) => (
                      <a href={link.href} target="_blank" rel="noreferrer" className="vx-pill" key={i}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>

      <CVModal show={showCVModal} onHide={() => setShowCVModal(false)} content={cv} />
    </>
  );
}

export default About;
