"use client";
import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

interface Props {
  children: ReactNode;
}

export default function IntersectionTransition(props: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.1 // Trigger when 30% of the component is in view
  });

  return (
    <div
      ref={ref}
      className={clsx(
        "transition delay-150 duration-500 ease-out motion-reduce:transition-none",
        inView
          ? "translate-y-0 opacity-100"
          : "js:motion-safe:translate-y-8 js:motion-safe:opacity-0"
      )}
    >
      {props.children}
    </div>
  );
}
