// Without the View Transitions API, or for visitors who ask for reduced motion,
// changes are simply instant.
const cannotAnimate = () => !document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Runs `update` (which changes the theme on screen) as a colour wash: the new
 * theme spreads outwards as a circle from `from` — the portrait — until it
 * covers the page. Built on the View Transitions API, so the old and new states
 * are real pictures of the page and nothing has to be animated by hand.
 *
 * Without that API, or for visitors who ask for reduced motion, it just calls
 * `update` and the change is instant. Returns a promise that settles when the
 * wash is over, so the caller can follow it with the next step.
 */
export function morph(update, from, duration = 1400) {
  if (cannotAnimate()) {
    update();
    return Promise.resolve();
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
  return transition.finished.catch(() => {});
}

/**
 * The light/dark switch's own wash, deliberately unlike the colour wash above: the
 * new mode is swept in along a diagonal edge from the top-right corner, where the
 * switch lives, rather than spreading out as a circle from the portrait.
 */
export function sweep(update, duration = 900) {
  if (cannotAnimate()) {
    update();
    return Promise.resolve();
  }

  // The triangle's legs must reach the far corner: width + height is enough.
  const reach = window.innerWidth + window.innerHeight;
  const transition = document.startViewTransition(() => {
    update();
  });
  transition.ready
    .then(() =>
      document.documentElement.animate(
        { clipPath: ['polygon(100% 0, 100% 0, 100% 0)', `polygon(100% 0, calc(100% - ${reach}px) 0, 100% ${reach}px)`] },
        { duration, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
    .catch(() => {});
  return transition.finished.catch(() => {});
}

/** The middle of the portrait if it is on this page, else of `fallback` (the switch). */
export function morphOrigin(fallback) {
  const el = document.querySelector('.vx-blob') || fallback;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}
