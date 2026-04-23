"use client";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  hasVapiSecresAtom,
  organizationIdAtom,
  screenAtom,
  widgetSettingsAtom,
} from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import {
  AlertTriangleIcon,
  ChevronRightIcon,
  MessageSquareIcon,
  MessageSquareTextIcon,
  Mic,
  Phone,
  VoicemailIcon,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useState } from "react";
import { WidgetFooter } from "../components/widget-footer";
import { DarkModeToggle } from "../components/dark-mode-toggle";
export const WidgetSelectionScreen = () => {
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setScreen = useSetAtom(screenAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const hasVapiSecrets = useAtomValue(hasVapiSecresAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const createConversation = useMutation(api.public.conversations.create);
  const [isPending, setIsPending] = useState(false);
  const handleNewConversation = async () => {
    setIsPending(true);
    if (!contactSessionId) {
      setScreen("auth");
      return;
    }
    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Organization ID is missing.");
      return;
    }
    setIsPending(true);
    try {
      const conversationId = await createConversation({
        contactSessionId,
        organizationId,
      });
      setConversationId(conversationId);
      setScreen("chat");
    } catch (e) {
      setScreen("auth");
      return;
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="flex flex-col justify-between overflow-y-auto scrollbar-none min-h-[calc(100vh-2px)] ">
      <WidgetHeader>
        <div className="flex items-center justify-between w-full px-2 py-2">
          <div className="flex flex-col gap-y-2 font-semibold">
            <p className="text-3xl">Hi there! Welcome to the Widget View.</p>
            <p className="text-lg">Let's get started!</p>
          </div>
          <DarkModeToggle />
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-4 p-4 overflow-y-auto">
        <Button
          className=" h-16 w-full justify-between "
          variant="outline"
          onClick={handleNewConversation}
          disabled={isPending}
        >
          <div className="flex items-center gap-x-2 ">
            <MessageSquareTextIcon />
            <span>Start a Chat</span>
          </div>
          <ChevronRightIcon />
        </Button>
        {hasVapiSecrets && widgetSettings?.vapiSettings?.assistantId && (
          <Button
            className=" h-16 w-full justify-between "
            variant="outline"
            onClick={() => {
              setScreen("voice");
            }}
            disabled={isPending}
          >
            <div className="flex items-center gap-x-2 ">
              <Mic />
              <span>Start Voice Call</span>
            </div>
            <ChevronRightIcon />
          </Button>
        )}
        {hasVapiSecrets && widgetSettings?.vapiSettings?.phoneNumber && (
          <Button
            className=" h-16 w-full justify-between "
            variant="outline"
            onClick={() => {
              setScreen("contact");
            }}
            disabled={isPending}
          >
            <div className="flex items-center gap-x-2 ">
              <Phone />
              <span>Call us</span>
            </div>
            <ChevronRightIcon />
          </Button>
        )}
      </div>
      <WidgetFooter />
    </div>
  );
};
