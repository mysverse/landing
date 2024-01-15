"use client";

import { usePlausible } from "next-plausible";
import { PropsWithChildren } from "react";

interface PlausibleWrapperProps extends PropsWithChildren {
  eventName: string;
  eventProps?: any;
}

export default function PlausibleWrapper({
  eventName,
  eventProps,
  children
}: PlausibleWrapperProps) {
  const plausible = usePlausible();
  return (
    <div
      className="flex"
      onClick={() => {
        if (typeof window !== "undefined") plausible(eventName, eventProps);
      }}
    >
      {children}
    </div>
  );
}
