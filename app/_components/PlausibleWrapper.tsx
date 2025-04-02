"use client";

import { usePlausible } from "next-plausible";
import { PropsWithChildren } from "react";

interface PlausibleWrapperProps extends PropsWithChildren {
  eventName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
