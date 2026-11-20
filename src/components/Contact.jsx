'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Send } from 'lucide-react';
import RichText from './RichText';
import Icon from './Icon';
import PageHero from './ui/PageHero';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

/** Wraps every occurrence of `highlight` in the accent colour. */
function highlighted(text, highlight) {
  if (!highlight) return text;
  return text.split(highlight).flatMap((chunk, i, arr) =>
    i < arr.length - 1 ? [chunk, <span className="pink" key={i}>{highlight}</span>] : [chunk],
  );
}

function Contact({ content = {}, illustration = null, animateIllustration = true }) {
  const form = content.form || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
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
      [name]: value,
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
    <>
      <PageHero
        page="contact"
        label="Contact"
        heading={content.heading}
        image={content.image}
        illustration={illustration}
        alt="Illustration: a person checking notifications on a park bench"
        animate={animateIllustration}
        lead={
          <>
            <RichText value={content.leadPrefix} />
            <a className="vx-btn vx-btn--soft vx-btn--sm" href={`mailto:${content.email}`}>
              <Icon name="envelope" /> {content.emailButtonLabel}
            </a>
            {content.leadSuffix}
          </>
        }
      />

      <div className="vx-wrap vx-contact">
        <RevealGroup className="vx-channels" role="list" stagger={0.06}>
          {(content.cards || []).map((card, index) => (
            <RevealItem key={index} role="listitem">
              <a href={card.href} target="_blank" rel="noreferrer" className="vx-channel">
                <span className="vx-iconbox">
                  <Icon name={card.icon} size="lg" />
                </span>
                <span className="vx-channel__text">
                  <span className="vx-channel__title">{card.title}</span>
                  <span className="vx-channel__desc">{highlighted(card.text, card.highlight)}</span>
                </span>
                <ArrowUpRight className="vx-channel__arrow" size={20} aria-hidden="true" />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        {form.enabled !== false && (
          <Reveal className="vx-card vx-card--pad vx-formcard">
            <h2 className="vx-formcard__title">{form.title}</h2>

            <form id="contact-form" className="vx-form" onSubmit={handleSubmit}>
              <div className="vx-field">
                <label htmlFor="contact-name">{form.nameLabel}</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={form.namePlaceholder}
                  required
                />
              </div>
              <div className="vx-field">
                <label htmlFor="contact-email">{form.emailLabel}</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={form.emailPlaceholder}
                  required
                />
              </div>
              <div className="vx-field">
                <label htmlFor="contact-message">{form.messageLabel}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={form.messagePlaceholder}
                  required
                />
              </div>

              <button type="submit" className="vx-btn vx-btn--primary" disabled={isSubmitting}>
                <Send size={16} aria-hidden="true" />
                {isSubmitting ? form.submittingLabel : form.submitLabel}
              </button>

              {/* Rendered unconditionally so the live region already exists
                  when the text arrives — a region added at the same moment as
                  its content is unreliably announced. */}
              <p
                role="status"
                aria-live="polite"
                className={`form-status${status ? ` is-${status}` : ''}`}
              >
                {message}
              </p>
            </form>
          </Reveal>
        )}
      </div>
    </>
  );
}

export default Contact;
