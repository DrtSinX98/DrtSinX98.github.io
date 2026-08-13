'use client';

import React, { useState } from "react";
import { Col, Image, Container, Row, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RichText from "./RichText";
import { getIcon } from "@/lib/icons";

function Contact({ content = {} }) {
  const form = content.form || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Request failed');
      setMessage(form.successMessage || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      setMessage(form.errorMessage || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <Container>
      <Row>
      <Col lg={4} className="image-p">
      <div id="ct-img">
      <Image src={content.image} alt="contact-pic" className="mb-4" fluid/>
      </div>
      </Col>
      <Col>
      <h1><RichText value={content.heading} /></h1>
      <p className="lead">
        <RichText value={content.leadPrefix} />
        <Button variant="secondary" size="sm" href={`mailto:${content.email}`} target="_blank">{content.emailButtonLabel}</Button>
        {content.leadSuffix}
      </p>
      </Col>
      </Row>
      <hr className="my-4" />
      <Row className="g-4">
      {(content.cards || []).map((card, index) => (
        <Col lg={4} md={6} key={index}>
        <a href={card.href} target="_blank" rel="noreferrer" className="text-decoration-none">
        <Card className="h-100 text-center contact-card border-0">
          <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
            <div className="icon-wrapper mb-3">
              <FontAwesomeIcon icon={getIcon(card.icon)} size="2x" />
            </div>
            <Card.Title className ="pink fw-bold">{card.title}</Card.Title>
            <Card.Text className="text-muted small">
              {card.highlight
                ? card.text.split(card.highlight).flatMap((chunk, i, arr) =>
                    i < arr.length - 1
                      ? [chunk, <span className="pink" key={i}>{card.highlight}</span>]
                      : [chunk],
                  )
                : card.text}
            </Card.Text>
          </Card.Body>
        </Card>
        </a>
        </Col>
      ))}
      </Row>

      {form.enabled !== false && (
        <>
          <hr className="my-5" />
          <Row className="mb-5 pb-4">
            <Col>
              <h2 className="place mb-4 fw-bold" style={{ fontSize: '32px' }}>{form.title}</h2>
              <div className="glass-card p-4">
                <Form id="contact-form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">{form.nameLabel}</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={form.namePlaceholder}
                      required
                      className="contact-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">{form.emailLabel}</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={form.emailPlaceholder}
                      required
                      className="contact-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">{form.messageLabel}</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={form.messagePlaceholder}
                      required
                      className="contact-input"
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button variant="primary" type="submit" className="px-5 py-2 fw-bold" disabled={isSubmitting}>
                      {isSubmitting ? form.submittingLabel : form.submitLabel}
                    </Button>
                  </div>
                </Form>
                {message && <p className="pink text-center mt-3 mb-0 fw-bold">{message}</p>}
              </div>
            </Col>
          </Row>
        </>
      )}
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

          .place {
            color: var(--tertiary-color) !important;
            text-align: center;
            background-color: var(--secondary-color);
            border-radius: var(--bs-border-radius);
            padding: 5px;
            margin-top: 10px;
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

          .contact-input {
            background-color: var(--bs-body-bg) !important;
            color: var(--bs-body-color) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
          }

          .contact-input:focus {
            box-shadow: 0 0 0 0.25rem rgba(201, 21, 116, 0.25) !important;
            border-color: var(--secondary-color) !important;
          }

          .contact-input::placeholder {
            color: #888 !important;
          }
        `}
      </style>
    </Container>
  );
}

export default Contact;
