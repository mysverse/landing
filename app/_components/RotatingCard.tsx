"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { motion, useSpring } from "motion/react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function RotatingCard({ children, className }: Props) {
  const rotateX = useSpring(0);
  const rotateY = useSpring(0);
  const z = useSpring(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const calculateTilt = (event: PointerEvent<HTMLElement>) => {
    if (!cardRef.current) return { rotateX: 0, rotateY: 0 };

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert coordinates to percentages
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    // Max tilt of 10 degrees
    return {
      rotateX: 10 * (0.5 - yPercent),
      rotateY: 10 * (xPercent - 0.5)
    };
  };

  return (
    <motion.div
      ref={cardRef}
      className={clsx(className)}
      style={{
        rotateX,
        rotateY,
        z,
        transformPerspective: 1000
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onPointerMove={(e) => {
        const tilt = calculateTilt(e);
        rotateX.set(tilt.rotateX);
        rotateY.set(tilt.rotateY);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
        z.set(0);
      }}
      onPointerEnter={() => {
        z.set(-10);
      }}
    >
      {children}
    </motion.div>
  );
}
