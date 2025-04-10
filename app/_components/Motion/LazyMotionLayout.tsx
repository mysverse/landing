"use client";

import { LazyMotion } from "motion/react";

const loadFeatures = () => import("./features").then((res) => res.default);

export default function LazyMotionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
