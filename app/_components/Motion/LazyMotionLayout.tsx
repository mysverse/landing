"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import ViewTransitionProvider from "./ViewTransitionProvider";

const loadFeatures = () => import("./features").then((res) => res.default);

export default function LazyMotionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <ViewTransitionProvider>{children}</ViewTransitionProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
