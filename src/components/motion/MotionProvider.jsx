'use client';

import { MotionConfig, LazyMotion, domAnimation } from 'motion/react';

/**
 * `reducedMotion="user"` makes every Motion component below this point follow
 * the OS setting without each one checking for itself: transform and layout
 * animation is dropped, opacity and colour still animate. A reveal therefore
 * degrades to a fade rather than vanishing, which is what the guidance asks
 * for — dampen spatial movement, keep the element in its final state.
 */
export default function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* LazyMotion + the `m` component ship only the animation/variant/gesture
          feature set instead of the whole library. Everything below must use
          `m.*`, never `motion.*`, or the features won't be loaded for it. */}
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
