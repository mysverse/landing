/**
 * The single seam over Motion's view transition API.
 *
 * `animateView` is Motion's wrapper around the native View Transitions API. It
 * is still an alpha API, so every call goes through this module — an upstream
 * change is then a one-file fix, and there is exactly one place enforcing the
 * feature-detection and reduced-motion gates.
 *
 * Note this is the *vanilla* Motion API, so `LazyMotion strict` does not apply
 * (that only governs `motion/react-m` components). Import from "motion" rather
 * than "motion-dom", which is only a transitive dependency here.
 */

import type { ViewTransitionBuilder } from "motion";

/**
 * Which `::view-transition-*` rules apply — see styles/view-transitions.css.
 * Set on <html> before every transition and never cleared, so the attribute
 * always describes the most recent one and cannot race the running animation.
 */
type ViewTransitionMode = "theme" | "route";

interface RunOptions {
  mode: ViewTransitionMode;
  /** Chained onto the builder before the transition starts. */
  configure?: (builder: ViewTransitionBuilder) => void;
}

export function canViewTransition(): boolean {
  if (typeof document === "undefined") return false;
  if (typeof document.startViewTransition !== "function") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const loadMotion = () => import("motion");

/**
 * Pull the motion chunk in ahead of the first transition, so the first toggle
 * or navigation doesn't pay the chunk fetch.
 */
export function warmViewTransition(): void {
  if (!canViewTransition()) return;

  const warm = () => void loadMotion().catch(() => {});

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(warm);
  } else {
    window.setTimeout(warm, 300);
  }
}

export async function runViewTransition(
  update: () => void | Promise<void>,
  { mode, configure }: RunOptions
): Promise<void> {
  if (!canViewTransition()) {
    await update();
    return;
  }

  let animateView: typeof import("motion").animateView;
  try {
    ({ animateView } = await loadMotion());
  } catch {
    // Chunk failed to load — the DOM update still has to happen.
    await update();
    return;
  }

  document.documentElement.dataset.vtMode = mode;

  try {
    const builder = animateView(update, { interrupt: "wait" });
    configure?.(builder);
    await builder;
  } catch {
    // The transition was aborted (a duplicate view-transition-name will do
    // it). `update` has already run by this point, so there is nothing to
    // redo — the page is simply left un-animated.
  }
}
