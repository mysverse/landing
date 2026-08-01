import clsx from "clsx";
import type { ReactNode } from "react";

const sizes = {
  wide: "max-w-7xl",
  narrow: "max-w-2xl"
} as const;

interface ContainerProps {
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}

export default function Container({
  size = "wide",
  className,
  children
}: ContainerProps) {
  return (
    <div className={clsx("mx-auto px-6 lg:px-8", sizes[size], className)}>
      {children}
    </div>
  );
}
