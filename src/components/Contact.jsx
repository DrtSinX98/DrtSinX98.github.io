import React from "react";
import { Col, Image , Container, Row, Card, Button } from "react-bootstrap";

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
      <Row>
      <Col lg={4} md={6} className="mb-4">
      <a href="https://www.linkedin.com/in/pritish-joshi-b870bb242" target="_blank" rel="noreferrer">
      <Card>
        <Card.Body>
          <Card.Title className ="pink">LinkedIn</Card.Title>
          <Card.Text>
            Connect with me on LinkedIn
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6} className="mb-4">
      <a href="https://x.com/rjpritish" target="_blank" rel="noreferrer">
      <Card>
        <Card.Body>
          <Card.Title className ="pink">Twitter</Card.Title>
          <Card.Text>
            Follow me on Twitter (<span className="pink">X</span>)
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6} className="mb-4">
      <a href="https://t.me/rj_pritish" target="_blank" rel="noreferrer">
      <Card>
        <Card.Body>
          <Card.Title className ="pink">Telegram</Card.Title>
          <Card.Text>
            Chat with me on Telegram
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6} className="mb-4">
      <a href="https://whatsapp.com/channel/0029VaGxfUGDp2QAuZaTqp1G" target="_blank" rel="noreferrer">
      <Card>
        <Card.Body>
          <Card.Title className ="pink">Whatsapp</Card.Title>
          <Card.Text>
            Join me on Whatsapp
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6} className="mb-4">
      <a href="https://www.instagram.com/the_istreet" target="_blank" rel="noreferrer">
      <Card>
        <Card.Body>
          <Card.Title className ="pink">Instagram</Card.Title>
          <Card.Text>
            Join my channel on Instagram
          </Card.Text>
        </Card.Body>
      </Card>
      </a>
      </Col>
      <Col lg={4} md={6} className="mb-4">
      <a href="https://discordapp.com/users/rjpritish_08301" target="_blank" rel="noreferrer">
      <Card>
        <Card.Body>
          <Card.Title className ="pink">Discord</Card.Title>
          <Card.Text>
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
          
          .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
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
            background-color: var(--primary-color);
            --bs-card-color: var(--tertiary-color);
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
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
