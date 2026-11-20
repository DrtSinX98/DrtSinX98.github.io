'use client';

import React from "react";
import { Col, Container, Row, Card, ListGroup, Tab } from "react-bootstrap";
import RichText from "./RichText";
import Illustration from "./Illustration";
import { Reveal } from "./motion/Reveal";

function Lectures({ content = {}, illustration = null, animateIllustration = true }) {
    const modules = content.modules || [];

    return (
        <Container>
            <Row>
                <Col lg={4} className="image-p">
                    <div className="page-illustration">
                    <Illustration
                      illustration={illustration}
                      src={content.image}
                      alt="about-pic"
                      className="mb-4"
                      animate={animateIllustration}
                    />
                    </div>
                </Col>
                <Col>
                    <h1><RichText value={content.heading} /></h1>
                    <p className="lead"><RichText value={content.lead} /></p>
                </Col>
            </Row>
            <hr className="my-4" />

            {modules.map((mod, mi) => {
                const topics = mod.topics || [];
                const firstKey = `#link${mi + 1}-1`;
                return (
                    <Row key={mi}>
                        <Col lg={12} className="mb-4">
                            <Reveal>
                            <Card className="lecture-card">
                                <Card.Header>{mod.header}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{mod.title}</Card.Title>
                                </Card.Body>
                                <Tab.Container id={`list-group-${mi + 1}`} defaultActiveKey={firstKey}>
                                    <Row>
                                        <Col xs={mod.split ? 6 : undefined}>
                                            <ListGroup as="ol" numbered>
                                                {topics.map((topic, ti) => (
                                                    <ListGroup.Item as="li" action href={`#link${mi + 1}-${ti + 1}`} key={ti}>
                                                        {topic.title}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Col>
                                        {mod.split && (
                                            <Col xs={6}>
                                                <Tab.Content>
                                                    {topics.map((topic, ti) => (
                                                        (topic.subtopics || []).length > 0 && (
                                                            <Tab.Pane eventKey={`#link${mi + 1}-${ti + 1}`} key={ti}>
                                                                <ListGroup>
                                                                    {topic.subtopics.map((sub, si) => (
                                                                        <ListGroup.Item key={si}>{sub}</ListGroup.Item>
                                                                    ))}
                                                                </ListGroup>
                                                            </Tab.Pane>
                                                        )
                                                    ))}
                                                </Tab.Content>
                                            </Col>
                                        )}
                                    </Row>
                                </Tab.Container>
                            </Card>
                            </Reveal>
                        </Col>
                    </Row>
                );
            })}

        </Container>
    );
}

export default Lectures;
