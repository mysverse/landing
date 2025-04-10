import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Determine the initial theme preference.
    // const defaultDark = !("theme" in localStorage) &&
    // window.matchMedia("(prefers-color-scheme: dark)").matches;
    const prefersDark = localStorage.theme === "dark";

    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);

    // Save the user's preference.
    if (newMode) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="cursor-pointer rounded p-2 transition hover:bg-black/20 focus:outline-none dark:hover:bg-white/20"
    >
      {isDarkMode ? (
        // Show sun icon when dark mode is active (click to switch to light mode)
        <SunIcon className="size-6 text-yellow-500" />
      ) : (
        // Show moon icon when light mode is active (click to switch to dark mode)
        <MoonIcon className="size-6 text-gray-800" />
      )}
    </button>
  );
};

export default DarkModeToggle;
