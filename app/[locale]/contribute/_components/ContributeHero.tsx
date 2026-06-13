"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import SplitText from "app/_components/SplitText";
import { openPositions } from "data/contribute";
import ApplyButton from "./ApplyButton";
import { useTranslations } from "next-intl";

export default function ContributeHero() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Contribute");

  return (
    <div className="mx-auto max-w-3xl text-center">
      <m.span
        initial={
          shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.92 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase"
      >
        <span className="relative flex size-2">
          {!shouldReduceMotion && (
            <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-60" />
          )}
          <span className="bg-primary relative inline-flex size-2 rounded-full" />
        </span>
        {t("hero.badge")}
      </m.span>

      <SplitText className="mt-5 w-full text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        {t("hero.title")}
      </SplitText>

      <m.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-white/80"
      >
        {t("hero.desc")}
      </m.p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {openPositions.map((position) => {
          const title = t.has(`positions.${position.id}.title`)
            ? t(`positions.${position.id}.title`)
            : position.title;
          return (
            <ApplyButton
              key={position.id}
              position={position}
              placement="contribute_hero"
              variant={position.level === "lead" ? "primary" : "secondary"}
              label={t("openPositions.apply", { title: title })}
            />
          );
        })}
      </div>
    </div>
  );
}
