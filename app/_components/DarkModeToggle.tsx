"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import { useHydration } from "hooks/useHydration";

export default function DarkModeToggle() {
  const mounted = useHydration();
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    // return a placeholder to avoid layout shift
    return (
      <button className="cursor-pointer rounded p-2 transition hover:bg-black/20 focus:outline-none dark:hover:bg-white/20">
        <SunIcon className="size-8 text-yellow-500" />
      </button>
    );
  }

  return (
    <button
      onClick={
        // Toggle between light and dark mode
        () => setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      className="cursor-pointer rounded p-2 transition hover:bg-black/20 focus:outline-none dark:hover:bg-white/20"
    >
      {resolvedTheme === "dark" ? (
        // Show sun icon when dark mode is active (click to switch to light mode)
        <SunIcon className="size-8 text-yellow-500" />
      ) : (
        // Show moon icon when light mode is active (click to switch to dark mode)
        <MoonIcon className="size-8 text-gray-800" />
      )}
    </button>
  );
}
