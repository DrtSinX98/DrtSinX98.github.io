'use client';

import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import RichText from './RichText';
import PageHero from './ui/PageHero';
import { RevealGroup, RevealItem } from './motion/Reveal';

/**
 * The projects page: a hero, a filter by area, and a grid of project cards.
 * Featured projects are wider. Filtering is plain buttons with `aria-pressed`
 * (not tabs: there are no panels, just fewer cards), and the count is announced
 * politely so a screen-reader user hears what changed.
 */
function Projects({ content = {}, illustration = null, animateIllustration = true }) {
  const categories = content.categories || [];
  const items = content.items || [];
  const [active, setActive] = useState('all');

  const titleOf = Object.fromEntries(categories.map((c) => [c.key, c.title]));
  const counts = {};
  items.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });

  const shown = active === 'all' ? items : items.filter((item) => item.category === active);
  // Only offer filters that lead somewhere.
  const filters = categories.filter((c) => counts[c.key]);

  return (
    <>
      <PageHero
        page="projects"
        label="Projects"
        heading={content.heading}
        lead={<RichText value={content.lead} />}
        image={content.image}
        illustration={illustration}
        alt="Illustration: a rocket launching above four project stages"
        animate={animateIllustration}
      />

      <div className="vx-wrap vx-stack">
        {filters.length > 1 && (
          <div className="vx-filter" role="group" aria-label="Filter projects by area">
            {[{ key: 'all', title: 'All', count: items.length }, ...filters.map((c) => ({ ...c, count: counts[c.key] }))].map(
              (filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className="vx-filter__btn"
                  aria-pressed={active === filter.key}
                  onClick={() => setActive(filter.key)}
                >
                  {filter.title}
                  <span className="vx-filter__count">{filter.count}</span>
                </button>
              ),
            )}
          </div>
        )}

        <p className="vx-sr-only" role="status">
          Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}
        </p>

        {shown.length === 0 ? (
          <p className="vx-muted">No projects here yet.</p>
        ) : (
          // Keyed by filter so each change replays the arrival.
          <RevealGroup key={active} className="vx-pjgrid" role="list" stagger={0.06}>
            {shown.map((project, index) => (
              <RevealItem
                key={`${project.title}-${index}`}
                role="listitem"
                className={project.featured ? (project.image ? 'vx-pjgrid__full' : 'vx-pjgrid__wide') : undefined}
              >
                <ProjectCard project={project} categoryTitle={titleOf[project.category]} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </>
  );
}

export default Projects;
