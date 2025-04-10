"use client";

import { usePlausible } from "next-plausible";
import { cloneElement, ReactElement, MouseEvent } from "react";

interface PlausibleWrapperProps {
  eventName: string;
  eventProps?: Record<string, unknown>;
  children: ReactElement<{
    onClick?: (event: MouseEvent<HTMLElement>) => void;
  }>;
}

export default function PlausibleWrapper({
  eventName,
  eventProps,
  children
}: PlausibleWrapperProps): ReactElement {
  const plausible = usePlausible();

  // Capture the child's original onClick handler, if any
  const originalOnClick = children.props.onClick;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (originalOnClick) {
      originalOnClick(event);
    }
    if (typeof window !== "undefined") {
      plausible(eventName, eventProps);
    }
  };

  // Clone the child element and attach the new onClick handler
  return cloneElement(children, {
    onClick: handleClick
  });
}
