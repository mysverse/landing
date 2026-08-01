import clsx from "clsx";
import type { ReactNode } from "react";

const variants = {
  accent: "bg-primary/10 text-primary",
  neutral: "bg-surface-raised text-body"
} as const;

interface BadgeProps {
  /** Element to render — li for badge lists, span otherwise. */
  as?: "span" | "li";
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}

export default function Badge({
  as: Tag = "span",
  variant = "neutral",
  className,
  children
}: BadgeProps) {
  return (
    <Tag
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}
