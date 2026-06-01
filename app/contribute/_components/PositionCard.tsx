"use client";

import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/20/solid";
import RotatingCard from "app/_components/RotatingCard";
import type { OpenPosition } from "data/contribute";
import ApplyButton, { type ApplyPlacement } from "./ApplyButton";

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

  if (compact) {
    return (
      <RotatingCard
        className={clsx(
          "flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900",
          isLead
            ? "border-primary/30 ring-1 ring-primary/20"
            : "border-gray-200 dark:border-white/10"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {position.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {position.title}
            </h3>
            <span className="text-xs font-medium text-primary">
              {position.levelLabel}
            </span>
          </div>
        </div>
        <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 dark:text-white/70">
          {position.tagline}
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
          ? "border-primary/30 ring-1 ring-primary/30"
          : "border-gray-200 dark:border-white/10"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
            {position.levelLabel}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {position.title}
        </h3>
        <p className="mt-3 leading-7 text-gray-600 dark:text-white/80">
          {position.description}
        </p>

        <p className="mt-6 text-sm font-semibold text-gray-900 dark:text-white">
          What we look for
        </p>
        <ul className="mt-3 space-y-2">
          {position.lookingFor.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-gray-700 dark:text-white/70"
            >
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm font-semibold text-gray-900 dark:text-white">
          Benefits
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {position.benefits.map((benefit) => (
            <li
              key={benefit.label}
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                benefit.emphasis
                  ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                  : "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white/70"
              )}
            >
              {benefit.label}
              {benefit.headDevOnly && (
                <span className="text-[0.625rem] font-normal opacity-70">
                  Head Dev only
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs leading-5 text-gray-500 dark:text-white/50">
          <span className="font-medium">The form asks for:</span>{" "}
          {position.formAsksFor}
        </p>
        {position.note && (
          <p className="mt-2 text-xs font-medium text-primary">
            {position.note}
          </p>
        )}
        {position.disclaimer && (
          <p className="mt-2 text-xs text-gray-500 italic dark:text-white/50">
            {position.disclaimer}
          </p>
        )}

        <div className="mt-auto pt-6">
          <ApplyButton position={position} placement={placement} fullWidth />
        </div>
      </div>
    </RotatingCard>
  );
}
