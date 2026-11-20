import React from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import Icon from './Icon';

const STATUS = {
  active: 'Active',
  maintained: 'Maintained',
  completed: 'Completed',
  archived: 'Archived',
};

// Links come from the admin; only ordinary web, mail and on-site links are used.
const safeHref = (href) => (/^(https?:\/\/|mailto:|\/)/i.test(String(href || '').trim()) ? String(href).trim() : null);

/**
 * One project. The title is the heading; role, year and status sit around it as
 * quiet metadata, tags describe the stack, and each link is its own labelled
 * button (a card with one big link can only point one place, and projects
 * usually have a repo, a write-up and a page).
 */
export default function ProjectCard({ project, categoryTitle }) {
  const { title, summary, role, year, status, icon, image, tags = [], links = [], featured } = project;
  const usable = links.map((link) => ({ ...link, href: safeHref(link.href) })).filter((link) => link.href);

  return (
    <article className={`vx-card vx-pj${featured ? ' is-featured' : ''}`}>
      {/* A plain <img>: the cover is whatever URL the admin pasted or uploaded, which next/image would need allow-listing per host. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {image ? <img className="vx-pj__cover" src={image} alt="" loading="lazy" decoding="async" /> : null}

      <div className="vx-pj__top">
        <span className="vx-pj__icon">
          <Icon name={icon || 'code'} size="lg" />
        </span>
        <span className="vx-pj__meta">
          {categoryTitle ? <span className="vx-mono-label">{categoryTitle}</span> : null}
          {year ? <span className="vx-pj__year">{year}</span> : null}
        </span>
        {featured ? (
          <span className="vx-pj__flag">
            <Star size={14} aria-hidden="true" /> Featured
          </span>
        ) : null}
      </div>

      <h3 className="vx-pj__title">{title}</h3>
      {role ? <p className="vx-pj__role">{role}</p> : null}
      {summary ? <p className="vx-pj__summary">{summary}</p> : null}

      {STATUS[status] ? (
        <p className={`vx-pj__status is-${status}`}>
          <span aria-hidden="true" /> {STATUS[status]}
        </p>
      ) : null}

      {tags.length > 0 && (
        <ul className="vx-tags vx-pj__tags">
          {tags.map((tag, i) => (
            <li className="vx-tag" key={i}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      {usable.length > 0 && (
        <div className="vx-pj__links">
          {usable.map((link, i) => (
            <a className="vx-pill vx-pj__link" href={link.href} target="_blank" rel="noreferrer" key={i}>
              {link.label || 'Open'}
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="vx-sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
