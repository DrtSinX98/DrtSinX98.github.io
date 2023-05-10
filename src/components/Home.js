import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Cards from "./Cards";
import pfp from "../images/pfp.jpg";

function Home() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours < 12) {
    timeOfDay = "Ohayou";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "Konnichiwa";
  } else if (hours >= 17 && hours < 21) {
    timeOfDay = "Konbanwa";
  } else {
    timeOfDay = "Oyasumi";
  }
  return (
    <Container>
      <Row>
        <Col lg={4} className="image-p">
          <Image
            src={pfp}
            alt="my-pic"
            className="mb-4"
            roundedCircle
            fluid
          />
        </Col>
        <Col lg={8}>
          <div className="greet">
            <h1>
              <span className="pink">{timeOfDay},</span> I'm Pritish Joshi
            </h1>
          </div>
          <p className="lead">A Tech enthusiast, Chemist, Educator and Coder</p>
          <p className="lead">
            Even though I enjoy coding and techie stuff, I'm currently a
            postgrad student of Chemistry in{" "}
            <span className="pink">IIT Dhanbad</span> with a research project in
            Computational Chemistry and molecular dynamics
          </p>
          <div className="button-container">
            <Button
              variant="primary"
              href="https://github.com/DrtSinX98"
              target="_blank"
            >
              GitHub
            </Button>
            <Button
              variant="primary"
              href="https://twitter.com/rjpritish"
              target="_blank"
            >
              Twitter
            </Button>
            <Button
              variant="primary"
              href="https://linkedin.com/in/pritish-joshi-b870bb242"
              target="_blank"
            >
              LinkedIn
            </Button>
          </div>
        </Col>
      </Row>
      <hr className="my-4" />
      <Row>
        <Cards />
      </Row>
    </Container>
  );
}

export default Home;
