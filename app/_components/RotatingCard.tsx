"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { useSpring } from "motion/react";
import * as m from "motion/react-m";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
  skipZ?: boolean;
}

export default function RotatingCard({ children, className, skipZ }: Props) {
  const rotateX = useSpring(0);
  const rotateY = useSpring(0);
  const z = useSpring(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const calculateTilt = (event: PointerEvent<HTMLElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPct = x / rect.width;
    const yPct = y / rect.height;

    return {
      rotateX: 10 * (0.5 - yPct),
      rotateY: 10 * (xPct - 0.5)
    };
  };

  return (
    <m.div
      ref={cardRef}
      className={clsx(className)}
      style={{
        rotateX,
        rotateY,
        z: skipZ ? 0 : z,
        transformPerspective: 1000
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return; // ← skip on touch
        const { rotateX: x, rotateY: y } = calculateTilt(e);
        rotateX.set(x);
        rotateY.set(y);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return; // ← skip on touch
        if (!skipZ) z.set(-10);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return; // ← skip on touch
        rotateX.set(0);
        rotateY.set(0);
        if (!skipZ) z.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
