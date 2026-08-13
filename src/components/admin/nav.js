/**
 * Admin menu: one entry per site page, with a sub-entry per editable component.
 * Sub-entries that carry `?section=` switch tabs within a page; the rest are
 * their own routes.
 */
export const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: 'gauge' },
  {
    href: '/admin/site',
    label: 'Site',
    icon: 'globe',
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
    children: [
      { label: 'Intro', href: '/admin/about?section=intro' },
      { label: 'Journey', href: '/admin/about?section=journey' },
      { label: 'Tech stack', href: '/admin/about?section=skills' },
      { label: 'Projects', href: '/admin/about?section=projects' },
      { label: 'Achievements', href: '/admin/about?section=achievements' },
      { label: 'Interests & socials', href: '/admin/about?section=highlights' },
    ],
  },
  {
    href: '/admin/cv',
    label: 'CV',
    icon: 'filePdf',
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
    children: [
      { label: 'Intro', href: '/admin/lectures?section=intro' },
      { label: 'Modules', href: '/admin/lectures?section=modules' },
    ],
  },
  {
    href: '/admin/contact',
    label: 'Contact',
    icon: 'message',
    children: [
      { label: 'Intro', href: '/admin/contact?section=intro' },
      { label: 'Contact cards', href: '/admin/contact?section=cards' },
      { label: 'Message form', href: '/admin/contact?section=form' },
    ],
  },
  { href: '/admin/messages', label: 'Messages', icon: 'envelope' },
  { href: '/admin/settings', label: 'Settings', icon: 'gear' },
];
