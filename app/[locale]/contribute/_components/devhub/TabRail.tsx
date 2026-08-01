"use client";

import type { KeyboardEvent, ReactNode } from "react";
import * as m from "motion/react-m";
import clsx from "clsx";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { springSnappy } from "app/_components/Motion/transitions";

export interface DevHubTab {
  id: string;
  icon: ReactNode;
}

/**
 * Vertical tab rail for the DevHub showcase. Without `onSelect` it renders
 * the same markup inert (pre-hydration static pass); `animated` gates the
 * Motion layout bar so no motion components mount before hydration.
 */
export default function TabRail({
  tabs,
  activeTab,
  onSelect,
  animated = false
}: {
  tabs: DevHubTab[];
  activeTab: string;
  onSelect?: (id: string) => void;
  animated?: boolean;
}) {
  const t = useTranslations("Contribute");

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onSelect) return;
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    let next = -1;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % tabs.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = tabs.length - 1;
    }
    if (next === -1) return;
    event.preventDefault();
    onSelect(tabs[next].id);
    document.getElementById(`devhub-tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-orientation="vertical"
      aria-label={t("devhub.tagline")}
      onKeyDown={handleKeyDown}
      className="flex flex-col justify-center space-y-3 lg:col-span-5"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`devhub-tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls="devhub-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={onSelect ? () => onSelect(tab.id) : undefined}
            className={clsx(
              "group focus-visible:outline-primary relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all focus-visible:outline-2",
              isActive
                ? "border-primary/25 bg-primary/[0.03] dark:bg-primary/[0.02]"
                : "border-transparent hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            )}
          >
            {/* Active highlight bar */}
            {isActive &&
              (animated ? (
                <m.div
                  layoutId="active-tab-bar"
                  className="bg-primary absolute top-3 bottom-3 left-0 w-1 rounded-r-full"
                  transition={springSnappy}
                />
              ) : (
                <div className="bg-primary absolute top-3 bottom-3 left-0 w-1 rounded-r-full" />
              ))}

            <div
              className={clsx(
                "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "bg-surface-raised text-body group-hover:text-strong"
              )}
            >
              {tab.icon}
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className={clsx(
                  "flex items-center gap-1.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-strong group-hover:text-primary"
                )}
              >
                {t(`devhub.${tab.id}.title`)}
                <ChevronRightIcon
                  className={clsx(
                    "size-3.5 transition-transform duration-200",
                    isActive
                      ? "text-primary translate-x-0.5"
                      : "-translate-x-1 text-gray-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  )}
                />
              </h3>
              <p className="text-muted mt-1 line-clamp-2 text-xs">
                {t(`devhub.${tab.id}.desc`)}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
