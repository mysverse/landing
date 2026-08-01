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
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

import TabRail, { type DevHubTab } from "./devhub/TabRail";
import DashboardFrame from "./devhub/DashboardFrame";
import {
  type Currency,
  PPTPanel,
  IncentivesPanel,
  BonusesPanel,
  WelcomePackPanel,
  OnboardingPanel
} from "./devhub/panels";

const tabs: DevHubTab[] = [
  { id: "ppt", icon: <BanknotesIcon className="size-5" /> },
  { id: "incentives", icon: <TrophyIcon className="size-5" /> },
  { id: "bonuses", icon: <SparklesIcon className="size-5" /> },
  { id: "welcomePack", icon: <GiftIcon className="size-5" /> },
  { id: "onboarding", icon: <ShieldCheckIcon className="size-5" /> }
];

export default function DevHubSection() {
  const t = useTranslations("Contribute");
  // Until hydration, render the same tree with inert props (no motion
  // components) to prevent React 19 state-update-before-mount warnings.
  const hydrated = useHydration();

  const [activeTab, setActiveTab] = useState("ppt");
  const [points, setPoints] = useState(3);
  const [currency, setCurrency] = useState<Currency>("MYR");
  const [poloSize, setPoloSize] = useState("L");
  const [hoodieSize, setHoodieSize] = useState("XL");

  const currentTab = hydrated ? activeTab : "ppt";

  return (
    <section className="py-12 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            {t("devhub.tagline")}
          </span>
          <h2 className="heading-2 mt-2">{t("devhub.title")}</h2>
          <p className="body-base mt-4 sm:text-lg">{t("devhub.desc")}</p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <TabRail
            tabs={tabs}
            activeTab={currentTab}
            onSelect={hydrated ? setActiveTab : undefined}
            animated={hydrated}
          />

          <div className="flex flex-col justify-center lg:col-span-7">
            <DashboardFrame activeTab={currentTab}>
              {hydrated ? (
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-1 flex-col"
                  >
                    {activeTab === "ppt" && (
                      <PPTPanel
                        points={points}
                        currency={currency}
                        onPointsChange={setPoints}
                        onCurrencyChange={setCurrency}
                      />
                    )}
                    {activeTab === "incentives" && <IncentivesPanel />}
                    {activeTab === "bonuses" && <BonusesPanel />}
                    {activeTab === "welcomePack" && (
                      <WelcomePackPanel
                        poloSize={poloSize}
                        hoodieSize={hoodieSize}
                        onPoloSizeChange={setPoloSize}
                        onHoodieSizeChange={setHoodieSize}
                      />
                    )}
                    {activeTab === "onboarding" && <OnboardingPanel />}
                  </m.div>
                </AnimatePresence>
              ) : (
                <div className="flex flex-1 flex-col">
                  <PPTPanel points={points} currency={currency} />
                </div>
              )}
            </DashboardFrame>
          </div>
        </div>

        {/* Let's Get Started / Checklist block */}
        <div className="border-edge bg-surface-card relative mt-16 overflow-hidden rounded-3xl border p-8 shadow-sm sm:mt-24 sm:p-12">
          <div className="bg-primary/5 pointer-events-none absolute top-0 right-0 -z-10 h-80 w-80 translate-x-20 -translate-y-20 rounded-full blur-3xl" />

          <div className="mx-auto max-w-3xl text-center">
            <h3 className="heading-3 sm:text-3xl">
              {t("devhub.getStarted.title")}
            </h3>
            <p className="body-sm mt-4 sm:text-base">
              {t("devhub.getStarted.subtitle")}
            </p>
          </div>

          <div className="relative mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {(["step1", "step2", "step3"] as const).map((step, index) => (
              <div
                key={step}
                className="flex flex-col items-center p-4 text-center"
              >
                <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold">
                  {index + 1}
                </div>
                <h4 className="text-strong mt-4 text-sm leading-snug font-semibold">
                  {t(`devhub.getStarted.${step}`)}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
