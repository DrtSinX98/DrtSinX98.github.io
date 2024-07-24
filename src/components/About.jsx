import React from "react";
import { Col, Image , Container, Row, Card, ListGroup, Button } from "react-bootstrap";
import ab from "../images/ab.svg";
import grad from "../images/grad.png";
import work from "../images/work.png";
import cert from "../images/cert.png";
import code from "../images/code.png";
import hobby from "../images/hobby.png";
import res from "../images/res.png";
import pub from "../images/pub.png";
import teach from "../images/teach.png";
import social from "../images/social.png";
import soft from "../images/soft.png";
import test from "../images/test.png";
import thesis from "../images/thesis.png";
function About() {
  return (
    <Container>
      <Row>
      <Col lg={4} className="image-p">
      <div id="ab-img">
      <Image src={ab} alt="about-pic" className="mb-4" fluid/>
      </div>
      </Col>
      <Col>
      <h1>Do you wanna  know <span className="pink">About me?</span></h1>
      <p className="lead">I'm a guy who likes to learn new things and explore different fields. 
        <br/>I'm <span className="pink">currently</span> a researcher in the field of Computational Materials Discovery.
        <br/>If interested, you can look into my <Button variant="secondary" size="sm" href="https://drive.google.com/file/d/1EBXQVRXYt07Pbke3zqBcCbw3HlYBIcDd/view?usp=drivesdk" target="_blank">Curriculum vitae</Button>
        <br/> You can also find more details <span className="pink">about me</span> down below.
      </p>
      </Col>
      </Row>
      <hr className="my-4" />
      <Row>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Education</Card.Header>
            <Card.Img variant="top" src={grad} alt="Card cap" />
            <Card.Body>
              <Card.Title>IIT Dhanbad</Card.Title>
              <Card.Text className="card-text">
                Master of Science
                <br/>Department of Chemistry and Chemical Biology
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action href="https://en.wikipedia.org/wiki/Computational_chemistry" target="_blank">Computational Chemistry</ListGroup.Item>
              <ListGroup.Item action href="https://en.wikipedia.org/wiki/Machine_learning" target="_blank">Machine Leraning</ListGroup.Item>
              <ListGroup.Item action href="https://en.wikipedia.org/wiki/Molecular_dynamics" target="_blank">Molecular Dynamics</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Work</Card.Header>
            <Card.Img variant="top" src={work} alt="Card cap" />
            <Card.Body>
              <Card.Title>RISE, TCG CREST</Card.Title>
              <Card.Text className="card-text">
                  Project Associate
                  <br/>Computational Materials Discovery for Batteries
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action href="https://www.mdpi.com/2673-8392/2/3/110" target="_blank">Metal-ion Batteries</ListGroup.Item>
              <ListGroup.Item action href="https://en.wikipedia.org/wiki/Density_functional_theory" target="_blank">Density Functional Theory</ListGroup.Item>
              <ListGroup.Item action href="https://en.wikipedia.org/wiki/Neural_network_(machine_learning)" target="_blank">Neural Networks</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Research</Card.Header>
            <Card.Img variant="top" src={res} alt="Card cap" />
            <Card.Body>
              <Card.Title>Computational Chemistry</Card.Title>
              <Card.Text className="card-text">
                  Working on Computational studies of
                  <br/>various physical systems.
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action href="https://www.nature.com/subjects/computational-biophysics" target="_blank">Computational Biophysics</ListGroup.Item>
              <ListGroup.Item action href="https://en.wikipedia.org/wiki/Computational_materials_science" target="_blank">Materials Desingn</ListGroup.Item>
              <ListGroup.Item action href="https://www.sciencedirect.com/topics/engineering/battery-material" target="_blank">Battery Materials</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Publications</Card.Header>
            <Card.Img variant="top" src={pub} alt="Card cap" />
            <Card.Body>
              <Card.Title>Research articles</Card.Title>
              <Card.Text className="card-text">
                  Most recent publications are
                  <br/>given below
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action href="https://doi.org/10.1021/acs.jpcb.3c05845" target="_blank">"Machine Learning-Guided Discovery of AcrB and MexB Efflux Pump Inhibitors"
                <br/>Journal of Physical Chemistry B
                <br/>American Chemical Society
                <br/>January 10, 2024
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Thesis</Card.Header>
            <Card.Img variant="top" src={thesis} alt="Card cap" />
            <Card.Body>
              <Card.Title>Master's Thesis</Card.Title>
              <Card.Text className="card-text">
                  My MSc. thesis can be
                  <br/>downloaded from the link below
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action href="https://drive.google.com/file/d/1C5NlFdb0n3bDihn7Gv2fDqKNTCHAO9Iv/view?usp=share_link" target="_blank">"Revolutionising Antibacterial Warfare: 
                Machine Learning and Molecular Dynamics Unveiling Potential Gram-Negative Bacteria Inhibitors"
                <br/>May, 2024
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Test Scores</Card.Header>
            <Card.Img variant="top" src={test} alt="Card cap" />
            <Card.Body>
              <Card.Title>National Level Exams</Card.Title>
              <Card.Text className="card-text">
                  Ranks of all the 
                  <br/>National level examinations I've qualified
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action href="https://drive.google.com/file/d/1-9eYgxvBIuBHXsMnHDHcUEjxhlNe0YXe/view?usp=sharing" target="_blank">GATE (CY) 2024: 
                <br/> All India Rank 569
              </ListGroup.Item>
              <ListGroup.Item action href="https://drive.google.com/file/d/11UGuILn-M0cD1Z3E6P09FomcU2I_5nPV/view?usp=sharing" target="_blank">IIT JAM (CY) 2022: 
                <br/> All India Rank 443
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Coding</Card.Header>
            <Card.Img variant="top" src={code} alt="Card cap" />
            <Card.Body>
              <Card.Title>Coding & Programming Skills</Card.Title>
              <Card.Text className="card-text">
                  I have experience in writing codes 
                  <br/>in various programming languages
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Python</ListGroup.Item>
              <ListGroup.Item>JavaScript & React.Js</ListGroup.Item>
              <ListGroup.Item>HTML & CSS</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Certificates</Card.Header>
            <Card.Img variant="top" src={cert} alt="Card cap" />
            <Card.Body>
              <Card.Title>Certification Courses</Card.Title>
              <Card.Text className="card-text">
                  I have done various online courses 
                  <br/>scroll through the list below 
                  to find out the corresponding certificates 
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action href="https://www.coursera.org/account/accomplishments/verify/MZK5JE7VPKW7" target="_blank">Getting Started with Python:
              <br/>University of Michigan
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.coursera.org/account/accomplishments/verify/AJSMZSQEQ9BD" target="_blank">Python Data Structure:
              <br/>University of Michigan
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.coursera.org/account/accomplishments/certificate/WVVBUSHR5LQN" target="_blank">Python Accessing Web Data:
              <br/>University of Michigan
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.coursera.org/account/accomplishments/verify/8KUEY6QESMCC" target="_blank">Crash Course on Python:
              <br/>Google
              </ListGroup.Item>
              <ListGroup.Item action href="https://upgrad.verification.givemycertificate.com/v/0ab0419e-8abc-48ef-be63-a53457c5bae6" target="_blank">Python Libraries:
              <br/>UpGrad
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.coursera.org/account/accomplishments/certificate/JZYVMBGZJMH8" target="_blank">Supervised Machine Learning:
              <br/>Stanford Online
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.udemy.com/certificate/UC-9ae61440-df14-4edc-ba0b-0bdb1dd08791/" target="_blank">Machine Learning Basic to Advanced:
              <br/>Udemy
              </ListGroup.Item>
              <ListGroup.Item action href="https://drive.google.com/file/d/1PYbt1QVUkwaaW_Laa0trcnD8eCLoYmNg/view?usp=sharing" target="_blank">Data Science and ML Workshop:
              <br/>Coding Ninjas
              </ListGroup.Item>
              <ListGroup.Item action href="https://olympus.mygreatlearning.com/courses/13680/certificate" target="_blank">Data Science Foundations:
              <br/>Great Learning
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.wolframcloud.com/obj/online-courses/introduction-to-cryptography/api/userData/certificates/ace2f595-f53b-4aed-bfe8-f3b25a58a426_CC.pdf" target="_blank">Introduction to Cryptography:
              <br/>Wolfram U
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.coursera.org/account/accomplishments/verify/F2HFNKMRSU8C" target="_blank">HTML, CSS & JavaScript:
              <br/>Johns Hopkins University
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.cert.devtown.in/verify/2etySg" target="_blank">JavaScript & React.Js:
              <br/>Microsoft
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.cert.devtown.in/verify/ZDgt6s" target="_blank">JavaScript & React.Js:
              <br/>Google
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.cert.devtown.in/verify/ZUK79h" target="_blank">JavaScript & React.Js:
              <br/>DevTown
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.sololearn.com/Certificate/CT-ZBLJ6PY7/pdf" target="_blank">HTML:
              <br/>Sololearn
              </ListGroup.Item>
              <ListGroup.Item action href="https://www.coursera.org/account/accomplishments/verify/MAR5Z2LL9PFD" target="_blank">Getting Started with Figma:
              <br/>Coursera
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Softwares</Card.Header>
            <Card.Img variant="top" src={soft} alt="Card cap" />
            <Card.Body>
              <Card.Title>Programs & Frameworks</Card.Title>
              <Card.Text className="card-text">
                  I have experience with various softwares 
                  used for science, engineering and designing
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>AMBER, GROMACS, NAMD, Quantum Espresso, VASP & Gaussian</ListGroup.Item>
              <ListGroup.Item>Figma, Origin, LaTEX, Jupyter Notebook</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Teaching</Card.Header>
            <Card.Img variant="top" src={teach} alt="Card cap" />
            <Card.Body>
              <Card.Title>Teaching Experience</Card.Title>
              <Card.Text className="card-text">
                  I have 5 years of experience in teaching science
                  for boards and competitive exams.
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>IIT JEE - Chemistry</ListGroup.Item>
              <ListGroup.Item>NEET - Chemistry</ListGroup.Item>
              <ListGroup.Item>XI & XII - PCM</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Hobbies</Card.Header>
            <Card.Img variant="top" src={hobby} alt="Card cap" />
            <Card.Body>
              <Card.Title>Liesure Activities</Card.Title>
              <Card.Text className="card-text">
                  In spend most of my free time scrolling through the 
                  internet and some other stuff mentioned below
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Watching Anime</ListGroup.Item>
              <ListGroup.Item>Frontend Web Development</ListGroup.Item>
              <ListGroup.Item>Android Development</ListGroup.Item>
              <ListGroup.Item>Graphic Designing</ListGroup.Item>
              <ListGroup.Item>Casual Gaming</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-4">
          <Card>
          <Card.Header>Social Media</Card.Header>
            <Card.Img variant="top" src={social} alt="Card cap" />
            <Card.Body>
              <Card.Title>Social life</Card.Title>
              <Card.Text className="card-text">
                  On the internet I usually stay active &
                  post regularly on these social networking apps
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action href="https://www.linkedin.com/in/pritish-joshi-b870bb242" target="_blank">LinkedIn</ListGroup.Item>
              <ListGroup.Item action href="https://t.me/rj_pritish" target="_blank">Telegram</ListGroup.Item>
              <ListGroup.Item>Reddit</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <style>
        {`
          #ab-img {
            width: 350px;
            height: 350px;
          }
          
          h1 {
            font-size: 50px;
            font-weight: bold;
          }

          .lead {
            font-size: 24px;
            line-height: 1.5;
          }

          .pink {
            color: var(--secondary-color);
          }
          
          .card-img-top {
            height: 250px;
            object-fit: cover;
          }

          .card {
            height: 590px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
          }

          .card-title {
            color: var(--secondary-color);
            font-size: 24px;
            font-weight: bold;
          }
          

          .card-header {
            color: var(--secondary-color);
            font-size: 22px;
            font-weight: bold;
          }
          
          .card-text {
            font-size: 18px;
            line-height: 1.5;
          }
          
          .card:hover {
            background-color: var(--primary-color);
            --bs-card-color: var(--tertiary-color);
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          }

          .card:hover .list-group-item {
            color: white;
          }

          .list-group {
            overflow: auto;
          }


          .list-group-item {
            background-color: rgba(256, 256, 256, 0.0);
          }

          .list-group-item:hover {
            background-color: var(--secondary-color);
            color: white;
            font-weight: bold;
          }

          .list-group-item.active {
            z-index: 0;
            color: var(--primary-color);
            background-color: rgba(256, 256, 256, 0.0);
            border-color: rgb(222, 226, 230);
          }

          .list-group-item.active:hover {
            background-color: var(--secondary-color);
          }

          .btn-secondary {
            font-size: 18px;
            padding: 6px 12px;
            margin: 0;
          }

          @media (max-width: 767px) {
            .image-p {
              display: flex;
              justify-content: center;
            }
          }

           @media (max-width: 1107px) {
            .card {
              height: 610px;
            }
          }
        `}
      </style>
    </Container>
  );
}

export default About;
