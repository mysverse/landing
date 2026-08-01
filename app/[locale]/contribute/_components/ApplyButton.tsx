"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import PlausibleWrapper from "app/_components/PlausibleWrapper";
import Button from "app/_components/ui/Button";
import type { OpenPosition } from "data/contribute";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Contribute");
  const displayTitle = t.has(`positions.${position.id}.title`)
    ? t(`positions.${position.id}.title`)
    : position.title;
  const defaultLabel = t("openPositions.applyFor", { title: displayTitle });

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
      <Button
        href={position.applyHref}
        external
        variant={variant}
        fullWidth={fullWidth}
        className={className}
      >
        {label ?? defaultLabel}
        <ArrowTopRightOnSquareIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </PlausibleWrapper>
  );
}
