"use client";

import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { widgetSettingsAtom } from "@/modules/widget/atoms/widget-atoms";
import { useThemeSwitcher } from "@/hooks/use-theme-switcher";
import { useDarkMode } from "@/hooks/use-dark-mode";

/**
 * ThemeSync component for the widget app.
 * Syncs theme and dark mode from widget settings atom to the UI.
 */
export function ThemeSync() {
  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const { changeTheme, currentTheme } = useThemeSwitcher();
  const { setDarkMode, isDarkMode } = useDarkMode();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run once when widget settings are loaded
    if (hasInitialized.current || !widgetSettings) return;

    // Apply theme from settings
    if (
      widgetSettings.themeStyle &&
      widgetSettings.themeStyle !== currentTheme
    ) {
      changeTheme(
        widgetSettings.themeStyle as Parameters<typeof changeTheme>[0],
      );
    }

    // Apply dark mode from settings
    if (
      widgetSettings.darkMode !== undefined &&
      widgetSettings.darkMode !== isDarkMode
    ) {
      setDarkMode(widgetSettings.darkMode);
    }

    hasInitialized.current = true;
  }, [widgetSettings, changeTheme, setDarkMode, currentTheme, isDarkMode]);

  return null;
}
