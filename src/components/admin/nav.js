import { PAGE_META } from '@/lib/pages';

/**
 * Admin menu: one entry per site page, with a sub-entry per editable component.
 * Sub-entries that carry `?section=` switch tabs within a page; the rest are
 * their own routes.
 *
 * `tile` is the section's periodic-table tile (see lib/pages.js). Pages that
 * exist on the public site reuse that site's number and symbol, so "Ab" means
 * About in both places; admin-only sections get a symbol and no number.
 */
const page = (key) => ({ num: PAGE_META[key].num, code: PAGE_META[key].code });

const DASHBOARD = { href: '/admin', label: 'Dashboard', icon: 'gauge', tile: { code: 'Db' } };

const PAGES = [
  {
    href: '/admin/site',
    label: 'Site',
    icon: 'globe',
    tile: { code: 'St' },
    children: [
      { label: 'General', href: '/admin/site?section=general' },
      { label: 'Navigation', href: '/admin/site?section=navigation' },
      { label: 'Appearance', href: '/admin/site?section=appearance' },
    ],
  },
  {
    href: '/admin/home',
    label: 'Home',
    icon: 'house',
    tile: { code: 'Hm' },
    children: [
      { label: 'Bio & greeting', href: '/admin/home?section=bio' },
      { label: 'Profile image', href: '/admin/home?section=profile' },
      { label: 'Social buttons', href: '/admin/home?section=buttons' },
      { label: 'Terminal card', href: '/admin/home?section=terminal' },
    ],
  },
  {
    href: '/admin/about',
    label: 'About',
    icon: 'user',
    tile: page('about'),
    children: [
      { label: 'Intro', href: '/admin/about?section=intro' },
      { label: 'Journey', href: '/admin/about?section=journey' },
      { label: 'Tech stack', href: '/admin/about?section=skills' },
      { label: 'Achievements', href: '/admin/about?section=achievements' },
      { label: 'Interests & socials', href: '/admin/about?section=highlights' },
    ],
  },
  {
    href: '/admin/projects',
    label: 'Projects',
    icon: 'projectDiagram',
    tile: page('projects'),
    children: [
      { label: 'Intro', href: '/admin/projects?section=intro' },
      { label: 'Areas', href: '/admin/projects?section=areas' },
      { label: 'Projects', href: '/admin/projects?section=projects' },
    ],
  },
  {
    href: '/admin/cv',
    label: 'CV',
    icon: 'filePdf',
    tile: { code: 'Cv' },
    children: [
      { label: 'Header', href: '/admin/cv?section=header' },
      { label: 'Summary & skills', href: '/admin/cv?section=summary' },
      { label: 'Experience', href: '/admin/cv?section=experience' },
      { label: 'Education', href: '/admin/cv?section=education' },
      { label: 'Publications', href: '/admin/cv?section=publications' },
    ],
  },
  {
    href: '/admin/gallery',
    label: 'Gallery',
    icon: 'images',
    tile: page('gallery'),
    children: [
      { label: 'Intro', href: '/admin/gallery?section=intro' },
      { label: 'Map & labels', href: '/admin/gallery?section=map' },
      { label: 'Countries', href: '/admin/gallery/countries' },
      { label: 'Photos', href: '/admin/gallery/photos' },
    ],
  },
  {
    href: '/admin/lectures',
    label: 'Lectures',
    icon: 'video',
    tile: page('lectures'),
    children: [
      { label: 'Intro', href: '/admin/lectures?section=intro' },
      { label: 'Modules', href: '/admin/lectures?section=modules' },
    ],
  },
  {
    href: '/admin/contact',
    label: 'Contact',
    icon: 'message',
    tile: page('contact'),
    children: [
      { label: 'Intro', href: '/admin/contact?section=intro' },
      { label: 'Contact cards', href: '/admin/contact?section=cards' },
      { label: 'Message form', href: '/admin/contact?section=form' },
    ],
  },
];

const INBOX = [
  { href: '/admin/messages', label: 'Messages', icon: 'envelope', tile: { code: 'Ms' }, badge: 'unread' },
  { href: '/admin/settings', label: 'Settings', icon: 'gear', tile: { code: 'Se' } },
];

/** The sidebar, grouped under mono captions. */
export const ADMIN_NAV_GROUPS = [
  { label: 'Overview', items: [DASHBOARD] },
  { label: 'Pages', items: PAGES },
  { label: 'Inbox & account', items: INBOX },
];

/** Flat list, for anything that just needs every entry (the dashboard). */
export const ADMIN_NAV = ADMIN_NAV_GROUPS.flatMap((group) => group.items);
