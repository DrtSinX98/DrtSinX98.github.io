'use client';

import React from 'react';
import { ListGroup, Tab } from 'react-bootstrap';
import RichText from './RichText';
import PageHero from './ui/PageHero';
import { Reveal } from './motion/Reveal';

/**
 * Each module is a syllabus card: a mono label ("Module 1"), the title, then the
 * numbered topics. In "split" modules, picking a topic reveals its subtopics in
 * a second column — which now stacks under the list on phones instead of
 * squeezing both into half-width columns.
 */
function Lectures({ content = {}, illustration = null, animateIllustration = true }) {
  const modules = content.modules || [];

  return (
    <>
      <PageHero
        page="lectures"
        label="Lectures"
        heading={content.heading}
        lead={<RichText value={content.lead} />}
        image={content.image}
        illustration={illustration}
        alt="Illustration: a professor beside a blackboard"
        animate={animateIllustration}
      />

      <div className="vx-wrap vx-stack">
        {modules.map((mod, mi) => {
          const topics = mod.topics || [];
          const firstKey = `#link${mi + 1}-1`;
          return (
            <Reveal key={mi}>
              <article className="vx-card vx-module">
                <header className="vx-module__head">
                  <p className="vx-mono-label">{mod.header}</p>
                  <h2 className="vx-module__title">{mod.title}</h2>
                </header>

                <Tab.Container id={`list-group-${mi + 1}`} defaultActiveKey={firstKey}>
                  <div className={`vx-syllabus${mod.split ? ' is-split' : ''}`}>
                    <ListGroup as="ol" numbered className="vx-topics">
                      {topics.map((topic, ti) => (
                        <ListGroup.Item as="li" action href={`#link${mi + 1}-${ti + 1}`} key={ti}>
                          {topic.title}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                    {mod.split && (
                      <Tab.Content className="vx-subtopics">
                        {topics.map(
                          (topic, ti) =>
                            (topic.subtopics || []).length > 0 && (
                              <Tab.Pane eventKey={`#link${mi + 1}-${ti + 1}`} key={ti}>
                                <ul className="vx-subtopics__list">
                                  {topic.subtopics.map((sub, si) => (
                                    <li key={si}>{sub}</li>
                                  ))}
                                </ul>
                              </Tab.Pane>
                            ),
                        )}
                      </Tab.Content>
                    )}
                  </div>
                </Tab.Container>
              </article>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}

export default Lectures;
