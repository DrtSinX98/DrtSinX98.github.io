import React from "react";
import { Col, Image , Container, Row } from "react-bootstrap";
import ab from "../images/ab.svg";

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
      <p className="lead">I'm a guy who likes to learn new things and explore different fields. <br/>I'm <span className="pink">currently</span> a student as well as a teacher.<br/>If you are interested then you can find more details about me down below.</p>
      </Col>
      </Row>
      <hr className="my-4" />
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
            color: #c91574;
          }

          @media (max-width: 767px) {
            .image-p {
              display: flex;
              justify-content: center;
            }
          }
        `}
      </style>
    </Container>
  );
}

export default About;
