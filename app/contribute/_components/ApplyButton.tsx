"use client";

import * as m from "motion/react-m";
import clsx from "clsx";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import PlausibleWrapper from "app/_components/PlausibleWrapper";
import type { OpenPosition } from "data/contribute";

export type ApplyPlacement =
  | "home"
  | "contribute_hero"
  | "role_card"
  | "final_cta";

interface ApplyButtonProps {
  position: OpenPosition;
  placement: ApplyPlacement;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  label?: string;
  className?: string;
}

export default function ApplyButton({
  position,
  placement,
  variant = "primary",
  fullWidth,
  label,
  className
}: ApplyButtonProps) {
  return (
    <PlausibleWrapper
      eventName="applicationFormClicked"
      eventProps={{
        props: {
          role: position.id,
          placement,
          destination: position.applyHref
        }
      }}
    >
      <m.a
        href={position.applyHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={clsx(
          "group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          fullWidth && "w-full",
          variant === "primary"
            ? "bg-primary text-white shadow-lg hover:brightness-110"
            : "border border-gray-200 bg-white text-gray-900 shadow-sm hover:border-primary dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:border-primary",
          className
        )}
      >
        {label ?? `Apply for ${position.title}`}
        <ArrowTopRightOnSquareIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
      </m.a>
    </PlausibleWrapper>
  );
}
