"use client";

import * as m from "motion/react-m";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Link } from "i18n/navigation";

const MotionLink = m.create(Link);

const variants = {
  primary: "bg-primary text-white shadow-lg hover:brightness-110",
  secondary:
    "border-edge bg-surface-card text-strong hover:border-primary border shadow-sm",
  ghost: "text-primary hover:opacity-70"
} as const;

const sizes = {
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-4 text-base"
} as const;

/* Ghost buttons keep the text scale but carry no padding/shadow. */
const ghostSizes = {
  md: "text-sm",
  lg: "text-base"
} as const;

interface ButtonProps {
  /** Renders a locale-aware Link for internal paths, an <a> otherwise. */
  href?: string;
  /** Adds target="_blank" rel="noopener noreferrer". */
  external?: boolean;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  fullWidth?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
  children: ReactNode;
}

export default function Button({
  href,
  external,
  variant = "primary",
  size = "md",
  fullWidth,
  type = "button",
  onClick,
  className,
  "aria-label": ariaLabel,
  children
}: ButtonProps) {
  const classes = clsx(
    "group focus-visible:outline-primary inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    variant === "ghost" ? ghostSizes[size] : sizes[size],
    fullWidth && "w-full",
    className
  );
  const motionProps = {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.97 }
  } as const;

  if (href?.startsWith("/")) {
    return (
      <MotionLink
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
        {...motionProps}
      >
        {children}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <m.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...motionProps}
      >
        {children}
      </m.a>
    );
  }

  return (
    <m.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      {...motionProps}
    >
      {children}
    </m.button>
  );
}
