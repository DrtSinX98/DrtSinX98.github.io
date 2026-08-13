/**
 * Inline script that applies `data-bs-theme` before first paint so the page
 * never flashes the wrong theme. Kept in sync with `ThemeProvider`'s effect:
 * a manual choice is remembered for the session, otherwise follow the clock.
 */
export function themeInitScript(dayStartHour = 6, nightStartHour = 18) {
  return `(function(){try{var m=sessionStorage.getItem('darkModeManual');var h=new Date().getHours();var t=m||((h>=${dayStartHour}&&h<${nightStartHour})?'light':'dark');document.documentElement.setAttribute('data-bs-theme',t);}catch(e){document.documentElement.setAttribute('data-bs-theme','light');}})();`;
}
