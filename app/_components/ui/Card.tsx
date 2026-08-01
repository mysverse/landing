import clsx from "clsx";
import type { ReactNode } from "react";

/** The standard card shell, exported for components (e.g. RotatingCard
 * wrappers) that must apply it to their own outer element. */
export const cardSurface =
  "border-edge bg-surface-card rounded-2xl border shadow-sm";

const paddings = {
  none: "",
  md: "p-6",
  lg: "p-8"
} as const;

interface CardProps {
  padding?: keyof typeof paddings;
  /** Adds a hover shadow lift for clickable cards. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Card({
  padding = "md",
  interactive = false,
  className,
  children
}: CardProps) {
  return (
    <div
      className={clsx(
        cardSurface,
        paddings[padding],
        interactive && "transition-shadow hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
