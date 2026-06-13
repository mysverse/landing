"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { benefits } from "data/contribute";
import { useTranslations } from "next-intl";

const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.06 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.4 }
  }
};

export default function BenefitsGrid() {
  const t = useTranslations("Contribute");

  const getBenefitTitle = (title: string) => {
    const key = title
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "");
    return t.has(`benefitsList.${key}.title`)
      ? t(`benefitsList.${key}.title`)
      : title;
  };

  const getBenefitDesc = (title: string, defaultDesc: string) => {
    const key = title
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "");
    return t.has(`benefitsList.${key}.desc`)
      ? t(`benefitsList.${key}.desc`)
      : defaultDesc;
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <p className="text-primary text-base/7 font-semibold">
          {t("benefits.label")}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {t("benefits.title")}
        </h2>
      </div>

      <m.ul
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {benefits.map((benefit) => (
          <m.li
            key={benefit.title}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900"
          >
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
              {benefit.icon}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
              {getBenefitTitle(benefit.title)}
            </h3>
            <p className="mt-1 flex-1 text-xs leading-5 text-gray-600 dark:text-white/70">
              {getBenefitDesc(benefit.title, benefit.description)}
            </p>
            {benefit.headDevOnly && (
              <span className="bg-primary/10 text-primary mt-3 inline-flex w-fit rounded-full px-2 py-0.5 text-[0.625rem] font-semibold">
                {t("benefits.badgeHeadOnly")}
              </span>
            )}
          </m.li>
        ))}
      </m.ul>

      <p className="mt-6 text-center text-xs text-gray-500 dark:text-white/50">
        {t("benefits.disclaimer")}
      </p>
    </div>
  );
}
