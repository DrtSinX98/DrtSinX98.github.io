import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "./Cards";
import Rimage from "./Rimage";
import Bio from "./Bio";
import Buttons from "./Buttons";

function Home() {
  return (
    <Container>
      <Row>
        <Rimage />
        <Col lg={8}>
          <Bio />
          <Buttons />
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
