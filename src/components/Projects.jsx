import React from "react";
import { Col, Image , Container, Row } from "react-bootstrap";
import pr from "../images/pr.svg";
import AndroidProjects from "./AndroidProjects";
import DesignProjects from "./DesignProjects";
import CompProjects from "./CompProjects";

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
      <AndroidProjects/>
      </Col>
      <Col lg={4} md={6} className="mb-4">
      <DesignProjects/>
      </Col>
      <Col lg={4} md={6} className="mb-4">
      <CompProjects/>
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
            color: var(--secondary-color);
          }

          @media (max-width: 767px) {
            .image-p {
              display: flex;
              justify-content: center;
            }
          }

          .card {
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
            font-size: 18px;
            padding: 6px 12px;
            margin: 0;
          }
        `}
      </style>
    </Container>
  );
}

export default Projects;
