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
        <p className="eyebrow">{t("benefits.label")}</p>
        <h2 className="heading-2 mt-2">{t("benefits.title")}</h2>
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
            className="border-edge bg-surface-card flex flex-col rounded-xl border p-5 shadow-sm"
          >
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
              {benefit.icon}
            </div>
            <h3 className="text-strong mt-3 text-sm font-semibold">
              {getBenefitTitle(benefit.title)}
            </h3>
            <p className="text-body mt-1 flex-1 text-xs leading-5">
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

      <p className="caption mt-6 text-center">{t("benefits.disclaimer")}</p>
    </div>
  );
}
