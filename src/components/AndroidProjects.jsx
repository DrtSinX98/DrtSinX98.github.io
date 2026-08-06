import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen, faWrench, faMicrochip, faBroom } from "@fortawesome/free-solid-svg-icons";

function AndroidProjects() {
  const projects = [
    {
      title: "Cyanide Project",
      desc: "Lead Developer of Cyanide custom ROM project that is built on top of Lineage OS with various features and Redesigned User Interface",
      icon: faMobileScreen,
      link: "https://github.com/Los-FE"
    },
    {
      title: "TWRP Spaced",
      desc: "Official maintainer of TeamWin Recovery Project for Realme 8i (spaced). TWRP is a Custom Recovery used to flash custom partitions in device",
      icon: faWrench,
      link: "https://twrp.me/realme/realme8i.html"
    },
    {
      title: "Cyanide Kernel",
      desc: "Developer of Cyanide Kernel for Realme 8i and 8s 5G. Cyanide kernel is a Custom Kernel with various device specific tweaks and optimizations",
      icon: faMicrochip,
      link: "https://xdaforums.com/t/kernel-4-14-cyanide-kernel-1-0-for-realme-8i-spaced.4447145/"
    },
    {
      title: "Realme Debloater",
      desc: "Scripts for removing unwanted apps from realme UI 2.0 and higher. Realme UI comes with lots of bloatwares, this script helps removing those.",
      icon: faBroom,
      link: "https://github.com/DrtSinX98/Debloat"
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

export default AndroidProjects;