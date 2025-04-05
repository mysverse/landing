"use client";

import type { ReactNode } from "react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

interface SplitTextProps {
  children: ReactNode;
  duration?: number;
}

export default function SplitText(props: SplitTextProps) {
  const headerRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!headerRef.current) return;

      // Hide the container until the fonts are loaded
      headerRef.current.style.visibility = "visible";

      const { words } = splitText(headerRef.current!);

      // Animate the words in the h1
      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: props.duration ?? 0.5,
          bounce: 0,
          delay: stagger(0.05)
        }
      );
    });
  }, [props.duration]);

  return (
    <h1
      className="invisible flex w-full items-center justify-center text-center text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl"
      style={{ willChange: "transform, opacity" }}
      ref={headerRef}
    >
      {props.children}
    </h1>
  );
}
