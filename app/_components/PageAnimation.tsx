"use client";

import { type ReactNode } from "react";
import * as m from "motion/react-m";
import { EASE_OUT } from "./Motion/transitions";
import { useIsViewTransitioning } from "./Motion/ViewTransitionProvider";
import { useHashScroll } from "hooks/useHashScroll";

export default function PageAnimation({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  useHashScroll();

  // When a view transition drove the navigation it already crossfaded the
  // page; fading up on top of that reads as a stutter. First loads, and
  // browsers without view transitions, keep the entrance.
  const isTransitioning = useIsViewTransitioning();

  return (
    <m.div
      initial={isTransitioning ? false : { y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </m.div>
  );
}
