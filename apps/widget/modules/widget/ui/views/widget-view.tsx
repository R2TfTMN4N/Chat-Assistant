"use client";

import { screenAtom, widgetSettingsAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { useAtomValue } from "jotai";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
import { WidgetSelectionScreen } from "../screens/widget-selection-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";
import { WidgetInboxScreen } from "../screens/widget-inbox-screen";
import { WidgetVoiceScreen } from "../screens/widget-voice-screen";
import { WidgetContactScreen } from "../screens/widget-contact-screen";
import { useEffect, useRef } from "react";
import { useThemeSwitcher } from "@/hooks/use-theme-switcher";
import { useDarkMode } from "@/hooks/use-dark-mode";

interface Props {
  organizationId: string;
}
export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const { changeTheme } = useThemeSwitcher();
  const { setDarkMode } = useDarkMode();
  const hasInitialized = useRef(false);

  // Apply theme from database settings only once on mount
  useEffect(() => {
    if (hasInitialized.current || !widgetSettings) return;

    if (widgetSettings?.themeStyle) {
      changeTheme(widgetSettings.themeStyle as any);
    }
    if (widgetSettings?.darkMode !== undefined) {
      setDarkMode(widgetSettings.darkMode);
    }

    hasInitialized.current = true;
  }, [widgetSettings, changeTheme, setDarkMode]);

  const screenComponents = {
    error: <WidgetErrorScreen />,
    auth: <WidgetAuthScreen />,
    chat: <WidgetChatScreen />,
    selection: <WidgetSelectionScreen />,
    contact: <WidgetContactScreen />,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    voice: <WidgetVoiceScreen />,
    inbox: <WidgetInboxScreen />,
  };
  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
      {/* <WidgetFooter /> */}
    </main>
  );
};
