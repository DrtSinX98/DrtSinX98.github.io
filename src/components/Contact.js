import React from "react";
import { Col, Image , Container, Row } from "react-bootstrap";
import ct from "../images/ct.svg";

function Contact() {
  return (
    <Container>
      <Row>
      <Col lg={4} className="image-p">
      <div id="ct-img">
      <Image src={ct} alt="contact-pic" className="mb-4" fluid/>
      </div>
      </Col>
      <Col>
      <h1>Reach out <span className="pink">to me!</span></h1>
      <p className="lead">I'm available on Linkedin, Twitter, Telegram, Whatsapp and <span className="pink">Reddit</span>Not on Facebook and Instagram though because of a certain <span className="pink">Lizard</span> XD. <br/>Below you can find my contact details, feel free to reach out.</p>
      </Col>
      </Row>
      <hr className="my-4" />
      <style>
        {`
          #ct-img {
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

export default Contact;
