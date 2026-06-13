"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { openPositions } from "data/contribute";
import ApplyButton from "./ApplyButton";
import { useTranslations } from "next-intl";

const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.12 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.45 }
  }
};

export default function ApplyProcess() {
  const t = useTranslations("Contribute");

  const steps = [
    {
      title: t("process.step1.title"),
      description: t("process.step1.desc")
    },
    {
      title: t("process.step2.title"),
      description: t("process.step2.desc")
    },
    {
      title: t("process.step3.title"),
      description: t("process.step3.desc")
    }
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <p className="text-primary text-base/7 font-semibold">
          {t("process.label")}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {t("process.title")}
        </h2>
      </div>

      <m.ol
        className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, index) => (
          <m.li key={step.title} variants={itemVariants}>
            <div className="bg-primary flex size-10 items-center justify-center rounded-full text-base font-semibold text-white">
              {index + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-white/70">
              {step.description}
            </p>
          </m.li>
        ))}
      </m.ol>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {openPositions.map((position) => {
          const displayTitle = t.has(`positions.${position.id}.title`)
            ? t(`positions.${position.id}.title`)
            : position.title;
          return (
            <ApplyButton
              key={position.id}
              position={position}
              placement="final_cta"
              variant={position.level === "lead" ? "primary" : "secondary"}
              label={t("openPositions.apply", { title: displayTitle })}
            />
          );
        })}
      </div>
    </div>
  );
}
