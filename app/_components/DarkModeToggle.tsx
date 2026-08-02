"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import type { MouseEvent } from "react";
import { useTheme } from "./ThemeProvider";
import { useHydration } from "hooks/useHydration";
import { runViewTransition, warmViewTransition } from "./Motion/viewTransition";

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

  // Toggle between light and dark mode, revealing the incoming theme as a
  // circle expanding from this button. Falls back to an instant flip where
  // view transitions are unavailable or reduced motion is requested.
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    // Radius out to the furthest corner, so the circle always clears the page.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const root = document.documentElement;
    root.style.setProperty("--ms-vt-x", `${x}px`);
    root.style.setProperty("--ms-vt-y", `${y}px`);
    root.style.setProperty("--ms-vt-r", `${radius}px`);

    void runViewTransition(() => setTheme(next), { mode: "theme" });
  };

  return (
    <button
      type="button"
      aria-label={t("sr.toggleTheme")}
      onClick={toggle}
      onPointerEnter={warmViewTransition}
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
