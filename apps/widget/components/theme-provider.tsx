"use client";

import { useEffect, useState } from "react";

// Explicit theme imports
const themeImports: Record<string, () => Promise<unknown>> = {
  globals: () => import("@/styles/themes/globals"),
  globals1: () => import("@/styles/themes/globals1"),
  globals2: () => import("@/styles/themes/globals2"),
  globals3: () => import("@/styles/themes/globals3"),
  globals4: () => import("@/styles/themes/globals4"),
  globalsdefault: () => import("@/styles/themes/globalsdefault"),
  globalsnight1: () => import("@/styles/themes/globalsnight1"),
  globalsnight2: () => import("@/styles/themes/globalsnight2"),
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load the initial theme from localStorage
    const savedTheme = localStorage.getItem("app-theme") || "globals";
    const savedDarkMode = localStorage.getItem("app-dark-mode") === "true";

    // Apply dark mode class immediately if enabled
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Dynamically import the theme CSS
    const loadTheme = async (themeName: string) => {
      try {
        const themeLoader = themeImports[themeName];
        if (themeLoader) {
          await themeLoader();
          setIsLoaded(true);
        } else {
          // Fallback to globals if theme not found
          const globalsLoader = themeImports["globals"];
          if (globalsLoader) {
            await globalsLoader();
          }
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
        // Fallback to globals
        try {
          const globalsLoader = themeImports["globals"];
          if (globalsLoader) {
            await globalsLoader();
          }
        } catch (fallbackError) {
          console.error("Failed to load fallback theme:", fallbackError);
        }
        setIsLoaded(true);
      }
    };

    loadTheme(savedTheme);
  }, []);

  // Prevent flash of unstyled content
  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
}
