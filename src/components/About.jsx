'use client';

import React, { useState } from "react";
import { Col, Image, Container, Row, Accordion, Badge, Tabs, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faBriefcase, faCode, faTrophy, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import ProjectList from "./ProjectList";
import CVModal from "./CVModal";
import RichText from "./RichText";
import { getIcon } from "@/lib/icons";

function About({ content = {}, cv = {} }) {
  const [showCVModal, setShowCVModal] = useState(false);
  const certificates = content.certificates || [];
  const projectTabs = content.projectTabs || [];

  return (
    <Container className="about-page">
      {/* 1. Top Intro Section */}
      <Row className="mb-5">
        <Col lg={4} className="image-p">
          <div id="ab-img">
            <Image src={content.image} alt="about-pic" className="mb-4" fluid />
          </div>
        </Col>
        <Col lg={8}>
          <h1 className="hero-title"><RichText value={content.heading} /></h1>
          <p className="lead mt-3">
            <RichText
              value={content.lead}
              renderSpecial={(part) =>
                part.cv ? (
                  <span onClick={() => setShowCVModal(true)} className="skill-chip cv-chip" style={{ display: 'inline-block', cursor: 'pointer', textDecoration: 'none' }}>
                    <FontAwesomeIcon icon={faFilePdf} className="me-1" /> {part.text}
                  </span>
                ) : null
              }
            />
          </p>
        </Col>
      </Row>

      <hr className="my-5" />

      <Row>
        {/* 2. Experience & Education (Timeline) */}
        <Col lg={6} className="mb-5">
          <h2 className="section-title mb-4"><FontAwesomeIcon icon={faBriefcase} className="me-2 pink" /> {content.journeyTitle}</h2>
          <div className="timeline">
            {(content.journey || []).map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <h4>{item.title}</h4>
                  <p className="text-muted mb-2">{item.subtitle}</p>
                  <div className="tags">
                    {(item.tags || []).map((tag, i) => (
                      <Badge bg="secondary" className="custom-badge" key={i}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* 3. Skills & Tech Stack Grid */}
        <Col lg={6} className="mb-5">
          <h2 className="section-title mb-4"><FontAwesomeIcon icon={faCode} className="me-2 pink" /> {content.skillsTitle}</h2>

          {(content.skillGroups || []).map((group, index) => (
            <React.Fragment key={index}>
              <h5 className={index === 0 ? "mt-3 mb-3" : "mt-4 mb-3"}>
                <FontAwesomeIcon icon={getIcon(group.icon)} className="me-2" /> {group.title}
              </h5>
              <div className="skill-grid">
                {(group.items || []).map((item, i) => (
                  <div className={group.variant && group.variant !== 'solid' ? `skill-chip ${group.variant}` : "skill-chip"} key={i}>{item}</div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </Col>
      </Row>

      <hr className="my-4" />

      {/* 4. Projects & Portfolios (Tabs) */}
      <Row className="mb-5">
        <Col lg={12}>
          <h2 className="section-title mb-4"><FontAwesomeIcon icon={faProjectDiagram} className="me-2 pink" /> {content.projectsTitle}</h2>
          <div className="glass-card p-4">
            <Tabs defaultActiveKey={projectTabs[0]?.key} id="projects-tabs" className="mb-4 custom-tabs">
              {projectTabs.map((tab) => (
                <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
                  <ProjectList projects={tab.projects || []} />
                </Tab>
              ))}
            </Tabs>
          </div>
        </Col>
      </Row>

      <hr className="my-4" />

      {/* 5. Achievements & Links Accordion */}
      <Row className="mb-5">
        <Col lg={12}>
          <h2 className="section-title mb-4"><FontAwesomeIcon icon={faTrophy} className="me-2 pink" /> {content.achievementsTitle}</h2>
          <Accordion className="custom-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>{content.publicationsTitle}</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column gap-3">
                  {(content.publications || []).map((pub, index) => (
                    <a className="glass-link" href={pub.link || '#'} target="_blank" rel="noreferrer" key={index}>
                      <div className="title fw-bold">{pub.title}</div>
                      <div className="subtitle text-muted">{pub.subtitle}</div>
                    </a>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>{content.examsTitle}</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column gap-3">
                  {(content.exams || []).map((exam, index) => (
                    <a className="glass-link" href={exam.link || '#'} target="_blank" rel="noreferrer" key={index}>
                      <div className="title fw-bold">{exam.title}</div>
                      <div className="subtitle text-muted">{exam.subtitle}</div>
                    </a>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>{content.certificatesTitle} ({certificates.length})</Accordion.Header>
              <Accordion.Body>
                <div className="cert-list">
                  {certificates.map((cert, index) => (
                    <a key={index} className="glass-link compact" href={cert.link} target="_blank" rel="noreferrer">
                      {cert.title}
                    </a>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      {/* 6. Interests & Socials */}
      <Row className="mb-5 text-center">
        {(content.highlights || []).map((card, index) => (
          <Col lg={4} className="mb-4" key={index}>
            <div className="glass-card text-center h-100">
              <FontAwesomeIcon icon={getIcon(card.icon)} size="2x" className="mb-3 pink" />
              <h4 className="fw-bold">{card.title}</h4>
              <p className="text-muted">{card.desc}</p>
              {card.badges?.length > 0 && (
                <div className="tags justify-content-center mt-3">
                  {card.badges.map((badge, i) => (
                    <Badge bg="secondary" key={i}>{badge}</Badge>
                  ))}
                </div>
              )}
              {card.links?.length > 0 && (
                <div className="d-flex justify-content-center gap-3 mt-3">
                  {card.links.map((link, i) => (
                    <a href={link.href} target="_blank" rel="noreferrer" className="social-pill" key={i}>{link.label}</a>
                  ))}
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>

      <CVModal show={showCVModal} onHide={() => setShowCVModal(false)} content={cv} />

      <style>
        {`
          .pink { color: var(--secondary-color); }
          .hero-title { font-size: 3rem; font-weight: 800; }
          .hero-lead { font-size: 1.25rem; line-height: 1.6; }
          .section-title { font-weight: 700; font-size: 2rem; }

          #ab-img {
            width: 350px;
            height: 350px;
          }

          @media (max-width: 767px) {
            .image-p {
              display: flex;
              justify-content: center;
            }
          }

          /* Timeline */
          .timeline {
            position: relative;
            padding-left: 20px;
            border-left: 2px solid rgba(201, 21, 116, 0.3);
          }
          .timeline-item {
            position: relative;
            margin-bottom: 25px;
          }
          .timeline-dot {
            position: absolute;
            left: -27px;
            top: 10px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            box-shadow: 0 0 10px var(--secondary-color);
          }
          /* Tags */
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .custom-badge {
            background-color: rgba(201, 21, 116, 0.15) !important;
            color: var(--bs-body-color) !important;
            border: 1px solid rgba(201, 21, 116, 0.3);
            font-weight: 500;
            padding: 6px 10px;
          }

          /* Skill Grid */
          .skill-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }
          .skill-chip {
            background: linear-gradient(135deg, var(--secondary-color), #ff4d94);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 10px rgba(201, 21, 116, 0.3);
            transition: all 0.2s ease;
            cursor: default;
          }
          .skill-chip:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 15px rgba(201, 21, 116, 0.5);
          }
          .skill-chip.outline {
            background: transparent;
            color: var(--bs-body-color);
            border: 1px solid var(--secondary-color);
            box-shadow: none;
          }
          .skill-chip.outline:hover {
            background: var(--secondary-color);
            color: white;
            box-shadow: 0 4px 10px rgba(201, 21, 116, 0.3);
          }
          .skill-chip.soft {
            background: rgba(201, 21, 116, 0.1);
            color: var(--bs-body-color);
            box-shadow: none;
          }
          .skill-chip.soft:hover {
            background: rgba(201, 21, 116, 0.2);
          }

          .cv-chip {
            font-size: 1rem;
            padding: 6px 14px;
            vertical-align: middle;
          }

          /* Accordion styling overrides */
          .custom-accordion .accordion-button::after {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23c91574'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e") !important;
            margin-left: 0 !important;
            margin-right: 15px !important;
            transition: transform 0.2s ease-in-out;
          }
          .custom-accordion .accordion-button.collapsed::after {
            transform: rotate(-90deg) !important;
          }
          .custom-accordion .accordion-button:not(.collapsed)::after {
            transform: rotate(0deg) !important;
          }
          .custom-accordion .accordion-item {
            background-color: var(--bs-card-bg);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 10px;
            border-radius: 8px;
            overflow: hidden;
          }
          .custom-accordion .accordion-button {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
            background-color: transparent;
            color: var(--bs-body-color);
            font-weight: 600;
            font-size: 1.1rem;
            box-shadow: none;
          }
          .custom-accordion .accordion-button:not(.collapsed) {
            background-color: rgba(201, 21, 116, 0.1);
            color: var(--secondary-color);
          }

          /* Tabs Styling */
          .custom-tabs {
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .custom-tabs .nav-link {
            color: var(--bs-body-color);
            font-weight: 500;
            border: none;
            background: transparent;
            border-bottom: 2px solid transparent;
          }
          .custom-tabs .nav-link:hover {
            color: var(--secondary-color);
            border-color: transparent;
          }
          .custom-tabs .nav-link.active {
            color: var(--secondary-color);
            border-bottom: 2px solid var(--secondary-color);
            background: transparent;
          }

          /* Glass Links (Accordion items) */
          .glass-link {
            display: block;
            padding: 15px;
            border-radius: 8px;
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: var(--bs-body-color);
            text-decoration: none;
            transition: all 0.3s ease;
          }
          .glass-link:hover {
            background-color: rgba(201, 21, 116, 0.1);
            border-color: rgba(201, 21, 116, 0.3);
            transform: translateX(5px);
            color: var(--bs-body-color);
          }
          .glass-link.compact {
            padding: 10px 15px;
            margin-bottom: 5px;
          }
          .cert-list {
            max-height: 300px;
            overflow-y: auto;
            padding-right: 10px;
          }
          .cert-list::-webkit-scrollbar {
            width: 6px;
          }
          .cert-list::-webkit-scrollbar-thumb {
            background-color: rgba(201, 21, 116, 0.5);
            border-radius: 3px;
          }

          /* Social Pills */
          .social-pill {
            display: inline-block;
            padding: 8px 16px;
            background-color: var(--bs-card-bg);
            border: 1px solid var(--secondary-color);
            border-radius: 20px;
            color: var(--secondary-color);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          .social-pill:hover {
            background-color: var(--secondary-color);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(201, 21, 116, 0.3);
          }
        `}
      </style>
    </Container>
  );
}

export default About;
