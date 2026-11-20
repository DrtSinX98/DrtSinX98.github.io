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
