import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDna, faAtom } from "@fortawesome/free-solid-svg-icons";

function CompProjects() {
  const projects = [
    {
      title: "MexB Inhibitors",
      desc: "DST (SERB) Funded Project: Prediction of MexB Efflux Pump Inhibitors: A complete Machine Learning and Molecular Dynamics approach",
      icon: faDna,
      link: "https://doi.org/10.1021/acs.jpcb.3c05845"
    },
    {
      title: "EreC Dynamics",
      desc: "MSc Thesis Project: Molecular Dynamics of Erethromycin Esterase (EreC): Binding Mechanism with Erythromycin and Azithromycin",
      icon: faAtom,
      link: "https://drive.google.com/file/d/1C5NlFdb0n3bDihn7Gv2fDqKNTCHAO9Iv/view?usp=share_link"
    }
  ];

  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <a href={project.link} target="_blank" rel="noreferrer" className="project-card d-flex mb-3 text-decoration-none" key={index}>
          <div className="project-icon-wrapper">
            <FontAwesomeIcon icon={project.icon} size="3x" />
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

export default CompProjects;