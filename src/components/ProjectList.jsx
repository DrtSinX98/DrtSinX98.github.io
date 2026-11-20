import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Icon from './Icon';

/**
 * Card list used by every "Projects & Portfolios" tab.
 * Replaces the three near-identical AndroidProjects/DesignProjects/CompProjects
 * components; the projects themselves now come from the database.
 *
 * Each row is one link with a tile for its icon. The arrow marks it as external.
 */
function ProjectList({ projects = [] }) {
  return (
    <ul className="vx-projects">
      {projects.map((project, index) => (
        <li key={index}>
          <a href={project.link} target="_blank" rel="noreferrer" className="vx-project">
            <span className="vx-project__icon">
              <Icon name={project.icon} size="2x" />
            </span>
            <span className="vx-project__body">
              <span className="vx-project__title">{project.title}</span>
              <span className="vx-project__desc">{project.desc}</span>
            </span>
            <ArrowUpRight className="vx-project__arrow" size={20} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
