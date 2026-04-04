"use client";

import { usePlausible } from "next-plausible";
import { ReactNode } from "react";

interface PlausibleWrapperProps {
  eventName: string;
  eventProps?: Record<string, unknown>;
  children: ReactNode;
}

export default function PlausibleWrapper({
  eventName,
  eventProps,
  children
}: PlausibleWrapperProps) {
  const plausible = usePlausible();

  return (
    <span
      onClickCapture={() => plausible(eventName, eventProps)}
      className="contents"
    >
      {children}
    </span>
  );
}
