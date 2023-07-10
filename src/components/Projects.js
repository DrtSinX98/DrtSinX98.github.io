import React from "react";
import { Button, Card, Col, Image , Container, Row } from "react-bootstrap";
import pr from "../images/pr.svg";
import and from "../images/and.png";
import che from "../images/che.png";
import edu from "../images/edu.png";

function Projects() {
  return (
    <Container>
      <Row>
      <Col lg={4} className="image-p">
      <div id="pr-img">
      <Image src={pr} alt="project-pic" className="mb-4" fluid/>
      </div>
      </Col>
      <Col>
      <h1>Welcome to my <span className="pink">Projects!</span></h1>
      <p className="lead">Over the years I've worked on many projects in different fields.<br/>Like Android ROMs and Kernels, UI designing, <span className="pink">Chemistry</span>, and Social Entrepreneurship. <br/> Below you can find some of them. <span className="pink">:)</span></p>
      </Col>
      </Row>
      <hr className="my-4" />
      <Row>
      <Col lg={4} md={6} className="mb-4">
      <Card>
        <Card.Img variant="top" src={and} alt="Card cap" />
        <Card.Body>
          <Card.Title>Android</Card.Title>
          <ul className="card-text">
            <li>Android ROMs</li>
            <li>Android Kernels</li>
            <li>Android Devices</li>
            <li>Web Apps</li>
          </ul>
          <Button variant="secondary" size="sm" href="#">
            More..
          </Button>
        </Card.Body>
      </Card>
      </Col>
      <Col lg={4} md={6} className="mb-4">
      <Card>
        <Card.Img variant="top" src={che} alt="Card cap" />
        <Card.Body>
          <Card.Title>Chemistry</Card.Title>
          <ul className="card-text">
            <li>Proteins</li>
            <li>Ligands</li>
            <li>Machine Learning</li>
            <li>Molecular Dynamics</li>
          </ul>
          <Button variant="secondary" size="sm" href="#">
            More..
          </Button>
        </Card.Body>
      </Card>
      </Col>
      <Col lg={4} md={6} className="mb-4">
      <Card>
        <Card.Img variant="top" src={edu} alt="Card cap" />
        <Card.Body>
          <Card.Title>Education</Card.Title>
          <ul className="card-text">
            <li>Chemistry Teacher (IIT-JEE)</li>
            <li>Physics Teacher (XI-XII)</li>
            <li>Math Teacher (VIII-XII)</li>
            <li>Teaching Associate (KJ)</li>
          </ul>
          <Button variant="secondary" size="sm" href="#">
            More..
          </Button>
        </Card.Body>
      </Card>
      </Col>
      </Row>
      <style>
        {`
          #pr-img {
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
            color: #c91574;
          }

          @media (max-width: 767px) {
            .image-p {
              display: flex;
              justify-content: center;
            }
          }

          .card {
            background-color: #eeeafc;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
          }
          
          .card-img-top {
            height: 250px;
            object-fit: cover;
          }
          
          .card-title {
            font-size: 24px;
            font-weight: bold;
          }
          
          .card-text {
            font-size: 18px;
            line-height: 1.5;
          }
          
          .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          }
          
          .btn-secondary {
            background-color: #c91574;
            font-size: 18px;
            padding: 6px 12px;
            margin: 0;
          }
          
          .btn-secondary:hover {
            background-color: #301934;
            cursor: pointer;
          }
        `}
      </style>
    </Container>
  );
}

export default Projects;
