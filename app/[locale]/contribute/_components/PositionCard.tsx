"use client";

import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/20/solid";
import RotatingCard from "app/_components/RotatingCard";
import Badge from "app/_components/ui/Badge";
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
        data-vt={`position-${position.id}`}
        className={clsx(
          "bg-surface-card flex h-full flex-col rounded-2xl border p-6 shadow-sm",
          isLead ? "border-primary/30 ring-primary/20 ring-1" : "border-edge"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
            {position.icon}
          </div>
          <div>
            <h3 className="heading-4">{title}</h3>
            <span className="text-primary text-xs font-medium">
              {levelLabel}
            </span>
          </div>
        </div>
        <p className="body-sm mt-3 flex-1">{tagline}</p>
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
      data-vt={`position-${position.id}`}
      className={clsx(
        "bg-surface-card h-full rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-lg",
        isLead ? "border-primary/30 ring-primary/30 ring-1" : "border-edge"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
            {position.icon}
          </div>
          <Badge
            variant={isLead ? "accent" : "neutral"}
            className="font-semibold"
          >
            {levelLabel}
          </Badge>
        </div>

        <h3 className="heading-3 mt-4">{title}</h3>
        <p className="body-base mt-3">{description}</p>

        <p className="text-strong mt-6 text-sm font-semibold">
          {t("card.lookingFor")}
        </p>
        <ul className="mt-3 space-y-2">
          {lookingFor.map((item) => (
            <li key={item} className="text-body flex items-start gap-3 text-sm">
              <CheckIcon className="text-primary mt-0.5 size-4 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-strong mt-6 text-sm font-semibold">
          {t("card.benefits")}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {position.benefits.map((benefit) => (
            <Badge
              as="li"
              key={benefit.label}
              variant={benefit.emphasis ? "accent" : "neutral"}
              className={clsx(benefit.emphasis && "ring-primary/20 ring-1")}
            >
              {getBenefitLabel(benefit.label)}
              {benefit.headDevOnly && (
                <span className="text-[0.625rem] font-normal opacity-70">
                  {t("card.headDevOnly")}
                </span>
              )}
            </Badge>
          ))}
        </ul>

        <p className="caption mt-5">
          <span className="font-medium">{t("card.formAsksFor")}</span>{" "}
          {formAsksFor}
        </p>
        {note && (
          <p className="text-primary mt-2 text-xs font-medium">{note}</p>
        )}
        {disclaimer && <p className="caption mt-2 italic">{disclaimer}</p>}

        <div className="mt-auto pt-6">
          <ApplyButton position={position} placement={placement} fullWidth />
        </div>
      </div>
    </RotatingCard>
  );
}
