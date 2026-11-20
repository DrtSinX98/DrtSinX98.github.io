'use client';

import React, { useRef, useState } from 'react';
import { Modal, Container, Row, Col, Badge } from 'react-bootstrap';
import Icon from './Icon';

function CVModal({ show, onHide, content = {} }) {
  const cvRef = useRef(null);
  const [isPdfMode, setIsPdfMode] = useState(false);

  const handleDownloadPdf = async () => {
    // html2pdf touches `window` at import time, so it can only load in the browser.
    const html2pdf = (await import('html2pdf.js')).default;
    setIsPdfMode(true);
    setTimeout(() => {
      const element = cvRef.current;
      const opt = {
        margin:       5,
        filename:     content.fileName || 'CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save().finally(() => {
        setIsPdfMode(false);
      });
    }, 100);
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered scrollable={true} className="cv-modal custom-modal">
      <Modal.Header className="border-0 pb-0">
        <div className="ms-auto d-flex align-items-center gap-4">
          {!isPdfMode && (
            <button
              onClick={handleDownloadPdf}
              className="btn p-0 border-0 shadow-none bg-transparent"
              title="Download CV as PDF"
            >
              <Icon name="save" size="lg" className="cv-save-icon" />
            </button>
          )}
          <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
        </div>
      </Modal.Header>
      <Modal.Body className="px-4 pb-5 pt-0">
        <Container fluid ref={cvRef} id="cv-pdf-container" className={isPdfMode ? "force-light-pdf" : ""}>
          <Row className="mb-4 text-center cv-header position-relative">
            <Col>
              <h1 className="fw-bold cv-name mb-1">
                {content.name}
              </h1>
              <h4 className="cv-subtitle mb-3 text-muted">{content.subtitle}</h4>
              <div className="d-flex justify-content-center flex-wrap gap-3 contact-info">
                {content.email && <span><Icon name="envelope" className="me-2 pink" /> {content.email}</span>}
                {content.location && <span><Icon name="mapMarker" className="me-2 pink" /> {content.location}</span>}
                {content.website?.href && (
                  <a href={content.website.href} target="_blank" rel="noreferrer" className="text-decoration-none">
                    <Icon name="globe" className="me-2 pink" /> {content.website.label}
                  </a>
                )}
              </div>
              <div className="d-flex justify-content-center flex-wrap gap-3 mt-3 profile-links">
                {(content.socials || []).map((social, i) => (
                  <a href={social.href} target="_blank" rel="noreferrer" className="social-badge" key={i}>
                    <Icon name={social.icon} className="me-1" /> {social.label}
                  </a>
                ))}
              </div>
            </Col>
          </Row>

          <Row>
            {/* Left Column */}
            <Col lg={4} className="mb-4">

              {/* Summary */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><Icon name="star" className="me-2 pink" /> {content.summaryTitle}</h5>
                <p className="cv-text">
                  {content.summaryIntro}
                </p>
                <ul className="cv-list">
                  {(content.summaryPoints || []).map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>

              {/* Skills */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><Icon name="code" className="me-2 pink" /> {content.skillsTitle}</h5>
                {(content.skillGroups || []).map((group, i) => (
                  <div className="mb-2" key={i}>
                    <strong>{group.title}</strong>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {(group.items || []).map(skill => (
                        <Badge bg="secondary" className="cv-badge" key={skill}>{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Test Scores */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><Icon name="award" className="me-2 pink" /> {content.testScoresTitle}</h5>
                <ul className="cv-list-no-bullet">
                  {(content.testScores || []).map((score, i) => (
                    <li key={i}><strong>{score.label}</strong> {score.value}</li>
                  ))}
                </ul>
              </div>

            </Col>

            {/* Right Column */}
            <Col lg={8}>

              {/* Experience */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><Icon name="briefcase" className="me-2 pink" /> {content.experienceTitle}</h5>

                {(content.experience || []).map((item, i) => (
                  <div className="cv-item mb-3" key={i}>
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="fw-bold mb-0">{item.org} <span className="text-muted fw-normal">{item.place}</span></h6>
                      <span className="cv-date">{item.date}</span>
                    </div>
                    <div className="cv-role pink fw-semibold mb-1">{item.role}</div>
                    {item.points?.length > 0 && (
                      <ul className="cv-list">
                        {item.points.map((point, j) => <li key={j}>{point}</li>)}
                      </ul>
                    )}
                    {item.note && <div className="cv-supervisors"><em>{item.noteLabel}</em> {item.note}</div>}
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><Icon name="graduationCap" className="me-2 pink" /> {content.educationTitle}</h5>

                {(content.education || []).map((item, i) => (
                  <div className="cv-item mb-3" key={i}>
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="fw-bold mb-0">{item.org} <span className="text-muted fw-normal">{item.place}</span></h6>
                      <span className="cv-date">{item.date}</span>
                    </div>
                    <div className="cv-role mb-1">{item.role}</div>
                    {item.note && <div className="cv-supervisors"><em>{item.noteLabel}</em> {item.note}</div>}
                  </div>
                ))}
              </div>

              {/* Publications */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><Icon name="fileAlt" className="me-2 pink" /> {content.publicationsTitle}</h5>

                {(content.publications || []).map((pub, i) => (
                  <div className="cv-item mb-3" key={i}>
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noreferrer" className="fw-bold text-decoration-none cv-link">
                        {pub.title}
                      </a>
                    ) : (
                      <div className="fw-bold">{pub.title}{pub.date && <span className="cv-date ms-2">{pub.date}</span>}</div>
                    )}
                    {pub.journal && <div className="cv-journal text-muted">{pub.journal}</div>}
                    <div className="cv-authors">{pub.authors}</div>
                  </div>
                ))}
              </div>

            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default CVModal;
