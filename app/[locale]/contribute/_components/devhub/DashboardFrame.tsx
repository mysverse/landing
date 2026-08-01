"use client";

import type { ReactNode } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

/**
 * The fake DevHub "app window": browser chrome, sidebar, and the tabpanel
 * content area. Intentionally dark in both themes — it depicts an app UI.
 */
export default function DashboardFrame({
  activeTab,
  children
}: {
  activeTab: string;
  children: ReactNode;
}) {
  const t = useTranslations("Contribute.devhub.mock.sidebar");

  return (
    <div className="border-edge relative flex h-120 flex-col overflow-hidden rounded-3xl border bg-gray-900 p-1 shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/5 bg-gray-950 px-4 py-3 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-500/80" />
          <span className="size-2 rounded-full bg-yellow-500/80" />
          <span className="size-2 rounded-full bg-green-500/80" />
          <span className="ml-2 flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-green-400">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-green-400" />
            DEVHUB_LIVE
          </span>
        </div>
        <div className="font-mono text-[10px] text-white/40">
          Dashboard &gt; {activeTab.toUpperCase()}
        </div>
      </div>

      {/* Sidebar + content */}
      <div className="flex flex-1 overflow-hidden bg-gray-900">
        <div className="hidden w-32 shrink-0 flex-col gap-2.5 border-r border-white/5 bg-gray-950 p-3.5 text-[10px] font-medium text-white/40 sm:flex">
          <div className="border-primary border-l-2 px-2 py-1 font-bold text-white/70">
            {t("overview")}
          </div>
          <div className="px-2 py-1 transition-colors hover:text-white/70">
            {t("linearSync")}
          </div>
          <div className="px-2 py-1 transition-colors hover:text-white/70">
            {t("payouts")}
          </div>
          <div className="px-2 py-1 transition-colors hover:text-white/70">
            {t("welcomePack")}
          </div>
          <div className="px-2 py-1 transition-colors hover:text-white/70">
            {t("ndaCoi")}
          </div>
          <div className="mt-auto flex items-center gap-1 px-2 py-1 text-green-400/80">
            <ShieldCheckIcon className="size-3" />
            {t("verified")}
          </div>
        </div>

        <div
          id="devhub-panel"
          role="tabpanel"
          aria-labelledby={`devhub-tab-${activeTab}`}
          className="flex flex-1 flex-col overflow-y-auto p-5 text-white"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
