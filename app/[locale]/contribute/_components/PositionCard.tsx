"use client";

import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/20/solid";
import RotatingCard from "app/_components/RotatingCard";
import type { OpenPosition } from "data/contribute";
import ApplyButton, { type ApplyPlacement } from "./ApplyButton";
import { useTranslations } from "next-intl";

interface PositionCardProps {
  position: OpenPosition;
  placement: ApplyPlacement;
  compact?: boolean;
}

export default function PositionCard({
  position,
  placement,
  compact
}: PositionCardProps) {
  const isLead = position.level === "lead";
  const t = useTranslations("Contribute");

  const title = t.has(`positions.${position.id}.title`)
    ? t(`positions.${position.id}.title`)
    : position.title;
  const levelLabel = t.has(`positions.${position.id}.levelLabel`)
    ? t(`positions.${position.id}.levelLabel`)
    : position.levelLabel;
  const tagline = t.has(`positions.${position.id}.tagline`)
    ? t(`positions.${position.id}.tagline`)
    : position.tagline;
  const description = t.has(`positions.${position.id}.description`)
    ? t(`positions.${position.id}.description`)
    : position.description;
  const lookingFor = position.lookingFor.map((item, index) =>
    t.has(`positions.${position.id}.lookingFor.${index}`)
      ? t(`positions.${position.id}.lookingFor.${index}`)
      : item
  );
  const formAsksFor = t.has(`positions.${position.id}.formAsksFor`)
    ? t(`positions.${position.id}.formAsksFor`)
    : position.formAsksFor;
  const note = position.note
    ? t.has(`positions.${position.id}.note`)
      ? t(`positions.${position.id}.note`)
      : position.note
    : undefined;
  const disclaimer = position.disclaimer
    ? t.has(`positions.${position.id}.disclaimer`)
      ? t(`positions.${position.id}.disclaimer`)
      : position.disclaimer
    : undefined;

  const getBenefitLabel = (label: string) => {
    const key = label
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "");
    return t.has(`benefitsList.${key}.title`)
      ? t(`benefitsList.${key}.title`)
      : label;
  };

  if (compact) {
    return (
      <RotatingCard
        className={clsx(
          "flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900",
          isLead
            ? "border-primary/30 ring-primary/20 ring-1"
            : "border-gray-200 dark:border-white/10"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
            {position.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <span className="text-primary text-xs font-medium">
              {levelLabel}
            </span>
          </div>
        </div>
        <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 dark:text-white/70">
          {tagline}
        </p>
        <ApplyButton
          position={position}
          placement={placement}
          fullWidth
          className="mt-5"
        />
      </RotatingCard>
    );
  }

  return (
    <RotatingCard
      className={clsx(
        "h-full rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:bg-gray-900",
        isLead
          ? "border-primary/30 ring-primary/30 ring-1"
          : "border-gray-200 dark:border-white/10"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
            {position.icon}
          </div>
          <span
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-semibold",
              isLead
                ? "bg-primary/10 text-primary"
                : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/70"
            )}
          >
            {levelLabel}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-3 leading-7 text-gray-600 dark:text-white/80">
          {description}
        </p>

        <p className="mt-6 text-sm font-semibold text-gray-900 dark:text-white">
          {t("card.lookingFor")}
        </p>
        <ul className="mt-3 space-y-2">
          {lookingFor.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-gray-700 dark:text-white/70"
            >
              <CheckIcon className="text-primary mt-0.5 size-4 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm font-semibold text-gray-900 dark:text-white">
          {t("card.benefits")}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {position.benefits.map((benefit) => (
            <li
              key={benefit.label}
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                benefit.emphasis
                  ? "bg-primary/10 text-primary ring-primary/20 ring-1"
                  : "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white/70"
              )}
            >
              {getBenefitLabel(benefit.label)}
              {benefit.headDevOnly && (
                <span className="text-[0.625rem] font-normal opacity-70">
                  {t("card.headDevOnly")}
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs leading-5 text-gray-500 dark:text-white/50">
          <span className="font-medium">{t("card.formAsksFor")}</span>{" "}
          {formAsksFor}
        </p>
        {note && (
          <p className="text-primary mt-2 text-xs font-medium">{note}</p>
        )}
        {disclaimer && (
          <p className="mt-2 text-xs text-gray-500 italic dark:text-white/50">
            {disclaimer}
          </p>
        )}

        <div className="mt-auto pt-6">
          <ApplyButton position={position} placement={placement} fullWidth />
        </div>
      </div>
    </RotatingCard>
  );
}
