import 'server-only';
import { notFound } from 'next/navigation';

/** The menu entries that are switched on. Items without the flag count as on. */
export const enabledNav = (nav = []) => nav.filter((item) => item.enabled !== false);

/**
 * Call at the top of a page: a page switched off in Admin > Site > Navigation
 * answers 404, exactly as if it did not exist. A page with no menu entry at all
 * stays reachable, as it always was.
 */
export function requirePage(site, key) {
  const item = (site.nav || []).find((entry) => entry.key === key);
  if (item && item.enabled === false) notFound();
}
