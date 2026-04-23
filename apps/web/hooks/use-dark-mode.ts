"use client";

import { useEffect, useState } from "react";

const DARK_MODE_STORAGE_KEY = "app-dark-mode";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load dark mode preference from localStorage on mount
    const savedDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY);
    const prefersDark = savedDarkMode === "true";

    setIsDarkMode(prefersDark);
    setIsLoaded(true);

    // Apply dark class immediately on mount
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Listen for changes from other tabs/windows (widget app)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === DARK_MODE_STORAGE_KEY && e.newValue !== null) {
        const newDarkMode = e.newValue === "true";
        setIsDarkMode(newDarkMode);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Save to localStorage
    localStorage.setItem(DARK_MODE_STORAGE_KEY, String(isDarkMode));

    // Toggle dark class on html element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, isLoaded]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (enabled: boolean) => {
    setIsDarkMode(enabled);
  };

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    isLoaded,
  };
}
