"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import { useTheme } from "./ThemeProvider";
import { useHydration } from "hooks/useHydration";

const buttonClasses =
  "focus-visible:outline-primary cursor-pointer rounded-lg p-2 transition hover:bg-black/20 focus-visible:outline-2 dark:hover:bg-white/20";

export default function DarkModeToggle() {
  const mounted = useHydration();
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("Header");

  if (!mounted) {
    // return a placeholder to avoid layout shift
    return (
      <button
        type="button"
        aria-label={t("sr.toggleTheme")}
        className={buttonClasses}
      >
        <SunIcon className="size-8 text-yellow-500" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={t("sr.toggleTheme")}
      onClick={
        // Toggle between light and dark mode
        () => setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      className={buttonClasses}
    >
      {resolvedTheme === "dark" ? (
        // Show sun icon when dark mode is active (click to switch to light mode)
        <SunIcon className="size-8 text-yellow-500" aria-hidden="true" />
      ) : (
        // Show moon icon when light mode is active (click to switch to dark mode)
        <MoonIcon className="size-8 text-gray-800" aria-hidden="true" />
      )}
    </button>
  );
}
