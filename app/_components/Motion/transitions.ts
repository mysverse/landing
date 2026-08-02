/**
 * Canonical motion vocabulary for the site — import these instead of
 * inlining bezier arrays or spring configs.
 */

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
