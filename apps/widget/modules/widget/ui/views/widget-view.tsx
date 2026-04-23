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
import { ThemeSync } from "@/components/theme-sync";

interface Props {
  organizationId: string;
}
export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);

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
      {widgetSettings && <ThemeSync />}
      {screenComponents[screen]}
      {/* <WidgetFooter /> */}
    </main>
  );
};
