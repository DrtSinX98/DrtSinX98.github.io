import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Modal, Container, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
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
import { faLinkedin, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

function CVModal({ show, onHide }) {
  const cvRef = useRef(null);
  const [isPdfMode, setIsPdfMode] = useState(false);

  const handleDownloadPdf = () => {
    setIsPdfMode(true);
    setTimeout(() => {
      const element = cvRef.current;
      const opt = {
        margin:       5,
        filename:     'Pritish_Joshi_CV.pdf',
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
                Pritish Ranjan Joshi
              </h1>
              <h4 className="cv-subtitle mb-3 text-muted">PhD Candidate in Machine Learning</h4>
              <div className="d-flex justify-content-center flex-wrap gap-3 contact-info">
                <span><FontAwesomeIcon icon={faEnvelope} className="me-2 pink" /> pritish.ranjan.joshi@it.uu.se</span>
                <span><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 pink" /> Uppsala, Sweden</span>
                <a href="https://www.pritish.eu" target="_blank" rel="noreferrer" className="text-decoration-none">
                  <FontAwesomeIcon icon={faGlobe} className="me-2 pink" /> www.pritish.eu
                </a>
              </div>
              <div className="d-flex justify-content-center flex-wrap gap-3 mt-3 profile-links">
                <a href="https://www.linkedin.com/in/pritish-joshi-b870bb242/" target="_blank" rel="noreferrer" className="social-badge">
                  <FontAwesomeIcon icon={faLinkedin} className="me-1" /> LinkedIn
                </a>
                <a href="https://github.com/DrtSinX98" target="_blank" rel="noreferrer" className="social-badge">
                  <FontAwesomeIcon icon={faGithub} className="me-1" /> GitHub
                </a>
                <a href="https://scholar.google.com/citations?hl=en&user=jUdY7OcAAAAJ" target="_blank" rel="noreferrer" className="social-badge">
                  <FontAwesomeIcon icon={faGoogle} className="me-1" /> Scholar
                </a>
              </div>
            </Col>
          </Row>

          <Row>
            {/* Left Column */}
            <Col lg={4} className="mb-4">
              
              {/* Summary */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faStar} className="me-2 pink" /> Summary</h5>
                <p className="cv-text">
                  An adaptable and motivated researcher with a deep interest and curiosity in interdisciplinary science and technology:
                </p>
                <ul className="cv-list">
                  <li>Currently working on simulation-guided inference for modeling of metal plating dynamics in batteries.</li>
                  <li>Previously worked on variational autoencoders, predictive modeling, quantum and classical mechanical simulation for battery materials.</li>
                  <li>Have also worked with classical MD simulations and ML based predictions of drugs and bio-molecules.</li>
                </ul>
              </div>

              {/* Skills */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faCode} className="me-2 pink" /> Technical Skills</h5>
                <div className="mb-2">
                  <strong>Programming</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {["Python", "C++", "JavaScript", "HTML", "CSS", "ReactJS", "Shell Scripting"].map(skill => (
                      <Badge bg="secondary" className="cv-badge" key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Machine Learning</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {["Bayesian models", "PINNs", "Transformers", "Variational Auto-Encoders"].map(skill => (
                      <Badge bg="secondary" className="cv-badge" key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Data Analysis</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {["Pandas", "NumPy", "MatPlotLib", "Seaborn", "Yellowbrick", "Origin"].map(skill => (
                      <Badge bg="secondary" className="cv-badge" key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Software & Tools</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {["PyTorch", "Tensorflow", "Quantum Espresso", "VASP"].map(skill => (
                      <Badge bg="secondary" className="cv-badge" key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Computational Modelling</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {["Classical MD", "ab initio MD", "Docking", "DFT"].map(skill => (
                      <Badge bg="secondary" className="cv-badge" key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Test Scores */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faAward} className="me-2 pink" /> Test Scores</h5>
                <ul className="cv-list-no-bullet">
                  <li><strong>IIT GATE 2025:</strong> AIR 951</li>
                  <li><strong>IIT GATE 2024:</strong> AIR 569</li>
                  <li><strong>CSIR NET 2024:</strong> Qualified</li>
                  <li><strong>IIT JAM 2022:</strong> AIR 443</li>
                </ul>
              </div>

            </Col>

            {/* Right Column */}
            <Col lg={8}>
              
              {/* Experience */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faBriefcase} className="me-2 pink" /> Research Experience</h5>
                
                <div className="cv-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-bold mb-0">Uppsala University <span className="text-muted fw-normal">| Uppsala, SE</span></h6>
                    <span className="cv-date">2025 - Present</span>
                  </div>
                  <div className="cv-role pink fw-semibold mb-1">PhD Student</div>
                  <ul className="cv-list">
                    <li>Simulation-guided inference for modeling of metal plating dynamics in batteries.</li>
                    <li>Phase-Field modeling of electroplating dynamics.</li>
                    <li>PINN based FEM solvers.</li>
                  </ul>
                  <div className="cv-supervisors"><em>Supervisors:</em> Jens Sjölund, Peter Broqvist, Erik Berg</div>
                </div>

                <div className="cv-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-bold mb-0">RISE, TCG CREST <span className="text-muted fw-normal">| Kolkata, IN</span></h6>
                    <span className="cv-date">2024 - 2025</span>
                  </div>
                  <div className="cv-role pink fw-semibold mb-1">Project Associate</div>
                  <ul className="cv-list">
                    <li>Computational Materials Discovery using Conditional Variational Autoencoders.</li>
                    <li>Reactive Dynamics study of Batteries using DFT and ML-FF.</li>
                    <li>Interfacial reaction dynamics of electrolytes using Classical and ab initio MD.</li>
                  </ul>
                  <div className="cv-supervisors"><em>Supervisors:</em> Tanmoy Paul, Gour P. Das</div>
                </div>

                <div className="cv-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-bold mb-0">IIT (ISM) Dhanbad <span className="text-muted fw-normal">| Dhanbad, IN</span></h6>
                    <span className="cv-date">2023 - 2024</span>
                  </div>
                  <div className="cv-role pink fw-semibold mb-1">Master's Thesis Project</div>
                  <ul className="cv-list">
                    <li>Machine Learning guided drug discovery.</li>
                    <li>Classical and semi-classical molecular dynamics simulation and analysis.</li>
                  </ul>
                  <div className="cv-supervisors"><em>Supervisor:</em> Niladri Patra</div>
                </div>
              </div>

              {/* Education */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faGraduationCap} className="me-2 pink" /> Education</h5>
                
                <div className="cv-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-bold mb-0">Uppsala University <span className="text-muted fw-normal">| Uppsala, SE</span></h6>
                    <span className="cv-date">2025 - Present</span>
                  </div>
                  <div className="cv-role mb-1">Doctor of Philosophy, Machine Learning-Information Technology</div>
                  <div className="cv-supervisors"><em>Key courses:</em> Statistical Machine Learning, Deep Learning, Convex Optimization, Advanced Python</div>
                </div>

                <div className="cv-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-bold mb-0">Indian Institute of Technology (ISM) <span className="text-muted fw-normal">| Dhanbad, IN</span></h6>
                    <span className="cv-date">2022 - 2024</span>
                  </div>
                  <div className="cv-role mb-1">Master of Science, Computational Chemistry-Chemical Biology</div>
                  <div className="cv-supervisors"><em>Key courses:</em> Machine Learning, Quantum Chemistry, Statistical Thermodynamics, Mathematics for Chemists...</div>
                </div>

                <div className="cv-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-bold mb-0">IGNO University <span className="text-muted fw-normal">| New Delhi, IN</span></h6>
                    <span className="cv-date">2019 - 2021</span>
                  </div>
                  <div className="cv-role mb-1">Bachelor of Science, Chemistry-Mathematics</div>
                </div>
              </div>

              {/* Publications */}
              <div className="cv-section mb-3">
                <h5 className="section-title-sm"><FontAwesomeIcon icon={faFileAlt} className="me-2 pink" /> Publications</h5>
                
                <div className="cv-item mb-3">
                  <div className="fw-bold">Inverse Design of Next-generation Battery Materials via Diffusion-Seeded Evolutionary Optimization <span className="cv-date ms-2">Submitted</span></div>
                  <div className="cv-authors">Pritish Joshi, Arnob Das, Rajdeep Boral, Tanmoy Paul</div>
                </div>

                <div className="cv-item mb-3">
                  <div className="fw-bold">Reactive dynamics study of solid electrolytes Li6PS5Cl|Li3InCl6 interface: an ab initio molecular dynamics simulation <span className="cv-date ms-2">Submitted</span></div>
                  <div className="cv-authors">Pritish Joshi, Tanmoy Paul</div>
                </div>

                <div className="cv-item mb-3">
                  <a href="https://doi.org/10.1021/acs.jcim.4c01523" target="_blank" rel="noreferrer" className="fw-bold text-decoration-none cv-link">
                    Delving into Macrolide Binding Affinities and Associated Structural Modulations in Erythromycin Esterase C: Insights into the Venus Flytrap Mechanism
                  </a>
                  <div className="cv-journal text-muted">Journal of Chemical Information and Modeling (20-11-2024)</div>
                  <div className="cv-authors">Abhishek Bera, Pritish Joshi, Niladri Patra</div>
                </div>

                <div className="cv-item mb-3">
                  <a href="https://doi.org/10.1021/acs.jpcb.3c05845" target="_blank" rel="noreferrer" className="fw-bold text-decoration-none cv-link">
                    Machine Learning-Guided Discovery of AcrB and MexB Efflux Pump Inhibitors
                  </a>
                  <div className="cv-journal text-muted">Journal of Physical Chemistry B (10-01-2024)</div>
                  <div className="cv-authors">Abhishek Bera, Rakesh Kumar Roy, Pritish Joshi, Niladri Patra</div>
                </div>
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
