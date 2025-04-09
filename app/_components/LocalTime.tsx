"use client";

import { Suspense } from "react";
import { useHydration } from "hooks/useHydration";
import { format, formatDistanceToNowStrict } from "date-fns";

export function LocalTime({
  date,
  type,
  className,
  children
}: {
  date: Date;
  type: "distance" | "date";
  className?: string;
  children?: React.ReactNode;
}) {
  const hydrated = useHydration();
  let dateString = date.toLocaleDateString();

  switch (type) {
    case "distance":
      dateString = formatDistanceToNowStrict(date, {
        addSuffix: true
      });
      break;
    case "date":
      dateString = format(date, "MMMM dd, yyyy");
      break;
  }

  return (
    <Suspense key={hydrated ? "local" : "utc"}>
      <time dateTime={date.toISOString()} className={className}>
        {dateString}
        {children}
        {/* {hydrated ? " Local" : " (UTC)"} */}
      </time>
    </Suspense>
  );
}
