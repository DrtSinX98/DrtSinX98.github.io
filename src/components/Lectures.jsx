'use client';

import React from "react";
import { Col, Container, Row, Card, ListGroup, Tab } from "react-bootstrap";
import RichText from "./RichText";
import Illustration from "./Illustration";

function Lectures({ content = {}, illustration = null, animateIllustration = true }) {
    const modules = content.modules || [];

    return (
        <Container>
            <Row>
                <Col lg={4} className="image-p">
                    <div id="lc-img">
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
                            <Card>
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
                        </Col>
                    </Row>
                );
            })}

            <style>
                {`
                #lc-img {
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



                .card-title {
                    color: var(--secondary-color);
                    font-size: 24px;
                    font-weight: bold;
                }

                .card-header {
                    color: var(--secondary-color);
                    font-size: 22px;
                    font-weight: bold;
                }

                .card-text {
                    font-size: 18px;
                    line-height: 1.5;
                }

                .list-group {
                    overflow: auto;
                }


                .list-group-item {
                    background-color: rgba(256, 256, 256, 0.0);
                    transition: background-color 0.3s ease, color 0.3s ease;
                }

                .list-group-item:hover {
                    background-color: rgba(201 21 116 / 0.8);
                    color: white;
                }

                .list-group-item.active {
                    z-index: 0;
                    color: var(--tertiary-color);
                    background-color: var(--secondary-color);
                    border-color: rgb(222, 226, 230);
                }

                .list-group-item.active:hover {
                    background-color: var(--secondary-color);
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

export default Lectures;
