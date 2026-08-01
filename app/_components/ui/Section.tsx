import clsx from "clsx";
import type { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  align?: "center" | "left";
  /** Skip the standard vertical rhythm (py-12 sm:py-24). */
  flush?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function Section({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  flush = false,
  className,
  children
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || description);
  return (
    <section id={id} className={clsx(!flush && "py-12 sm:py-24", className)}>
      <Container>
        {hasHeader && (
          <div
            className={clsx(
              "max-w-2xl",
              align === "center" && "mx-auto text-center"
            )}
          >
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <h2 className={clsx("heading-2", eyebrow && "mt-2")}>{title}</h2>
            )}
            {description && (
              <p className={clsx("body-lg", (title || eyebrow) && "mt-4")}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
