"use client";

import type { ReactNode } from "react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

interface SplitTextProps {
  children: ReactNode;
  duration?: number;
  className?: string;
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
        { opacity: [0, 1], y: [16, 0] },
        {
          type: "spring",
          duration: props.duration ?? 1,
          bounce: 0,
          delay: stagger(0.05)
        }
      );
    });
  }, [props.duration]);

  return (
    <h1
      className={props.className}
      style={{ willChange: "transform, opacity" }}
      ref={headerRef}
    >
      {props.children}
    </h1>
  );
}
