/**
 * Page identity: every page is an "element" on the periodic table, echoing the
 * Pr-59 tile in the logo. The number is its place in the site, the symbol is
 * its tile. Used by the eyebrow tile on each page hero and by the home page's
 * explore list, so the motif stays consistent.
 */
export const PAGE_META = {
  // Home has no tile: it is the front door, not one of the numbered pages.
  about: { num: '01', code: 'Ab', label: 'About' },
  projects: { num: '02', code: 'Pj', label: 'Projects' },
  gallery: { num: '03', code: 'Gl', label: 'Gallery' },
  lectures: { num: '04', code: 'Lc', label: 'Lectures' },
  contact: { num: '05', code: 'Ct', label: 'Contact' },
};

/** Pages that have an illustration (served recoloured by api/theme-art). The rest get an icon. */
export const PAGE_ART = {
  about: '/illustrations/about.svg',
  projects: '/illustrations/projects.svg',
  gallery: '/illustrations/gallery.svg',
  lectures: '/illustrations/lectures.svg',
  contact: '/illustrations/contact.svg',
};
