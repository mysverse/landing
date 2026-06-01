"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import SplitText from "app/_components/SplitText";
import { openPositions } from "data/contribute";
import ApplyButton from "./ApplyButton";

export default function ContributeHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl text-center">
      <m.span
        initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase"
      >
        <span className="relative flex size-2">
          {!shouldReduceMotion && (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
          )}
          <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        Applications open
      </m.span>

      <SplitText className="mt-5 w-full text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        Build the Malaysian metaverse with us.
      </SplitText>

      <m.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-white/80"
      >
        We&apos;re hiring two volunteer development roles — with real benefits.
        Earn through our Pay-Per-Task system, share in revenue, and get an
        official welcome package, all while building experiences played by
        thousands.
      </m.p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {openPositions.map((position) => (
          <ApplyButton
            key={position.id}
            position={position}
            placement="contribute_hero"
            variant={position.level === "lead" ? "primary" : "secondary"}
            label={`Apply as ${position.title}`}
          />
        ))}
      </div>
    </div>
  );
}
