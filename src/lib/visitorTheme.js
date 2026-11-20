import 'server-only';
import { cookies } from 'next/headers';
import { VISITOR_COOKIE, presetTheme } from './themePresets';

/**
 * The theme this visitor sees: their own template if they picked one (the
 * easter egg on the light/dark switch), otherwise the one the site owner saved.
 *
 * The choice lives only in a cookie in the visitor's browser, so it never
 * touches the saved theme and never affects anyone else. Only a template key is
 * accepted — an unknown or tampered value is ignored — and the colours always
 * come from lib/themePresets.js, not from the cookie.
 *
 * `visitor: true` marks an overridden theme; lib/portrait.js uses it to name the
 * template in the artwork URLs.
 */
export async function visitorTheme(siteTheme = {}) {
  const key = (await cookies()).get(VISITOR_COOKIE)?.value;
  const colours = presetTheme(key);
  return colours ? { ...siteTheme, ...colours, preset: key, visitor: true } : siteTheme;
}
