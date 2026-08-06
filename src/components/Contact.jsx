import React from "react";
import { Col, Image , Container, Row, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";


function Contact() {
  return (
    <Container>
      <Row>
      <Col lg={4} className="image-p">
      <div id="ct-img">
      <Image src="https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/ct.svg" alt="contact-pic" className="mb-4" fluid/>
      </div>
      </Col>
      <Col>
      <h1>Reach out <span className="pink">to me!</span></h1>
      <p className="lead">I'm available on <span className="pink">Linkedin</span>, Twitter, Telegram, Whatsapp, Discord, <span className="pink">Reddit</span> and Instagram. <br/>You can <Button variant="secondary" size="sm" href="mailto:rjpritish@gmail.com" target="_blank">E-Mail</Button> me directly or find my contact details below, feel free to reach out.</p>
      </Col>
      </Row>
      <hr className="my-4" />
      <Row className="g-4">
      <Col lg={4} md={6}>
      <a href="https://www.linkedin.com/in/pritish-joshi-b870bb242" target="_blank" rel="noreferrer" className="text-decoration-none">
      <Card className="h-100 text-center contact-card border-0">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
          <div className="icon-wrapper mb-3">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </div>
          <Card.Title className ="pink fw-bold">LinkedIn</Card.Title>
          <Card.Text className="text-muted small">
            Connect with me on LinkedIn
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6}>
      <a href="https://x.com/rjpritish" target="_blank" rel="noreferrer" className="text-decoration-none">
      <Card className="h-100 text-center contact-card border-0">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
          <div className="icon-wrapper mb-3">
            <FontAwesomeIcon icon={faXTwitter} size="2x" />
          </div>
          <Card.Title className ="pink fw-bold">Twitter</Card.Title>
          <Card.Text className="text-muted small">
            Follow me on Twitter (<span className="pink">X</span>)
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6}>
      <a href="https://t.me/rj_pritish" target="_blank" rel="noreferrer" className="text-decoration-none">
      <Card className="h-100 text-center contact-card border-0">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
          <div className="icon-wrapper mb-3">
            <FontAwesomeIcon icon={faTelegram} size="2x" />
          </div>
          <Card.Title className ="pink fw-bold">Telegram</Card.Title>
          <Card.Text className="text-muted small">
            Chat with me on Telegram
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6}>
      <a href="https://whatsapp.com/channel/0029VaGxfUGDp2QAuZaTqp1G" target="_blank" rel="noreferrer" className="text-decoration-none">
      <Card className="h-100 text-center contact-card border-0">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
          <div className="icon-wrapper mb-3">
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </div>
          <Card.Title className ="pink fw-bold">Whatsapp</Card.Title>
          <Card.Text className="text-muted small">
            Join me on Whatsapp
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6}>
      <a href="https://www.instagram.com/the_istreet" target="_blank" rel="noreferrer" className="text-decoration-none">
      <Card className="h-100 text-center contact-card border-0">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
          <div className="icon-wrapper mb-3">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </div>
          <Card.Title className ="pink fw-bold">Instagram</Card.Title>
          <Card.Text className="text-muted small">
            Join my channel on Instagram
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6}>
      <a href="https://discordapp.com/users/rjpritish_08301" target="_blank" rel="noreferrer" className="text-decoration-none">
      <Card className="h-100 text-center contact-card border-0">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
          <div className="icon-wrapper mb-3">
            <FontAwesomeIcon icon={faDiscord} size="2x" />
          </div>
          <Card.Title className ="pink fw-bold">Discord</Card.Title>
          <Card.Text className="text-muted small">
            Message me on Discord
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      </Row>
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
            color: var(--secondary-color);
          }
          
          .contact-card {
            background-color: var(--bs-card-bg);
            transition: all 0.3s ease;
          }

          .contact-card:hover .icon-wrapper {
            transform: scale(1.1);
            color: var(--secondary-color);
          }

          .icon-wrapper {
            color: var(--bs-body-color);
            transition: all 0.3s ease;
          }

          .card-title {
            font-size: 22px;
            font-weight: bold;
          }
          
          .card-text {
            font-size: 16px;
            line-height: 1.5;
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
