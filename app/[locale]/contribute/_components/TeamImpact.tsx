"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function TeamImpact() {
  const t = useTranslations("Contribute");

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <p className="eyebrow">{t("impact.label")}</p>
        <h2 className="heading-2 mt-2">{t("impact.title")}</h2>
      </div>

      <m.div
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Card 1: Players */}
        <m.div
          variants={cardVariants}
          className="group border-edge bg-surface-card relative flex flex-col overflow-hidden rounded-3xl border shadow-md transition-all duration-300 hover:shadow-xl"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-950">
            <Image
              src="/img/contribute/players.jpg"
              alt={t("impact.players.title")}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="heading-4 group-hover:text-primary transition-colors">
                {t("impact.players.title")}
              </h3>
              <p className="body-sm mt-3">
                {t("impact.players.desc")}
              </p>
            </div>
          </div>
        </m.div>

        {/* Card 2: Networking */}
        <m.div
          variants={cardVariants}
          className="group border-edge bg-surface-card relative flex flex-col overflow-hidden rounded-3xl border shadow-md transition-all duration-300 hover:shadow-xl"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-950">
            <Image
              src="/img/contribute/networking.jpg"
              alt={t("impact.networking.title")}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="heading-4 group-hover:text-primary transition-colors">
                {t("impact.networking.title")}
              </h3>
              <p className="body-sm mt-3">
                {t("impact.networking.desc")}
              </p>
            </div>
          </div>
        </m.div>

        {/* Card 3: Welcome Pack */}
        <m.div
          variants={cardVariants}
          className="group border-edge bg-surface-card relative flex flex-col overflow-hidden rounded-3xl border shadow-md transition-all duration-300 hover:shadow-xl"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-950">
            <Image
              src="/img/contribute/welcome_pack.jpg"
              alt={t("impact.welcomePack.title")}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="heading-4 group-hover:text-primary transition-colors">
                {t("impact.welcomePack.title")}
              </h3>
              <p className="body-sm mt-3">
                {t("impact.welcomePack.desc")}
              </p>
            </div>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
