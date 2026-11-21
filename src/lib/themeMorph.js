/**
 * Runs `update` (which changes the theme on screen) as a colour wash: the new
 * theme spreads outwards as a circle from `from` — the portrait — until it
 * covers the page. Built on the View Transitions API, so the old and new states
 * are real pictures of the page and nothing has to be animated by hand.
 *
 * Without that API, or for visitors who ask for reduced motion, it just calls
 * `update` and the change is instant.
 */
export function morph(update, from, duration = 850) {
  const instant = !document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (instant) {
    update();
    return;
  }

  const { x, y } = from;
  // Far enough to reach the corner of the viewport that is furthest away.
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(() => {
    update();
  });
  transition.ready
    .then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
    .catch(() => {});
}

/** The middle of the portrait if it is on this page, else of `fallback` (the switch). */
export function morphOrigin(fallback) {
  const el = document.querySelector('.vx-blob') || fallback;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}
