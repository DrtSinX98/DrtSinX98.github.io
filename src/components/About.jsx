import React, { useState } from "react";
import { Col, Image, Container, Row, Button, Accordion, Badge, Tabs, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faGraduationCap, faBriefcase, faMicroscope, faCode, faDesktop, faTrophy, faBook, faChalkboardTeacher, faGamepad, faUsers, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import AndroidProjects from "./AndroidProjects";
import DesignProjects from "./DesignProjects";
import CompProjects from "./CompProjects";
import CVModal from "./CVModal";

function About() {
  const [showCVModal, setShowCVModal] = useState(false);
  const certificates = [
    { title: "Getting Started with Python (University of Michigan)", link: "https://www.coursera.org/account/accomplishments/verify/MZK5JE7VPKW7" },
    { title: "Python Data Structure (University of Michigan)", link: "https://www.coursera.org/account/accomplishments/verify/AJSMZSQEQ9BD" },
    { title: "Python Accessing Web Data (University of Michigan)", link: "https://www.coursera.org/account/accomplishments/certificate/WVVBUSHR5LQN" },
    { title: "Crash Course on Python (Google)", link: "https://www.coursera.org/account/accomplishments/verify/8KUEY6QESMCC" },
    { title: "Python Libraries (UpGrad)", link: "https://upgrad.verification.givemycertificate.com/v/0ab0419e-8abc-48ef-be63-a53457c5bae6" },
    { title: "Supervised Machine Learning (Stanford Online)", link: "https://www.coursera.org/account/accomplishments/certificate/JZYVMBGZJMH8" },
    { title: "Machine Learning Basic to Advanced (Udemy)", link: "https://www.udemy.com/certificate/UC-9ae61440-df14-4edc-ba0b-0bdb1dd08791/" },
    { title: "Data Science and ML Workshop (Coding Ninjas)", link: "https://drive.google.com/file/d/1PYbt1QVUkwaaW_Laa0trcnD8eCLoYmNg/view?usp=sharing" },
    { title: "Data Science Foundations (Great Learning)", link: "https://olympus.mygreatlearning.com/courses/13680/certificate" },
    { title: "Introduction to Cryptography (Wolfram U)", link: "https://www.wolframcloud.com/obj/online-courses/introduction-to-cryptography/api/userData/certificates/ace2f595-f53b-4aed-bfe8-f3b25a58a426_CC.pdf" },
    { title: "HTML, CSS & JavaScript (Johns Hopkins University)", link: "https://www.coursera.org/account/accomplishments/verify/F2HFNKMRSU8C" },
    { title: "JavaScript & React.Js (Microsoft)", link: "https://www.cert.devtown.in/verify/2etySg" },
    { title: "JavaScript & React.Js (Google)", link: "https://www.cert.devtown.in/verify/ZDgt6s" },
    { title: "JavaScript & React.Js (DevTown)", link: "https://www.cert.devtown.in/verify/ZUK79h" },
    { title: "HTML (Sololearn)", link: "https://www.sololearn.com/Certificate/CT-ZBLJ6PY7/pdf" },
    { title: "Getting Started with Figma (Coursera)", link: "https://www.coursera.org/account/accomplishments/verify/MAR5Z2LL9PFD" }
  ];

  return (
    <Container className="about-page">
      {/* 1. Top Intro Section */}
      <Row className="mb-5">
        <Col lg={4} className="image-p">
          <div id="ab-img">
            <Image src="https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/ab.svg" alt="about-pic" className="mb-4" fluid />
          </div>
        </Col>
        <Col lg={8}>
          <h1 className="hero-title">Do you wanna know <span className="pink">About me?</span></h1>
          <p className="lead mt-3">
            I'm a guy who likes to learn new things and explore different fields.<br />
            I'm <span className="pink">currently</span> a researcher in the field of Machine Learning.<br /><br />
            If interested, you can look into my <span onClick={() => setShowCVModal(true)} className="skill-chip cv-chip" style={{ display: 'inline-block', cursor: 'pointer', textDecoration: 'none' }}><FontAwesomeIcon icon={faFilePdf} className="me-1" /> Curriculum vitae</span><br /><br />
            You can also find more details <span className="pink">about me</span> down below.
          </p>
        </Col>
      </Row>

      <hr className="my-5" />

      <Row>
        {/* 2. Experience & Education (Timeline) */}
        <Col lg={6} className="mb-5">
          <h2 className="section-title mb-4"><FontAwesomeIcon icon={faBriefcase} className="me-2 pink" /> Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot work-dot"></div>
              <div className="timeline-content glass-card">
                <h4>Uppsala University</h4>
                <p className="text-muted mb-2">PhD Candidate | Machine Learning-Information Technology</p>
                <div className="tags">
                  <Badge bg="secondary" className="custom-badge">Machine Learning</Badge>
                  <Badge bg="secondary" className="custom-badge">Battery Modeling</Badge>
                  <Badge bg="secondary" className="custom-badge">Deep Learning</Badge>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot edu-dot"></div>
              <div className="timeline-content glass-card">
                <h4>RISE, TCG CREST</h4>
                <p className="text-muted mb-2">Project Associate | Computational Materials Discovery</p>
                <div className="tags">
                  <Badge bg="secondary" className="custom-badge">Metal-ion Batteries</Badge>
                  <Badge bg="secondary" className="custom-badge">Density Functional Theory</Badge>
                  <Badge bg="secondary" className="custom-badge">Neural Networks</Badge>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot res-dot"></div>
              <div className="timeline-content glass-card">
                <h4>IIT Dhanbad</h4>
                <p className="text-muted mb-2">Master of Science | Computational Chemistry-Chemical Biology</p>
                <div className="tags">
                  <Badge bg="secondary" className="custom-badge">Computational Chemistry</Badge>
                  <Badge bg="secondary" className="custom-badge">Machine Learning</Badge>
                  <Badge bg="secondary" className="custom-badge">Molecular Dynamics</Badge>
                </div>
              </div>
            </div>
          </div>
        </Col>

        {/* 3. Skills & Tech Stack Grid */}
        <Col lg={6} className="mb-5">
          <h2 className="section-title mb-4"><FontAwesomeIcon icon={faCode} className="me-2 pink" /> Tech Stack & Tools</h2>

          <h5 className="mt-3 mb-3"><FontAwesomeIcon icon={faDesktop} className="me-2" /> Programming Languages</h5>
          <div className="skill-grid">
            <div className="skill-chip">Python</div>
            <div className="skill-chip">C++</div>
            <div className="skill-chip">JavaScript</div>
            <div className="skill-chip">React.js</div>
            <div className="skill-chip">HTML5</div>
            <div className="skill-chip">CSS3</div>
          </div>

          <h5 className="mt-4 mb-3"><FontAwesomeIcon icon={faMicroscope} className="me-2" /> Machine Learning & Scientific Software</h5>
          <div className="skill-grid">
            <div className="skill-chip outline">PyTorch</div>
            <div className="skill-chip outline">Tensorflow</div>
            <div className="skill-chip outline">Transformers</div>
            <div className="skill-chip outline">PINNs</div>
            <div className="skill-chip outline">AMBER</div>
            <div className="skill-chip outline">GROMACS</div>
            <div className="skill-chip outline">NAMD</div>
            <div className="skill-chip outline">Quantum Espresso</div>
            <div className="skill-chip outline">VASP</div>
            <div className="skill-chip outline">Gaussian</div>
          </div>

          <h5 className="mt-4 mb-3"><FontAwesomeIcon icon={faBook} className="me-2" /> Utilities & Design</h5>
          <div className="skill-grid">
            <div className="skill-chip soft">Figma</div>
            <div className="skill-chip soft">Origin</div>
            <div className="skill-chip soft">LaTEX</div>
            <div className="skill-chip soft">Jupyter Notebook</div>
          </div>
        </Col>
      </Row>

      <hr className="my-4" />

      {/* 4. Projects & Portfolios (Tabs) */}
      <Row className="mb-5">
        <Col lg={12}>
          <h2 className="section-title mb-4"><FontAwesomeIcon icon={faProjectDiagram} className="me-2 pink" /> Projects & Portfolios</h2>
          <div className="glass-card p-4">
            <Tabs defaultActiveKey="android" id="projects-tabs" className="mb-4 custom-tabs">
              <Tab eventKey="android" title="Android / Kernel">
                <AndroidProjects />
              </Tab>
              <Tab eventKey="design" title="Design / UI">
                <DesignProjects />
              </Tab>
              <Tab eventKey="comp" title="Computational">
                <CompProjects />
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>

      <hr className="my-4" />

      {/* 4. Achievements & Links Accordion */}
      <Row className="mb-5">
        <Col lg={12}>
          <h2 className="section-title mb-4"><FontAwesomeIcon icon={faTrophy} className="me-2 pink" /> Achievements & Certifications</h2>
          <Accordion className="custom-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Publications & Thesis</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column gap-3">
                  <a className="glass-link" href="#" target="_blank" rel="noreferrer">
                    <div className="title fw-bold">"Inverse Design of Next-generation Battery Materials via Diffusion-Seeded Evolutionary Optimization"</div>
                    <div className="subtitle text-muted">Submitted</div>
                  </a>
                  <a className="glass-link" href="#" target="_blank" rel="noreferrer">
                    <div className="title fw-bold">"Reactive dynamics study of solid electrolytes Li6PS5Cl|Li3InCl6 interface: an ab initio molecular dynamics simulation"</div>
                    <div className="subtitle text-muted">Submitted</div>
                  </a>
                  <a className="glass-link" href="https://doi.org/10.1021/acs.jcim.4c01523" target="_blank" rel="noreferrer">
                    <div className="title fw-bold">"Delving into Macrolide Binding Affinities and Associated Structural Modulations in Erythromycin Esterase C: Insights into the Venus Flytrap Mechanism"</div>
                    <div className="subtitle text-muted">Journal of Chemical Information and Modeling | Nov 20, 2024</div>
                  </a>
                  <a className="glass-link" href="https://doi.org/10.1021/acs.jpcb.3c05845" target="_blank" rel="noreferrer">
                    <div className="title fw-bold">"Machine Learning-Guided Discovery of AcrB and MexB Efflux Pump Inhibitors"</div>
                    <div className="subtitle text-muted">Journal of Physical Chemistry B | ACS | Jan 10, 2024</div>
                  </a>
                  <a className="glass-link" href="https://drive.google.com/file/d/1C5NlFdb0n3bDihn7Gv2fDqKNTCHAO9Iv/view?usp=share_link" target="_blank" rel="noreferrer">
                    <div className="title fw-bold">Master's Thesis: Revolutionising Antibacterial Warfare</div>
                    <div className="subtitle text-muted">Machine Learning and Molecular Dynamics Unveiling Potential Gram-Negative Bacteria Inhibitors | May 2024</div>
                  </a>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>National Level Exams</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column gap-3">
                  <a className="glass-link" href="#" target="_blank" rel="noreferrer">
                    <div className="title fw-bold">GATE (CY) 2025</div>
                    <div className="subtitle text-muted">All India Rank 951</div>
                  </a>
                  <a className="glass-link" href="https://drive.google.com/file/d/1-9eYgxvBIuBHXsMnHDHcUEjxhlNe0YXe/view?usp=sharing" target="_blank" rel="noreferrer">
                    <div className="title fw-bold">GATE (CY) 2024</div>
                    <div className="subtitle text-muted">All India Rank 569</div>
                  </a>
                  <a className="glass-link" href="#" target="_blank" rel="noreferrer">
                    <div className="title fw-bold">CSIR NET 2024</div>
                    <div className="subtitle text-muted">Qualified</div>
                  </a>
                  <a className="glass-link" href="https://drive.google.com/file/d/11UGuILn-M0cD1Z3E6P09FomcU2I_5nPV/view?usp=sharing" target="_blank" rel="noreferrer">
                    <div className="title fw-bold">IIT JAM (CY) 2022</div>
                    <div className="subtitle text-muted">All India Rank 443</div>
                  </a>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Online Certifications ({certificates.length})</Accordion.Header>
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

      {/* 5. Interests & Socials */}
      <Row className="mb-5 text-center">
        <Col lg={4} className="mb-4">
          <div className="glass-card text-center h-100">
            <FontAwesomeIcon icon={faChalkboardTeacher} size="2x" className="mb-3 pink" />
            <h4 className="fw-bold">Teaching</h4>
            <p className="text-muted">5 years experience in science for boards and competitive exams.</p>
            <div className="tags justify-content-center mt-3">
              <Badge bg="secondary">IIT JEE (Chem)</Badge>
              <Badge bg="secondary">NEET (Chem)</Badge>
              <Badge bg="secondary">XI & XII (PCM)</Badge>
            </div>
          </div>
        </Col>
        <Col lg={4} className="mb-4">
          <div className="glass-card text-center h-100">
            <FontAwesomeIcon icon={faGamepad} size="2x" className="mb-3 pink" />
            <h4 className="fw-bold">Hobbies</h4>
            <p className="text-muted">Leisure activities and pastimes.</p>
            <div className="tags justify-content-center mt-3">
              <Badge bg="secondary">Anime</Badge>
              <Badge bg="secondary">Frontend Dev</Badge>
              <Badge bg="secondary">Android Dev</Badge>
              <Badge bg="secondary">Graphic Design</Badge>
              <Badge bg="secondary">Gaming</Badge>
            </div>
          </div>
        </Col>
        <Col lg={4} className="mb-4">
          <div className="glass-card text-center h-100">
            <FontAwesomeIcon icon={faUsers} size="2x" className="mb-3 pink" />
            <h4 className="fw-bold">Socials</h4>
            <p className="text-muted">Connect with me across the web.</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <a href="https://www.linkedin.com/in/pritish-joshi-b870bb242" target="_blank" rel="noreferrer" className="social-pill">LinkedIn</a>
              <a href="https://www.instagram.com/the_istreet" target="_blank" rel="noreferrer" className="social-pill">Instagram</a>
            </div>
          </div>
        </Col>
      </Row>

      <CVModal show={showCVModal} onHide={() => setShowCVModal(false)} />

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
