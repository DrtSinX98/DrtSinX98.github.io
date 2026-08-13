import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TerminalCard from "./TerminalCard";
import Rimage from "./Rimage";
import Bio from "./Bio";
import Buttons from "./Buttons";

function Home({ content = {}, serverHour }) {
  return (
    <Container>
      <Row>
        <Rimage light={content.profileImageLight} dark={content.profileImageDark} />
        <Col lg={8}>
          <Bio content={content} serverHour={serverHour} />
          <Buttons buttons={content.buttons || []} />
        </Col>
      </Row>
      <hr className="my-4" />
      <Row>
        <TerminalCard content={content.terminal || {}} />
      </Row>
    </Container>
  );
}

export default Home;
