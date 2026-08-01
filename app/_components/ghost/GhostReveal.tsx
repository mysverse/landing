"use client";

import type { ReactNode } from "react";
import * as m from "motion/react-m";
import clsx from "clsx";
import { EASE_OUT } from "app/_components/Motion/transitions";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GhostReveal({ children, className }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      className={clsx("will-change-transform", className)}
    >
      {children}
    </m.div>
  );
}
