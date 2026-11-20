import React from 'react';
import Icon from "./Icon";

/**
 * Card list used by every "Projects & Portfolios" tab.
 * Replaces the three near-identical AndroidProjects/DesignProjects/CompProjects
 * components; the projects themselves now come from the database.
 */
function ProjectList({ projects = [] }) {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <a href={project.link} target="_blank" rel="noreferrer" className="project-card d-flex mb-3 text-decoration-none" key={index}>
          <div className="project-icon-wrapper">
            <Icon name={project.icon} size="3x" />
          </div>
          <div className="project-content p-3 text-start d-flex flex-column justify-content-center">
            <h4 className="fw-bold pink mb-2">{project.title}</h4>
            <p className="text-muted mb-0">{project.desc}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default ProjectList;
