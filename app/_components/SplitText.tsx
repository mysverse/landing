"use client";

import type { ReactNode } from "react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export default function SplitText(props: SplitTextProps) {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeAnimation = () => {
      if (!headerRef.current) return;

      try {
        const { words } = splitText(headerRef.current);

        // Set ready state for visibility
        setIsReady(true);

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
      } catch (error) {
        // Fallback: show content even if animation fails
        console.warn("SplitText animation failed:", error);
        setIsReady(true);
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(initializeAnimation, 10);
  }, [props.duration]);

  return (
    <h1
      className={props.className}
      style={{
        willChange: "transform, opacity",
        visibility: isReady ? "visible" : "hidden",
        opacity: isReady ? 1 : 0
      }}
      ref={headerRef}
    >
      {props.children}
    </h1>
  );
}
