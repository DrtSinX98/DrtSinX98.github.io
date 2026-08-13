'use client';

import React, { useRef, useState } from 'react';
import { Modal, Container, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faMapMarkerAlt,
  faGlobe,
  faGraduationCap,
  faBriefcase,
  faCode,
  faFileAlt,
  faAward,
  faStar,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import { getIcon } from '@/lib/icons';

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
              <FontAwesomeIcon icon={faSave} size="lg" className="cv-save-icon" />
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
                {content.email && <span><FontAwesomeIcon icon={faEnvelope} className="me-2 pink" /> {content.email}</span>}
                {content.location && <span><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 pink" /> {content.location}</span>}
                {content.website?.href && (
                  <a href={content.website.href} target="_blank" rel="noreferrer" className="text-decoration-none">
                    <FontAwesomeIcon icon={faGlobe} className="me-2 pink" /> {content.website.label}
                  </a>
                )}
              </div>
              <div className="d-flex justify-content-center flex-wrap gap-3 mt-3 profile-links">
                {(content.socials || []).map((social, i) => (
                  <a href={social.href} target="_blank" rel="noreferrer" className="social-badge" key={i}>
                    <FontAwesomeIcon icon={getIcon(social.icon)} className="me-1" /> {social.label}
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
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faStar} className="me-2 pink" /> {content.summaryTitle}</h5>
                <p className="cv-text">
                  {content.summaryIntro}
                </p>
                <ul className="cv-list">
                  {(content.summaryPoints || []).map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>

              {/* Skills */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faCode} className="me-2 pink" /> {content.skillsTitle}</h5>
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
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faAward} className="me-2 pink" /> {content.testScoresTitle}</h5>
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
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faBriefcase} className="me-2 pink" /> {content.experienceTitle}</h5>

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
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faGraduationCap} className="me-2 pink" /> {content.educationTitle}</h5>

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
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faFileAlt} className="me-2 pink" /> {content.publicationsTitle}</h5>

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
      <style>
        {`
          .custom-modal .modal-content {
            background-color: var(--bs-body-bg);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            color: var(--bs-body-color);
            border-radius: 12px;
          }

          .cv-save-icon {
            color: var(--bs-body-color);
            transition: all 0.2s ease;
            opacity: 0.6;
          }

          .cv-save-icon:hover {
            color: var(--secondary-color);
            opacity: 1;
            transform: scale(1.15);
          }

          /* PDF Light Theme Overrides */
          .force-light-pdf {
            background-color: #ffffff !important;
            color: #212529 !important;
            padding: 10px !important;
          }

          .force-light-pdf .cv-section {
            background: #f8f9fa !important;
            border-color: #e9ecef !important;
          }

          .force-light-pdf h1,
          .force-light-pdf h4,
          .force-light-pdf h5,
          .force-light-pdf h6,
          .force-light-pdf p,
          .force-light-pdf span,
          .force-light-pdf li,
          .force-light-pdf strong,
          .force-light-pdf a,
          .force-light-pdf em {
            color: #212529 !important;
          }

          .force-light-pdf .cv-supervisors,
          .force-light-pdf .cv-authors {
            color: #6c757d !important;
          }

          .force-light-pdf .cv-header {
            border-bottom-color: #e9ecef !important;
          }

          .force-light-pdf .cv-list-no-bullet li {
            border-bottom-color: #e9ecef !important;
          }

          .force-light-pdf .pink,
          .force-light-pdf .cv-role {
            color: #c91574 !important;
          }

          .force-light-pdf .social-badge {
            border-color: rgba(201, 21, 116, 0.3) !important;
            color: #212529 !important;
            background-color: transparent !important;
          }

          .force-light-pdf .cv-badge {
            background-color: rgba(201, 21, 116, 0.1) !important;
            color: #c91574 !important;
            border: 1px solid rgba(201, 21, 116, 0.3) !important;
          }

          .force-light-pdf .cv-date {
            background-color: rgba(201, 21, 116, 0.1) !important;
            color: #c91574 !important;
          }

          .force-light-pdf .cv-download-btn {
            display: none !important;
          }


          .pink {
            color: var(--secondary-color);
          }

          .cv-header {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 1.5rem;
          }

          .cv-name {
            letter-spacing: -0.5px;
          }

          .contact-info span, .contact-info a {
            font-size: 0.95rem;
            color: var(--bs-body-color);
          }

          .social-badge {
            display: inline-block;
            padding: 6px 16px;
            background-color: rgba(201, 21, 116, 0.1);
            border: 1px solid rgba(201, 21, 116, 0.3);
            border-radius: 20px;
            color: var(--bs-body-color);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s ease;
          }

          .social-badge:hover {
            background-color: var(--secondary-color);
            color: white;
            transform: translateY(-2px);
          }

          .section-title-sm {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            border-bottom: 2px solid rgba(201, 21, 116, 0.3);
            padding-bottom: 0.5rem;
            display: inline-block;
          }

          .cv-section {
            background: rgba(255, 255, 255, 0.02);
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.05);
          }

          .cv-text {
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .cv-list {
            padding-left: 1.2rem;
            font-size: 0.95rem;
            margin-bottom: 0;
          }

          .cv-list li {
            margin-bottom: 0.4rem;
          }

          .cv-list-no-bullet {
            list-style-type: none;
            padding-left: 0;
            font-size: 0.95rem;
          }

          .cv-list-no-bullet li {
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
          }

          .cv-list-no-bullet li:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }

          .cv-badge {
            background-color: rgba(201, 21, 116, 0.15) !important;
            color: var(--bs-body-color) !important;
            border: 1px solid rgba(201, 21, 116, 0.3);
            font-weight: normal;
            padding: 5px 10px;
          }

          .cv-date {
            font-size: 0.85rem;
            color: var(--secondary-color);
            background: rgba(201, 21, 116, 0.1);
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 600;
          }

          .cv-supervisors {
            font-size: 0.85rem;
            color: #aaa;
            margin-top: 0.3rem;
          }

          .cv-authors {
            font-size: 0.9rem;
            color: #ccc;
          }

          .cv-link {
            color: var(--bs-body-color);
            transition: color 0.2s;
          }

          .cv-link:hover {
            color: var(--secondary-color);
          }
        `}
      </style>
    </Modal>
  );
}

export default CVModal;
