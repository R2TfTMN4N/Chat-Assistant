"use client";

import { useEffect, useState } from "react";

export type ThemeOption =
  | "globals"
  | "globals1"
  | "globals2"
  | "globals3"
  | "globals4"
  | "globalsdefault"
  | "globalsnight1"
  | "globalsnight2";

export const THEME_OPTIONS: { value: ThemeOption; label: string }[] = [
  { value: "globals", label: "Default Theme" },
  { value: "globals1", label: "Theme 1" },
  { value: "globals2", label: "Theme 2" },
  { value: "globals3", label: "Theme 3" },
  { value: "globals4", label: "Theme 4" },
  { value: "globalsdefault", label: "Default Classic" },
  { value: "globalsnight1", label: "Night Theme 1" },
  { value: "globalsnight2", label: "Night Theme 2" },
];

const THEME_STORAGE_KEY = "app-theme";

// Explicit theme imports
const themeImports: Record<ThemeOption, () => Promise<any>> = {
  globals: () => import("../styles/themes/globals"),
  globals1: () => import("../styles/themes/globals1"),
  globals2: () => import("../styles/themes/globals2"),
  globals3: () => import("../styles/themes/globals3"),
  globals4: () => import("../styles/themes/globals4"),
  globalsdefault: () => import("../styles/themes/globalsdefault"),
  globalsnight1: () => import("../styles/themes/globalsnight1"),
  globalsnight2: () => import("../styles/themes/globalsnight2"),
};

export function useThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>("globals");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeOption;
    if (savedTheme && THEME_OPTIONS.some((opt) => opt.value === savedTheme)) {
      setCurrentTheme(savedTheme);
    }
    setIsLoaded(true);

    // Listen for changes from other tabs/windows (widget app)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && e.newValue) {
        const newTheme = e.newValue as ThemeOption;
        if (THEME_OPTIONS.some((opt) => opt.value === newTheme)) {
          setCurrentTheme(newTheme);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);

    // Dynamically load the selected theme
    const loadTheme = async () => {
      try {
        // Remove all existing theme classes
        document.documentElement.className = document.documentElement.className
          .split(" ")
          .filter((c) => !c.startsWith("theme-"))
          .join(" ");

        // Add the new theme class
        document.documentElement.classList.add(`theme-${currentTheme}`);

        // Dynamically import the theme CSS using explicit imports
        const themeLoader = themeImports[currentTheme];
        if (themeLoader) {
          await themeLoader();
        }

        // Trigger a re-render to apply styles
        document.body.style.display = "none";
        document.body.offsetHeight; // Force reflow
        document.body.style.display = "";
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadTheme();
  }, [currentTheme, isLoaded]);

  const changeTheme = (theme: ThemeOption) => {
    setCurrentTheme(theme);
  };

  return {
    currentTheme,
    changeTheme,
    isLoaded,
    availableThemes: THEME_OPTIONS,
  };
}
