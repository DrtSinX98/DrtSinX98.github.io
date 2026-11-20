'use client';

import React, { useState } from "react";
import { Col, Container, Row, Accordion, Badge, Tabs, Tab } from "react-bootstrap";
import ProjectList from "./ProjectList";
import CVModal from "./CVModal";
import RichText from "./RichText";
import Illustration from "./Illustration";
import { Reveal, RevealGroup, RevealItem } from "./motion/Reveal";
import Icon from "./Icon";

function About({ content = {}, cv = {}, illustration = null, animateIllustration = true }) {
  const [showCVModal, setShowCVModal] = useState(false);
  const certificates = content.certificates || [];
  const projectTabs = content.projectTabs || [];

  return (
    <Container className="about-page">
      {/* 1. Top Intro Section */}
      <Row className="mb-5">
        <Col lg={4} className="image-p">
          <div className="page-illustration">
            <Illustration
              illustration={illustration}
              src={content.image}
              alt="about-pic"
              className="mb-4"
              animate={animateIllustration}
            />
          </div>
        </Col>
        <Col lg={8}>
          <h1 className="hero-title"><RichText value={content.heading} /></h1>
          <p className="lead mt-3">
            <RichText
              value={content.lead}
              renderSpecial={(part) =>
                part.cv ? (
                  // Was a <span onClick>: not focusable, not in the tab order,
                  // and deaf to Enter/Space, so the CV could only be opened
                  // with a pointer. A real button needs no ARIA to fix that.
                  <button
                    type="button"
                    onClick={() => setShowCVModal(true)}
                    className="skill-chip cv-chip"
                  >
                    <Icon name="filePdf" className="me-1" /> {part.text}
                  </button>
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
          <Reveal>
            <h2 className="section-title mb-4"><Icon name="briefcase" className="me-2 pink" /> {content.journeyTitle}</h2>
          </Reveal>
          <RevealGroup className="timeline">
            {(content.journey || []).map((item, index) => (
              <RevealItem className="timeline-item" key={index}>
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
              </RevealItem>
            ))}
          </RevealGroup>
        </Col>

        {/* 3. Skills & Tech Stack Grid */}
        <Col lg={6} className="mb-5">
          <Reveal>
            <h2 className="section-title mb-4"><Icon name="code" className="me-2 pink" /> {content.skillsTitle}</h2>
          </Reveal>

          {(content.skillGroups || []).map((group, index) => (
            <React.Fragment key={index}>
              <Reveal>
                <h5 className={index === 0 ? "mt-3 mb-3" : "mt-4 mb-3"}>
                  <Icon name={group.icon} className="me-2" /> {group.title}
                </h5>
              </Reveal>
              {/* Chips pop in quicker than cards — a long stagger on a dozen
                  small items reads as a queue rather than one gesture. */}
              <RevealGroup className="skill-grid" stagger={0.03}>
                {(group.items || []).map((item, i) => (
                  <RevealItem
                    distance={8}
                    className={group.variant && group.variant !== 'solid' ? `skill-chip ${group.variant}` : "skill-chip"}
                    key={i}
                  >
                    {item}
                  </RevealItem>
                ))}
              </RevealGroup>
            </React.Fragment>
          ))}
        </Col>
      </Row>

      <hr className="my-4" />

      {/* 4. Projects & Portfolios (Tabs) */}
      <Row className="mb-5">
        <Col lg={12}>
          <Reveal>
            <h2 className="section-title mb-4"><Icon name="projectDiagram" className="me-2 pink" /> {content.projectsTitle}</h2>
          </Reveal>
          <Reveal className="glass-card p-4">
            <Tabs defaultActiveKey={projectTabs[0]?.key} id="projects-tabs" className="mb-4 custom-tabs">
              {projectTabs.map((tab) => (
                <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
                  <ProjectList projects={tab.projects || []} />
                </Tab>
              ))}
            </Tabs>
          </Reveal>
        </Col>
      </Row>

      <hr className="my-4" />

      {/* 5. Achievements & Links Accordion */}
      <Row className="mb-5">
        <Col lg={12}>
          <Reveal>
            <h2 className="section-title mb-4"><Icon name="trophy" className="me-2 pink" /> {content.achievementsTitle}</h2>
          </Reveal>
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
      {/* The group wraps the Row rather than replacing it: variants travel by
          React context, so Row/Col in between don't break propagation, and the
          Bootstrap grid keeps its required Row > Col nesting. */}
      <RevealGroup>
      <Row className="mb-5 text-center">
        {(content.highlights || []).map((card, index) => (
          <Col lg={4} className="mb-4" key={index}>
            <RevealItem className="glass-card text-center h-100">
              <Icon name={card.icon} size="2x" className="mb-3 pink" />
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
            </RevealItem>
          </Col>
        ))}
      </Row>
      </RevealGroup>

      <CVModal show={showCVModal} onHide={() => setShowCVModal(false)} content={cv} />

    </Container>
  );
}

export default About;
