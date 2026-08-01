"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import {
  ArrowDownTrayIcon,
  BanknotesIcon,
  CheckCircleIcon,
  GiftIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TrophyIcon,
  TruckIcon
} from "@heroicons/react/24/outline";

export type Currency = "MYR" | "Robux";

const POLO_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const HOODIE_SIZES = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

/**
 * PPT calculator panel. Handlers are optional so the pre-hydration static
 * pass renders identical (inert) markup — no drift between the two states.
 */
export function PPTPanel({
  points,
  currency,
  onPointsChange,
  onCurrencyChange
}: {
  points: number;
  currency: Currency;
  onPointsChange?: (points: number) => void;
  onCurrencyChange?: (currency: Currency) => void;
}) {
  const t = useTranslations("Contribute");
  const tm = useTranslations("Contribute.devhub.mock.ppt");

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="flex items-center gap-2 text-base font-bold text-white">
              <BanknotesIcon className="text-primary size-5" />
              {t("devhub.ppt.title")}
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-white/75">
              {t("devhub.ppt.desc")}
            </p>
          </div>
        </div>

        {/* PPT Calculator Widget */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-white/70">
            <span>{t("devhub.ppt.currency")}</span>
            <div className="flex gap-1.5 rounded-lg border border-white/10 bg-black/40 p-0.5">
              {(["MYR", "Robux"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={currency === option}
                  onClick={
                    onCurrencyChange
                      ? () => onCurrencyChange(option)
                      : undefined
                  }
                  className={`focus-visible:outline-primary rounded-md px-2 py-1 text-[10px] transition-colors focus-visible:outline-2 ${
                    currency === option
                      ? "bg-primary text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {option === "MYR" ? "MYR (RM)" : "Robux"}
                </button>
              ))}
            </div>
          </div>

          {/* Estimation Point Slider */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-white/60">
                {tm("estimationPoints")}
              </span>
              <span className="text-primary font-mono text-sm font-bold">
                {tm("points", { count: points })}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={points}
              aria-label={tm("estimationPoints")}
              onChange={
                onPointsChange
                  ? (e) => onPointsChange(Number(e.target.value))
                  : undefined
              }
              readOnly={!onPointsChange}
              className="accent-primary focus-visible:outline-primary h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-white/40">
              <span>1 Pt</span>
              <span>2 Pt</span>
              <span>3 Pt</span>
              <span>4 Pt</span>
              <span>5 Pt</span>
            </div>
          </div>

          {/* Calculation Display */}
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
            <span className="text-xs text-white/60">
              {tm("guaranteedPayout")}
            </span>
            <div className="text-right">
              <div className="font-mono text-lg font-bold text-green-400">
                {currency === "MYR"
                  ? `RM ${(points * 20).toFixed(2)}`
                  : `${(points * 1200).toLocaleString()} Robux`}
              </div>
              <div className="text-[10px] text-white/40">
                {currency === "MYR" ? tm("rateMyr") : tm("rateRobux")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col justify-between gap-2 border-t border-white/5 pt-3 text-[10px] text-white/50 sm:flex-row sm:items-center">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-green-400" />
          {t("devhub.ppt.weekly")}
        </span>
        <button
          type="button"
          className="text-primary focus-visible:outline-primary flex items-center justify-center gap-1 rounded bg-white/5 px-2 py-1 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2"
        >
          <ArrowDownTrayIcon className="size-3" />
          {tm("pdfSlip")}
        </button>
      </div>
    </div>
  );
}

export function IncentivesPanel() {
  const t = useTranslations("Contribute");
  const tm = useTranslations("Contribute.devhub.mock.incentives");

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <h4 className="flex items-center gap-2 text-base font-bold text-white">
          <TrophyIcon className="text-primary size-5" />
          {t("devhub.incentives.title")}
        </h4>
        <p className="mt-1.5 text-xs leading-relaxed text-white/75">
          {t("devhub.incentives.desc")}
        </p>

        {/* Throughput Progress Bar */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white/80">
              {tm("throughputTitle")}
            </span>
            <span className="font-mono text-xs font-bold text-green-400">
              {tm("tasksDone")}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <m.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-green-400"
            />
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-white/55">
            🎉 {t("devhub.incentives.throughput")}
          </p>
        </div>

        {/* Kickers and streaks */}
        <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px]">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
            <span className="block text-white/40">{tm("streakBonus")}</span>
            <span className="mt-0.5 block font-bold text-yellow-400">
              {tm("streakValue")}
            </span>
            <span className="mt-1 block text-[10px] text-white/60">
              {tm("streakNote")}
            </span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
            <span className="block text-white/40">{tm("dailyTarget")}</span>
            <span className="mt-0.5 block font-bold text-blue-400">
              {tm("dailyValue")}
            </span>
            <span className="mt-1 block text-[10px] text-white/60">
              {tm("dailyNote")}
            </span>
          </div>
        </div>

        {/* Lifetime Milestones list */}
        <div className="mt-4">
          <h5 className="text-xs font-bold tracking-wider text-white/70 uppercase">
            {t("devhub.incentives.milestones.title")}
          </h5>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between rounded border-l-2 border-green-500 bg-white/5 p-1.5 text-[10px]">
              <span className="text-white/80">
                {t("devhub.incentives.milestones.task25")}
              </span>
              <span className="font-mono text-[10px] font-bold text-green-400 uppercase">
                {tm("paid")}
              </span>
            </div>
            <div className="flex items-center justify-between rounded border-l-2 border-green-500 bg-white/5 p-1.5 text-[10px]">
              <span className="text-white/80">
                {t("devhub.incentives.milestones.task50")}
              </span>
              <span className="font-mono text-[10px] font-bold text-green-400 uppercase">
                {tm("paid")}
              </span>
            </div>
            <div className="border-primary flex items-center justify-between rounded border-l-2 bg-white/5 p-1.5 text-[10px]">
              <span className="text-white/80">
                {t("devhub.incentives.milestones.task100")}
              </span>
              <span className="text-primary font-mono text-[10px] font-bold uppercase">
                68 / 100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BonusesPanel() {
  const t = useTranslations("Contribute");
  const tm = useTranslations("Contribute.devhub.mock.bonuses");

  const mockTasks = [tm("task1"), tm("task2"), tm("task3")];

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <h4 className="flex items-center gap-2 text-base font-bold text-white">
          <SparklesIcon className="text-primary size-5" />
          {t("devhub.bonuses.title")}
        </h4>
        <p className="mt-1.5 text-xs leading-relaxed text-white/75">
          {t("devhub.bonuses.desc")}
        </p>

        {/* Synced Linear tasks list */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3.5">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px]">
            <span className="font-bold tracking-wide text-white/40 uppercase">
              {tm("syncedTitle")}
            </span>
            <span className="text-primary flex items-center gap-1 font-mono font-semibold">
              <span className="bg-primary inline-block size-1 animate-ping rounded-full" />
              {tm("synced")}
            </span>
          </div>
          <div className="mt-2.5 space-y-2 text-[10px]">
            {mockTasks.map((task) => (
              <div key={task} className="flex items-center justify-between">
                <span className="max-w-[200px] truncate text-white/80">
                  {task}
                </span>
                <span className="rounded bg-yellow-400/10 px-1.5 py-0.5 font-mono text-[10px] text-yellow-400">
                  {tm("candidate")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Potential Earnings sync */}
        <div className="from-primary/10 to-primary/5 border-primary/20 mt-4 flex items-center justify-between rounded-xl border bg-linear-to-r p-3">
          <div className="flex-1">
            <span className="block text-[10px] text-white/60">
              {tm("potentialTitle")}
            </span>
            <span className="mt-0.5 block text-[10px] text-white/40">
              {t("devhub.bonuses.sync")}
            </span>
          </div>
          <div className="text-right">
            <span className="text-primary block font-mono text-sm font-bold">
              {tm("upTo")}
            </span>
            <span className="block text-[10px] text-white/40">
              {tm("robuxEquiv")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-[10px] text-white/40">
        <CheckCircleIcon className="size-3.5 shrink-0 text-green-400" />
        {t("devhub.bonuses.alerts")}
      </div>
    </div>
  );
}

export function WelcomePackPanel({
  poloSize,
  hoodieSize,
  onPoloSizeChange,
  onHoodieSizeChange
}: {
  poloSize: string;
  hoodieSize: string;
  onPoloSizeChange?: (size: string) => void;
  onHoodieSizeChange?: (size: string) => void;
}) {
  const t = useTranslations("Contribute");
  const tm = useTranslations("Contribute.devhub.mock.welcomePackMock");

  const merch = [
    {
      label: tm("poloLabel"),
      name: t("devhub.welcomePack.polo"),
      sizes: POLO_SIZES,
      value: poloSize,
      onChange: onPoloSizeChange
    },
    {
      label: tm("hoodieLabel"),
      name: t("devhub.welcomePack.hoodie"),
      sizes: HOODIE_SIZES,
      value: hoodieSize,
      onChange: onHoodieSizeChange
    }
  ];

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <h4 className="flex items-center gap-2 text-base font-bold text-white">
          <GiftIcon className="text-primary size-5" />
          {t("devhub.welcomePack.title")}
        </h4>
        <p className="mt-1.5 text-xs leading-relaxed text-white/75">
          {t("devhub.welcomePack.desc")}
        </p>

        {/* Merch selection and image container */}
        <div className="mt-4 grid grid-cols-1 items-stretch gap-3.5 sm:grid-cols-12">
          {/* Controls */}
          <div className="flex flex-col justify-between gap-3 sm:col-span-7">
            <div className="grid grid-cols-2 gap-2">
              {merch.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-2.5"
                >
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[10px] font-semibold text-white">
                      {item.name}
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[10px]">
                    <span className="text-white/55">{tm("size")}</span>
                    <select
                      value={item.value}
                      aria-label={`${item.label} — ${tm("size")}`}
                      onChange={
                        item.onChange
                          ? (e) => item.onChange!(e.target.value)
                          : undefined
                      }
                      disabled={!item.onChange}
                      className="focus-visible:outline-primary rounded border border-white/10 bg-black/50 px-1.5 py-0.5 text-xs text-white focus-visible:outline-2"
                    >
                      {item.sizes.map((sz) => (
                        <option key={sz} value={sz}>
                          {sz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] leading-relaxed text-white/60">
              {t("devhub.welcomePack.items")}{" "}
              <span className="font-medium text-white/80">
                {t("devhub.welcomePack.lanyard")},{" "}
                {t("devhub.welcomePack.sticker")},{" "}
                {t("devhub.welcomePack.tote")}
              </span>
            </p>
          </div>

          {/* Welcome Pack Image */}
          <div className="flex items-center justify-center sm:col-span-5">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 sm:aspect-square">
              <Image
                src="/img/contribute/welcome_pack.jpg"
                alt={tm("packAlt")}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, 150px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Tracker Mockup */}
      <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/20 text-primary shrink-0 rounded-lg p-1.5">
            <TruckIcon className="size-4" />
          </div>
          <div>
            <span className="block text-[10px] text-white/40">
              {t("devhub.welcomePack.tracking")}
            </span>
            <span className="mt-0.5 block text-[10px] font-semibold text-white">
              MY-8762-DEV
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="rounded bg-green-400/20 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-green-400 uppercase">
            {tm("inTransit")}
          </span>
          <span className="mt-1 block text-[10px] text-white/40">
            {tm("eta")}
          </span>
        </div>
      </div>
    </div>
  );
}

export function OnboardingPanel() {
  const t = useTranslations("Contribute");
  const tm = useTranslations("Contribute.devhub.mock.onboarding");

  const checklist = [
    { label: tm("linearLinked"), status: tm("linearMethod"), done: false },
    { label: tm("discordSynced"), status: tm("discordRole"), done: true },
    { label: tm("robloxSynced"), status: tm("robloxRank"), done: true },
    { label: tm("ndaSigned"), status: tm("ndaMethod"), done: false },
    { label: tm("kyc"), status: tm("kycStatus"), done: true }
  ];

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <h4 className="flex items-center gap-2 text-base font-bold text-white">
          <ShieldCheckIcon className="text-primary size-5" />
          {t("devhub.onboarding.title")}
        </h4>
        <p className="mt-1.5 text-xs leading-relaxed text-white/75">
          {t("devhub.onboarding.desc")}
        </p>

        {/* Integration List Checklist */}
        <div className="mt-4 space-y-2 text-[10px]">
          {checklist.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded border border-white/10 bg-white/5 p-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="size-4 shrink-0 text-green-400" />
                <span>{item.label}</span>
              </div>
              <span
                className={
                  item.done
                    ? "font-mono text-[10px] font-bold text-green-400"
                    : "font-mono text-[10px] text-white/45"
                }
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[10px] text-white/50">
        <span className="flex items-center gap-1 text-green-400">
          <span className="size-1.5 rounded-full bg-green-400" />
          {tm("complete")}
        </span>
        <span className="font-mono text-white/40">{tm("statusActive")}</span>
      </div>
    </div>
  );
}
