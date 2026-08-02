/**
 * Canonical motion vocabulary for the site — import these instead of
 * inlining bezier arrays or spring configs.
 */

import type { Variants } from "motion/react";

/** Reveal/entry tween ease (no overshoot). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Menus, step changes, pointer-tracking — responsive UI motion. */
export const springSnappy = {
  type: "spring",
  stiffness: 350,
  damping: 25
} as const;

/** Card reveals and tilts — gentler physical motion. */
export const springSoft = {
  type: "spring",
  stiffness: 150,
  damping: 20
} as const;

/**
 * News deck. The top card flies out in the direction of travel while the next
 * one settles in from the opposite side, so `custom` (1 = forward, -1 = back)
 * has to be passed to both the AnimatePresence and the animated card.
 */
export const deckVariants: Variants = {
  enter: (direction: number) =>
    direction > 0
      ? { x: 0, y: 48, scale: 0.94, opacity: 0 }
      : { x: 0, y: -72, scale: 1, opacity: 0 },
  center: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    zIndex: 2,
    transition: springSnappy
  },
  exit: (direction: number) => ({
    // `x` has to be named even though the deck moves vertically: a two-axis drag
    // can be released with a non-zero x, and its snap-back would otherwise keep
    // running underneath the exit animation.
    x: 0,
    opacity: 0,
    pointerEvents: "none",
    ...(direction > 0
      ? { y: -72, scale: 1, zIndex: 3 }
      : { y: 48, scale: 0.94, zIndex: 1 }),
    // zIndex is what puts the outgoing card above the incoming one going
    // forward and below it going back — AnimatePresence keeps the exiting child
    // at its old position, so DOM order alone gets this backwards.
    transition: { ...springSnappy, opacity: { duration: 0.2 }, zIndex: { duration: 0 } }
  })
};

/**
 * Reduced-motion deck. `MotionConfig reducedMotion="user"` only makes transforms
 * *snap*, which turns a 48px slide into a 48px teleport — exactly what the
 * preference exists to prevent. Cross-fade instead.
 */
export const deckVariantsReduced: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, zIndex: 2 },
  exit: { opacity: 0, pointerEvents: "none", zIndex: 3 }
};

/**
 * View transitions. Durations/easing are mirrored as CSS custom properties in
 * styles/view-transitions.css — keep the two in sync.
 */

/** Root crossfade on route change. */
export const VIEW_ROOT = {
  duration: 0.35,
  ease: EASE_OUT
} as const;

/**
 * How long a navigation may stay frozen mid-transition before we give up and
 * let it land un-animated. Guards against a slow RSC fetch holding the old
 * page's snapshot on screen.
 */
export const VIEW_NAV_TIMEOUT_MS = 600;
