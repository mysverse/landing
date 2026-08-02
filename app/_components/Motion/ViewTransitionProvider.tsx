"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import type { ViewTransitionBuilder } from "motion";
import { usePathname } from "i18n/navigation";
import { canViewTransition, runViewTransition } from "./viewTransition";
import { VIEW_NAV_TIMEOUT_MS, VIEW_ROOT } from "./transitions";

export type ConfigureTransition = (builder: ViewTransitionBuilder) => void;

interface ViewTransitionContextValue {
  navigate: (run: () => void, configure?: ConfigureTransition) => void;
  isTransitioning: boolean;
}

const ViewTransitionContext = createContext<
  ViewTransitionContextValue | undefined
>(undefined);

/**
 * Bridges the App Router to the View Transitions API.
 *
 * The router gives no "the new route has painted" signal, so a navigation is
 * wrapped in a promise that a pathname-watching layout effect resolves. The
 * effect runs after the new route commits but before paint, which is exactly
 * when the browser wants to snapshot the new view.
 *
 * Back/forward is deliberately not covered: by the time `popstate` fires the
 * navigation has already happened, leaving nothing to snapshot.
 */
export default function ViewTransitionProvider({
  children
}: {
  children: ReactNode;
}) {
  const pending = useRef<(() => void) | null>(null);
  const timer = useRef<number | null>(null);
  // A count rather than a boolean so overlapping navigations can't have the
  // first one's cleanup switch mount animations back on under the second.
  const [active, setActive] = useState(0);

  const settle = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    pending.current?.();
    pending.current = null;
  }, []);

  const pathname = usePathname();
  useLayoutEffect(() => {
    settle();
  }, [pathname, settle]);

  const navigate = useCallback(
    (run: () => void, configure?: ConfigureTransition) => {
      if (!canViewTransition()) {
        run();
        return;
      }

      setActive((n) => n + 1);
      void runViewTransition(
        () =>
          new Promise<void>((resolve) => {
            pending.current = resolve;
            // If the route hasn't committed by now — an un-prefetched payload
            // on a slow connection — give up and let it land un-animated
            // rather than holding a frozen snapshot on screen.
            timer.current = window.setTimeout(settle, VIEW_NAV_TIMEOUT_MS);
            startTransition(run);
          }),
        {
          mode: "route",
          configure: (builder) => {
            builder.layout(VIEW_ROOT);
            configure?.(builder);
          }
        }
      ).finally(() => setActive((n) => n - 1));
    },
    [settle]
  );

  const value = useMemo(
    () => ({ navigate, isTransitioning: active > 0 }),
    [navigate, active]
  );

  return (
    <ViewTransitionContext.Provider value={value}>
      {children}
    </ViewTransitionContext.Provider>
  );
}

function useViewTransitionContext() {
  const context = useContext(ViewTransitionContext);
  if (!context) {
    throw new Error(
      "useViewTransition hooks must be used within a ViewTransitionProvider"
    );
  }
  return context;
}

export function useViewTransitionNavigate() {
  return useViewTransitionContext().navigate;
}

/**
 * True while a view transition is driving a navigation, so mount animations on
 * the incoming page can stand down instead of doubling up with the crossfade.
 */
export function useIsViewTransitioning() {
  return useViewTransitionContext().isTransitioning;
}
