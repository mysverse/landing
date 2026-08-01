"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import * as m from "motion/react-m";
import { EASE_OUT } from "./Motion/transitions";

const getHashTarget = () => {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;

  let id = hash;
  try {
    id = decodeURIComponent(hash);
  } catch {
    id = hash;
  }

  return (
    document.getElementById(id) ??
    (document.getElementsByName(id)[0] as HTMLElement | undefined) ??
    null
  );
};

export default function PageAnimation({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollToHash = useCallback((behavior: ScrollBehavior = "auto") => {
    const target = getHashTarget();
    if (!target) return;

    target.scrollIntoView({
      block: "start",
      behavior
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      window.requestAnimationFrame(() => scrollToHash("smooth"));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [scrollToHash]);

  return (
    <m.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      onAnimationComplete={() => scrollToHash()}
      className={className}
    >
      {children}
    </m.div>
  );
}
