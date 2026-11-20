/**
 * Brings a saved `site` document up to date with pages added since it was
 * written — in memory, when it is read, so no database edit is needed and the
 * next admin save simply persists the result.
 *
 * `navVersion` records how far a document has been brought. A document without
 * it predates version 2, which added the Projects page and switched Lectures
 * off. Once it is stamped, later deletions in the admin are respected: a page
 * the owner removed from the menu is not put back.
 */
const CURRENT_NAV_VERSION = 2;

export function upgradeSite(site) {
  // No saved menu: the defaults (already current) supply it.
  if (!site || !Array.isArray(site.nav) || (site.navVersion ?? 1) >= CURRENT_NAV_VERSION) return site;

  let nav = site.nav;

  if (!nav.some((item) => item.key === 'projects' || item.href === '/projects')) {
    const item = { key: 'projects', label: 'Projects', href: '/projects', icon: 'projectDiagram' };
    const after = nav.findIndex((i) => i.key === 'about');
    nav = after === -1 ? [...nav, item] : [...nav.slice(0, after + 1), item, ...nav.slice(after + 1)];
  }

  // Lectures is off for now; only touch it if no one has made a choice yet.
  nav = nav.map((item) => (item.key === 'lectures' && item.enabled === undefined ? { ...item, enabled: false } : item));

  return { ...site, nav, navVersion: CURRENT_NAV_VERSION };
}
