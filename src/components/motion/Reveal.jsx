'use client';

import * as m from 'motion/react-m';

/**
 * Scroll reveal primitives.
 *
 * Framer Motion is now published as `motion`; importing from `framer-motion` is
 * not supported alongside it. These use the `m` component from
 * `motion/react-m` rather than `motion.*`, because MotionProvider loads
 * features through LazyMotion — that keeps roughly 30kB of unused library out
 * of the bundle, and its `strict` flag makes a stray `motion.*` throw.
 *
 * Reduced motion is handled once, globally, by `<MotionConfig reducedMotion="user">`
 * in the site layout: it drops transform/layout animation while leaving opacity
 * alone, so a reveal degrades to a plain fade rather than disappearing.
 *
 * Every animated wrapper carries `data-reveal`, which the `<noscript>` block in
 * the root layout targets to force the finished state. Without that, the
 * server-rendered `opacity: 0` would leave the whole page invisible to a
 * visitor whose JS never runs.
 */

// Matches --ease in styles/index.css so JS and CSS motion agree.
const EASE = [0.2, 0, 0.2, 1];
const DURATION = 0.5;

/** One element that fades and rises into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 16,
  once = true,
  amount = 0.2,
  ...rest
}) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, transform: `translateY(${distance}px)` }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration: DURATION, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

/**
 * Wraps a list so its children arrive one after another. Pair with
 * <RevealItem> — the parent drives the timing, the children carry the motion.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  delayChildren = 0,
  once = true,
  amount = 0.15,
  ...rest
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

/** A child of <RevealGroup>. */
export function RevealItem({ children, className, distance = 16, ...rest }) {
  return (
    <m.div
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, transform: `translateY(${distance}px)` },
        shown: { opacity: 1, transform: 'translateY(0px)' },
      }}
      transition={{ duration: DURATION, ease: EASE }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
