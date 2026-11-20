'use client';

import React, { useState } from "react";
import { Col, Container, Row, Card, Button, Form } from "react-bootstrap";
import RichText from "./RichText";
import Illustration from "./Illustration";
import { Reveal, RevealGroup, RevealItem } from "./motion/Reveal";
import Icon from "./Icon";

function Contact({ content = {}, illustration = null, animateIllustration = true }) {
  const form = content.form || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [message, setMessage] = useState('');
  // Success and failure used to render identically in pink, so neither sighted
  // nor screen-reader users could tell which had happened.
  const [status, setStatus] = useState('');
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
      setStatus('success');
      setMessage(form.successMessage || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      setStatus('error');
      setMessage(form.errorMessage || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setMessage('');
        setStatus('');
      }, 5000);
    }
  };

  return (
    <Container>
      <Row>
      <Col lg={4} className="image-p">
      <div className="page-illustration">
      <Illustration
        illustration={illustration}
        src={content.image}
        alt="contact-pic"
        className="mb-4"
        animate={animateIllustration}
      />
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
      <RevealGroup>
      <Row className="g-4">
      {(content.cards || []).map((card, index) => (
        <Col lg={4} md={6} key={index}>
        <RevealItem className="h-100">
        <a href={card.href} target="_blank" rel="noreferrer" className="text-decoration-none">
        <Card className="h-100 text-center contact-card border-0">
          <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
            <div className="icon-wrapper mb-3">
              <Icon name={card.icon} size="2x" />
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
        </RevealItem>
        </Col>
      ))}
      </Row>
      </RevealGroup>

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
                {/* Rendered unconditionally so the live region already exists
                    when the text arrives — a region added at the same moment
                    as its content is unreliably announced. */}
                <p
                  role="status"
                  aria-live="polite"
                  className={`form-status text-center mt-3 mb-0 fw-bold${status ? ` is-${status}` : ''}`}
                >
                  {message}
                </p>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Contact;
