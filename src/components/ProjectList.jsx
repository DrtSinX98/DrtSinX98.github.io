import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIcon } from "@/lib/icons";

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
            <FontAwesomeIcon icon={getIcon(project.icon)} size="3x" />
          </div>
          <div className="project-content p-3 text-start d-flex flex-column justify-content-center">
            <h4 className="fw-bold pink mb-2">{project.title}</h4>
            <p className="text-muted mb-0">{project.desc}</p>
          </div>
        </a>
      ))}
      <style>
        {`
        .project-card {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          color: var(--bs-body-color);
        }
        .project-card:hover {
          background-color: rgba(201, 21, 116, 0.1);
          border-color: rgba(201, 21, 116, 0.3);
          transform: translateX(5px);
        }
        .project-icon-wrapper {
          flex: 0 0 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(201, 21, 116, 0.1), rgba(201, 21, 116, 0.05));
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--secondary-color);
          transition: all 0.3s ease;
        }
        .project-card:hover .project-icon-wrapper {
          background: linear-gradient(135deg, var(--secondary-color), #ff4d94);
          color: white;
        }
        .pink {
          color: var(--secondary-color);
        }
        `}
      </style>
    </div>
  );
}

export default ProjectList;
