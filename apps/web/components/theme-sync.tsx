"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useThemeSwitcher } from "@/hooks/use-theme-switcher";
import { useDarkMode } from "@/hooks/use-dark-mode";

/**
 * ThemeSync component loads widget settings from the database
 * and syncs the theme and dark mode on initial app load.
 * This ensures the user's saved preferences are applied immediately.
 */
export function ThemeSync() {
  const widgetSettings = useQuery(api.private.widgetSettings.getOne);
  const { changeTheme, currentTheme } = useThemeSwitcher();
  const { setDarkMode, isDarkMode } = useDarkMode();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run once when widget settings are loaded
    if (hasInitialized.current || !widgetSettings) return;

    // Apply theme from database if it exists and is different from current
    if (
      widgetSettings.themeStyle &&
      widgetSettings.themeStyle !== currentTheme
    ) {
      changeTheme(widgetSettings.themeStyle as any);
    }

    // Apply dark mode from database if it exists and is different from current
    if (
      widgetSettings.darkMode !== undefined &&
      widgetSettings.darkMode !== isDarkMode
    ) {
      setDarkMode(widgetSettings.darkMode);
    }

    hasInitialized.current = true;
  }, [widgetSettings, changeTheme, setDarkMode, currentTheme, isDarkMode]);

  // This component doesn't render anything
  return null;
}
