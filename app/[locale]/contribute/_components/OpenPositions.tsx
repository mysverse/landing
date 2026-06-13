"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { openPositions } from "data/contribute";
import PositionCard from "./PositionCard";
import { useTranslations } from "next-intl";

const listVariants: Variants = {
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.12
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 }
  }
};

export default function OpenPositions() {
  const t = useTranslations("Contribute");

  return (
    <section id="open-positions" className="scroll-mt-24">
      <div className="text-center">
        <p className="text-primary text-base/7 font-semibold">
          {t("openPositions.label")}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {t("openPositions.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/80">
          {t("openPositions.desc")}
        </p>
      </div>

      <m.div
        className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        {openPositions.map((position) => (
          <m.div key={position.id} variants={itemVariants} className="h-full">
            <PositionCard position={position} placement="role_card" />
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
