"use client";

import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { useAtomValue } from "jotai";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
import { WidgetSelectionScreen } from "../screens/widget-selection-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";

interface Props {
  organizationId: string;
}
export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);
  const screenComponents = {
    error: <WidgetErrorScreen />,
    auth: <WidgetAuthScreen />,
    chat: <WidgetChatScreen />,
    selection: <WidgetSelectionScreen />,
    contact: <p>Contact Screen</p>,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    voice: <p>Voice Screen</p>,
    inbox: <p>Inbox Screen</p>,
  };
  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
      {/* <WidgetFooter /> */}
    </main>
  );
};
