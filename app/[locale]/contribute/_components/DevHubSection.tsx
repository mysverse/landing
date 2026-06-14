"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { useHydration } from "hooks/useHydration";
import {
  BanknotesIcon,
  TrophyIcon,
  SparklesIcon,
  GiftIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  TruckIcon
} from "@heroicons/react/24/outline";

export default function DevHubSection() {
  const t = useTranslations("Contribute");
  const hydrated = useHydration();

  const [activeTab, setActiveTab] = useState("ppt");
  const [points, setPoints] = useState(3);
  const [currency, setCurrency] = useState<"MYR" | "Robux">("MYR");
  const [selectedPoloSize, setSelectedPoloSize] = useState("L");
  const [selectedHoodieSize, setSelectedHoodieSize] = useState("XL");

  const tabs = [
    { id: "ppt", icon: <BanknotesIcon className="size-5" /> },
    { id: "incentives", icon: <TrophyIcon className="size-5" /> },
    { id: "bonuses", icon: <SparklesIcon className="size-5" /> },
    { id: "welcomePack", icon: <GiftIcon className="size-5" /> },
    { id: "onboarding", icon: <ShieldCheckIcon className="size-5" /> }
  ];

  // If not hydrated yet, render the static layout without motion components
  // to prevent React 19 state-update-before-mount console warnings.
  if (!hydrated) {
    return (
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {t("devhub.tagline")}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {t("devhub.title")}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-white/80">
              {t("devhub.desc")}
            </p>
          </div>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
            {/* Left Side: Navigation Tabs / Description */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
              {tabs.map((tab) => {
                const isActive = tab.id === "ppt"; // default tab
                return (
                  <div
                    key={tab.id}
                    className={`group relative flex items-start gap-4 rounded-2xl p-4 text-left border ${
                      isActive
                        ? "border-primary/25 bg-primary/[0.03] dark:bg-primary/[0.02]"
                        : "border-transparent"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary" />
                    )}
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/60"
                      }`}
                    >
                      {tab.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-semibold flex items-center gap-1.5 ${
                          isActive ? "text-primary" : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {t(`devhub.${tab.id}.title`)}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-white/60 line-clamp-2">
                        {t(`devhub.${tab.id}.desc`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Side: Static DevHub Dashboard Mockup */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-900 shadow-2xl p-1 flex flex-col h-[480px]">
                {/* Dashboard Browser/App Header Chrome */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gray-950 text-white/50 text-[10px] tracking-wider uppercase font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-red-500/80" />
                    <span className="size-2 rounded-full bg-yellow-500/80" />
                    <span className="size-2 rounded-full bg-green-500/80" />
                    <span className="ml-2 px-2 py-0.5 rounded bg-white/5 text-[9px] text-green-400 font-mono flex items-center gap-1">
                      <span className="inline-block size-1.5 rounded-full bg-green-400 animate-pulse" />
                      DEVHUB_LIVE
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-white/40">
                    Dashboard &gt; PPT
                  </div>
                </div>

                {/* DevHub Sidebar + Content mockup */}
                <div className="flex-1 flex overflow-hidden bg-gray-900">
                  {/* Mock Dashboard Sidebar */}
                  <div className="hidden sm:flex w-32 shrink-0 flex-col gap-2.5 p-3.5 border-r border-white/5 bg-gray-950 text-white/40 text-[10px] font-medium">
                    <div className="py-1 px-2 text-white/70 font-bold border-l-2 border-primary">
                      Overview
                    </div>
                    <div className="py-1 px-2 hover:text-white/70 transition-colors">
                      Linear Sync
                    </div>
                    <div className="py-1 px-2 hover:text-white/70 transition-colors">
                      Payouts (PPT)
                    </div>
                    <div className="py-1 px-2 hover:text-white/70 transition-colors">
                      Welcome Pack
                    </div>
                    <div className="py-1 px-2 hover:text-white/70 transition-colors">
                      NDA & COI
                    </div>
                    <div className="mt-auto py-1 px-2 flex items-center gap-1 text-green-400/80">
                      <ShieldCheckIcon className="size-3" />
                      Verified
                    </div>
                  </div>

                  {/* Dashboard Main Content Panel */}
                  <div className="flex-1 p-5 overflow-y-auto text-white flex flex-col">
                    <StaticPPTPanel />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Let's Get Started / Checklist block */}
          <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-20 -translate-y-20 pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                {t("devhub.getStarted.title")}
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-600 dark:text-white/80">
                {t("devhub.getStarted.subtitle")}
              </p>
            </div>

            <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 relative">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl text-lg font-bold shrink-0">
                  1
                </div>
                <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                  {t("devhub.getStarted.step1")}
                </h4>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl text-lg font-bold shrink-0">
                  2
                </div>
                <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                  {t("devhub.getStarted.step2")}
                </h4>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl text-lg font-bold shrink-0">
                  3
                </div>
                <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                  {t("devhub.getStarted.step3")}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Interactive client-side version (fully animated)
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {t("devhub.tagline")}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("devhub.title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-white/80">
            {t("devhub.desc")}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Side: Navigation Tabs / Description */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-start gap-4 rounded-2xl p-4 text-left transition-all border ${
                    isActive
                      ? "border-primary/25 bg-primary/[0.03] dark:bg-primary/[0.02]"
                      : "border-transparent hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Active Highlight Bar */}
                  {isActive && (
                    <m.div
                      layoutId="active-tab-bar"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/60 group-hover:text-gray-955 dark:group-hover:text-white"
                    }`}
                  >
                    {tab.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? "text-primary"
                          : "text-gray-900 dark:text-white group-hover:text-primary"
                      }`}
                    >
                      {t(`devhub.${tab.id}.title`)}
                      <ChevronRightIcon
                        className={`size-3.5 transition-transform duration-200 ${
                          isActive
                            ? "translate-x-0.5 text-primary"
                            : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400"
                        }`}
                      />
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-white/60 line-clamp-2">
                      {t(`devhub.${tab.id}.desc`)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Interactive DevHub Dashboard Mockup */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-900 shadow-2xl p-1 flex flex-col h-[480px]">
              {/* Dashboard Browser/App Header Chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gray-955 text-white/50 text-[10px] tracking-wider uppercase font-semibold">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-red-500/80" />
                  <span className="size-2 rounded-full bg-yellow-500/80" />
                  <span className="size-2 rounded-full bg-green-500/80" />
                  <span className="ml-2 px-2 py-0.5 rounded bg-white/5 text-[9px] text-green-400 font-mono flex items-center gap-1">
                    <span className="inline-block size-1.5 rounded-full bg-green-400 animate-pulse" />
                    DEVHUB_LIVE
                  </span>
                </div>
                <div className="text-[9px] font-mono text-white/40">
                  Dashboard &gt; {activeTab.toUpperCase()}
                </div>
              </div>

              {/* DevHub Sidebar + Content mockup */}
              <div className="flex-1 flex overflow-hidden bg-gray-900">
                {/* Mock Dashboard Sidebar */}
                <div className="hidden sm:flex w-32 shrink-0 flex-col gap-2.5 p-3.5 border-r border-white/5 bg-gray-950 text-white/40 text-[10px] font-medium">
                  <div className="py-1 px-2 text-white/70 font-bold border-l-2 border-primary">
                    Overview
                  </div>
                  <div className="py-1 px-2 hover:text-white/70 transition-colors">
                    Linear Sync
                  </div>
                  <div className="py-1 px-2 hover:text-white/70 transition-colors">
                    Payouts (PPT)
                  </div>
                  <div className="py-1 px-2 hover:text-white/70 transition-colors">
                    Welcome Pack
                  </div>
                  <div className="py-1 px-2 hover:text-white/70 transition-colors">
                    NDA & COI
                  </div>
                  <div className="mt-auto py-1 px-2 flex items-center gap-1 text-green-400/80">
                    <ShieldCheckIcon className="size-3" />
                    Verified
                  </div>
                </div>

                {/* Dashboard Main Content Panel */}
                <div className="flex-1 p-5 overflow-y-auto text-white flex flex-col">
                  <AnimatePresence mode="wait">
                    {activeTab === "ppt" && (
                      <m.div
                        key="ppt-mock"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-base font-bold text-white flex items-center gap-2">
                                <BanknotesIcon className="size-5 text-primary" />
                                {t("devhub.ppt.title")}
                              </h4>
                              <p className="mt-1.5 text-xs text-white/75 leading-relaxed">
                                {t("devhub.ppt.desc")}
                              </p>
                            </div>
                          </div>

                          {/* PPT Calculator Widget */}
                          <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between text-xs font-semibold text-white/70">
                              <span>{t("devhub.ppt.currency")}</span>
                              <div className="flex gap-1.5 bg-black/40 p-0.5 rounded-lg border border-white/10">
                                <button
                                  onClick={() => setCurrency("MYR")}
                                  className={`px-2 py-1 rounded-md text-[10px] transition-colors ${
                                    currency === "MYR"
                                      ? "bg-primary text-white"
                                      : "text-white/60 hover:text-white"
                                  }`}
                                >
                                  MYR (RM)
                                </button>
                                <button
                                  onClick={() => setCurrency("Robux")}
                                  className={`px-2 py-1 rounded-md text-[10px] transition-colors ${
                                    currency === "Robux"
                                      ? "bg-primary text-white"
                                      : "text-white/60 hover:text-white"
                                  }`}
                                >
                                  Robux
                                </button>
                              </div>
                            </div>

                            {/* Estimation Point Slider */}
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="text-white/60 font-medium">Linear Estimation Points</span>
                                <span className="font-mono text-primary text-sm font-bold">
                                  {points} {points === 1 ? "Point" : "Points"}
                                </span>
                              </div>
                              <input
                                type="range"
                                min="1"
                                max="8"
                                value={points}
                                onChange={(e) => setPoints(Number(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                              />
                              <div className="flex justify-between text-[9px] text-white/40 font-mono mt-1">
                                <span>1 Pt</span>
                                <span>3 Pt</span>
                                <span>5 Pt</span>
                                <span>8 Pt</span>
                              </div>
                            </div>

                            {/* Calculation Display */}
                            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                              <span className="text-xs text-white/60">Guaranteed Payout</span>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-400 font-mono">
                                  {currency === "MYR"
                                    ? `RM ${(points * 20).toFixed(2)}`
                                    : `${(points * 1200).toLocaleString()} Robux`}
                                </div>
                                <div className="text-[9px] text-white/40">
                                  @{" "}
                                  {currency === "MYR"
                                    ? "RM 20.00 / point"
                                    : "1,200 Robux / point"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Extra Details footer inside dashboard */}
                        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-white/50">
                          <span className="flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-green-400" />
                            {t("devhub.ppt.weekly")}
                          </span>
                          <button className="flex items-center justify-center gap-1 text-primary hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded">
                            <ArrowDownTrayIcon className="size-3" />
                            PDF Slip
                          </button>
                        </div>
                      </m.div>
                    )}

                    {activeTab === "incentives" && (
                      <m.div
                        key="incentives-mock"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-base font-bold text-white flex items-center gap-2">
                            <TrophyIcon className="size-5 text-primary" />
                            {t("devhub.incentives.title")}
                          </h4>
                          <p className="mt-1.5 text-xs text-white/75 leading-relaxed">
                            {t("devhub.incentives.desc")}
                          </p>

                          {/* Throughput Progress Bar */}
                          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-white/80">Weekly Throughput</span>
                              <span className="font-mono text-green-400 text-xs font-bold">5 / 5 Tasks</span>
                            </div>
                            <div className="mt-2 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                              <m.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="bg-green-400 h-full rounded-full"
                              />
                            </div>
                            <p className="mt-2 text-[9px] text-white/55 leading-relaxed">
                              🎉 {t("devhub.incentives.throughput")}
                            </p>
                          </div>

                          {/* Kickers and streaks */}
                          <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px]">
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                              <span className="text-white/40 block">Streak Bonus</span>
                              <span className="font-bold text-yellow-400 block mt-0.5">3 Weeks Row</span>
                              <span className="text-[8px] text-white/60 block mt-1">Kickers Stacked</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                              <span className="text-white/40 block">Daily Target</span>
                              <span className="font-bold text-blue-400 block mt-0.5">Active-Day</span>
                              <span className="text-[8px] text-white/60 block mt-1">Extra payout kicker</span>
                            </div>
                          </div>

                          {/* Lifetime Milestones list */}
                          <div className="mt-4">
                            <h5 className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                              {t("devhub.incentives.milestones.title")}
                            </h5>
                            <div className="mt-2 space-y-1.5">
                              <div className="flex items-center justify-between text-[10px] p-1.5 rounded bg-white/5 border-l-2 border-green-500">
                                <span className="text-white/80">{t("devhub.incentives.milestones.task25")}</span>
                                <span className="text-green-400 font-mono text-[9px] uppercase font-bold">Paid</span>
                              </div>
                              <div className="flex items-center justify-between text-[10px] p-1.5 rounded bg-white/5 border-l-2 border-green-500">
                                <span className="text-white/80">{t("devhub.incentives.milestones.task50")}</span>
                                <span className="text-green-400 font-mono text-[9px] uppercase font-bold">Paid</span>
                              </div>
                              <div className="flex items-center justify-between text-[10px] p-1.5 rounded bg-white/5 border-l-2 border-primary">
                                <span className="text-white/80">{t("devhub.incentives.milestones.task100")}</span>
                                <span className="text-primary font-mono text-[9px] uppercase font-bold">68 / 100</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </m.div>
                    )}

                    {activeTab === "bonuses" && (
                      <m.div
                        key="bonuses-mock"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-base font-bold text-white flex items-center gap-2">
                            <SparklesIcon className="size-5 text-primary" />
                            {t("devhub.bonuses.title")}
                          </h4>
                          <p className="mt-1.5 text-xs text-white/75 leading-relaxed">
                            {t("devhub.bonuses.desc")}
                          </p>

                          {/* Synced Linear tasks list */}
                          <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2">
                              <span className="font-bold text-white/40 uppercase tracking-wide">
                                Linear Non-PPT Tasks (Synced)
                              </span>
                              <span className="text-primary font-mono font-semibold flex items-center gap-1">
                                <span className="inline-block size-1 bg-primary rounded-full animate-ping" />
                                Synced
                              </span>
                            </div>
                            <div className="mt-2.5 space-y-2 text-[10px]">
                              <div className="flex items-center justify-between">
                                <span className="text-white/80 truncate max-w-[200px]">
                                  [Bugfix] Lebuhraya Vehicle Collision
                                </span>
                                <span className="text-yellow-400 px-1.5 py-0.5 rounded bg-yellow-400/10 font-mono text-[9px]">
                                  Bonus Candidate
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/80 truncate max-w-[200px]">
                                  [Refactor] Roblox Character Spawning
                                </span>
                                <span className="text-yellow-400 px-1.5 py-0.5 rounded bg-yellow-400/10 font-mono text-[9px]">
                                  Bonus Candidate
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/80 truncate max-w-[200px]">
                                  [Docs] API Onboarding Guide
                                </span>
                                <span className="text-yellow-400 px-1.5 py-0.5 rounded bg-yellow-400/10 font-mono text-[9px]">
                                  Bonus Candidate
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Potential Earnings sync */}
                          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-between">
                            <div className="flex-1">
                              <span className="text-[10px] text-white/60 block">Potential Monthly Bonus</span>
                              <span className="text-[9px] text-white/40 block mt-0.5">{t("devhub.bonuses.sync")}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-mono font-bold text-primary block">Up to RM60.00</span>
                              <span className="text-[9px] text-white/40 block">3,000 Robux equivalent</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-[9.5px] text-white/40 flex items-center gap-1.5">
                          <CheckCircleIcon className="size-3.5 text-green-400 shrink-0" />
                          {t("devhub.bonuses.alerts")}
                        </div>
                      </m.div>
                    )}

                    {activeTab === "welcomePack" && (
                      <m.div
                        key="welcome-mock"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-base font-bold text-white flex items-center gap-2">
                            <GiftIcon className="size-5 text-primary" />
                            {t("devhub.welcomePack.title")}
                          </h4>
                          <p className="mt-1.5 text-xs text-white/75 leading-relaxed">
                            {t("devhub.welcomePack.desc")}
                          </p>

                          {/* Merch selection */}
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] text-white/40 uppercase block">Embroidered Polo</span>
                                <span className="text-[11px] font-semibold text-white block mt-0.5">{t("devhub.welcomePack.polo")}</span>
                              </div>
                              <div className="mt-3 flex items-center justify-between text-[10px]">
                                <span className="text-white/55">Size:</span>
                                <select
                                  value={selectedPoloSize}
                                  onChange={(e) => setSelectedPoloSize(e.target.value)}
                                  className="bg-black/50 border border-white/10 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none"
                                >
                                  {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((sz) => (
                                    <option key={sz} value={sz}>
                                      {sz}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] text-white/40 uppercase block">Premium Hoodie</span>
                                <span className="text-[11px] font-semibold text-white block mt-0.5">{t("devhub.welcomePack.hoodie")}</span>
                              </div>
                              <div className="mt-3 flex items-center justify-between text-[10px]">
                                <span className="text-white/55">Size:</span>
                                <select
                                  value={selectedHoodieSize}
                                  onChange={(e) => setSelectedHoodieSize(e.target.value)}
                                  className="bg-black/50 border border-white/10 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none"
                                >
                                  {["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"].map((sz) => (
                                    <option key={sz} value={sz}>
                                      {sz}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Package items list */}
                          <p className="mt-3 text-[10px] text-white/60 leading-relaxed">
                            {t("devhub.welcomePack.items")}{" "}
                            <span className="text-white/80 font-medium">
                              {t("devhub.welcomePack.lanyard")}, {t("devhub.welcomePack.sticker")}, {t("devhub.welcomePack.tote")}
                            </span>
                          </p>
                        </div>

                        {/* Shipment Tracker Mockup */}
                        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="bg-primary/20 text-primary p-1.5 rounded-lg shrink-0">
                              <TruckIcon className="size-4" />
                            </div>
                            <div>
                              <span className="text-[9px] text-white/40 block">{t("devhub.welcomePack.tracking")}</span>
                              <span className="text-[10px] font-semibold text-white block mt-0.5">MY-8762-DEV</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-400/20 text-green-400 font-mono font-bold uppercase tracking-wider">
                              In Transit
                            </span>
                            <span className="text-[8px] text-white/40 block mt-1">Est: 2-3 Days</span>
                          </div>
                        </div>
                      </m.div>
                    )}

                    {activeTab === "onboarding" && (
                      <m.div
                        key="onboarding-mock"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-base font-bold text-white flex items-center gap-2">
                            <ShieldCheckIcon className="size-5 text-primary" />
                            {t("devhub.onboarding.title")}
                          </h4>
                          <p className="mt-1.5 text-xs text-white/75 leading-relaxed">
                            {t("devhub.onboarding.desc")}
                          </p>

                          {/* Integration List Checklist */}
                          <div className="mt-4 space-y-2 text-[10px]">
                            <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
                              <div className="flex items-center gap-2">
                                <CheckCircleIcon className="size-4 text-green-400 shrink-0" />
                                <span>Linear Workspace Account Linked</span>
                              </div>
                              <span className="text-white/45 font-mono text-[9px]">Linear OAuth</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
                              <div className="flex items-center gap-2">
                                <CheckCircleIcon className="size-4 text-green-400 shrink-0" />
                                <span>Discord Developer Role Synced</span>
                              </div>
                              <span className="text-green-400 font-mono text-[9px] font-bold">Developer Role</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
                              <div className="flex items-center gap-2">
                                <CheckCircleIcon className="size-4 text-green-400 shrink-0" />
                                <span>Roblox Group Access & Rank Synced</span>
                              </div>
                              <span className="text-green-400 font-mono text-[9px] font-bold">Dev Rank</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
                              <div className="flex items-center gap-2">
                                <CheckCircleIcon className="size-4 text-green-400 shrink-0" />
                                <span>NDA & Conflict of Interest (COI) Signed</span>
                              </div>
                              <span className="text-white/45 font-mono text-[9px]">Paperless eSign</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
                              <div className="flex items-center gap-2">
                                <CheckCircleIcon className="size-4 text-green-400 shrink-0" />
                                <span>KYC Identity Verification</span>
                              </div>
                              <span className="text-green-400 font-mono text-[9px] font-bold">Complete</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-white/50">
                          <span className="flex items-center gap-1 text-green-400">
                            <span className="size-1.5 rounded-full bg-green-400" />
                            Onboarding 100% Complete
                          </span>
                          <span className="font-mono text-white/40">Status: Active Developer</span>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Get Started / Checklist block */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900 overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-20 -translate-y-20 pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              {t("devhub.getStarted.title")}
            </h3>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-600 dark:text-white/80">
              {t("devhub.getStarted.subtitle")}
            </p>
          </div>

          <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 relative">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl text-lg font-bold shrink-0">
                1
              </div>
              <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                {t("devhub.getStarted.step1")}
              </h4>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl text-lg font-bold shrink-0">
                2
              </div>
              <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                {t("devhub.getStarted.step2")}
              </h4>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl text-lg font-bold shrink-0">
                3
              </div>
              <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                {t("devhub.getStarted.step3")}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticPPTPanel() {
  const t = useTranslations("Contribute");
  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <BanknotesIcon className="size-5 text-primary" />
              {t("devhub.ppt.title")}
            </h4>
            <p className="mt-1.5 text-xs text-white/75 leading-relaxed">
              {t("devhub.ppt.desc")}
            </p>
          </div>
        </div>

        {/* PPT Calculator Widget */}
        <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-xs font-semibold text-white/70">
            <span>{t("devhub.ppt.currency")}</span>
            <div className="flex gap-1.5 bg-black/40 p-0.5 rounded-lg border border-white/10">
              <button className="px-2 py-1 rounded-md text-[10px] bg-primary text-white">
                MYR (RM)
              </button>
              <button className="px-2 py-1 rounded-md text-[10px] text-white/60">
                Robux
              </button>
            </div>
          </div>

          {/* Estimation Point Slider */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-white/60 font-medium">Linear Estimation Points</span>
              <span className="font-mono text-primary text-sm font-bold">3 Points</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={3}
              readOnly
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[9px] text-white/40 font-mono mt-1">
              <span>1 Pt</span>
              <span>3 Pt</span>
              <span>5 Pt</span>
              <span>8 Pt</span>
            </div>
          </div>

          {/* Calculation Display */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-white/60">Guaranteed Payout</span>
            <div className="text-right">
              <div className="text-lg font-bold text-green-400 font-mono">RM 60.00</div>
              <div className="text-[9px] text-white/40">@ RM 20.00 / point</div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Details footer inside dashboard */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-white/50">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-green-400" />
          {t("devhub.ppt.weekly")}
        </span>
        <button className="flex items-center justify-center gap-1 text-primary bg-white/5 px-2 py-1 rounded">
          <ArrowDownTrayIcon className="size-3" />
          PDF Slip
        </button>
      </div>
    </div>
  );
}
