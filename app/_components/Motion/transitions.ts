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
