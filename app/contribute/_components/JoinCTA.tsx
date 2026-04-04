"use client";

import Link from "next/link";
import { joinMethods } from "data/contribute";
import clsx from "clsx";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export default function JoinCTA() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      {joinMethods.map((method) => (
        <Link
          key={method.type}
          href={method.href}
          target="_blank"
          className={clsx(
            "group flex min-w-[240px] items-center gap-4 rounded-xl px-6 py-4 transition-all",
            method.primary
              ? "bg-primary text-white shadow-lg hover:shadow-xl hover:brightness-110"
              : "border border-gray-200 bg-white text-gray-900 shadow-sm hover:border-primary hover:shadow-md dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:border-primary"
          )}
        >
          <div
            className={clsx(
              "flex size-10 shrink-0 items-center justify-center rounded-lg",
              method.primary
                ? "bg-white/20"
                : "bg-primary/10 text-primary"
            )}
          >
            {method.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 font-semibold">
              {method.label}
              <ArrowTopRightOnSquareIcon className="size-3.5 opacity-60" />
            </div>
            <div
              className={clsx(
                "text-sm",
                method.primary ? "text-white/80" : "text-gray-500 dark:text-white/60"
              )}
            >
              {method.description}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
