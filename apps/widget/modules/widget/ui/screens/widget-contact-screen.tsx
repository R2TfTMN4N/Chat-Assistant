import { useAtomValue, useSetAtom } from "jotai";
import { screenAtom, widgetSettingsAtom } from "../../atoms/widget-atoms";
import { useVapi } from "../../hooks/use-vapi";
import { WidgetHeader } from "../components/widget-header";
import { Button } from "@workspace/ui/components/button";
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronLeftIcon,
  CopyIcon,
  MicIcon,
  MicOffIcon,
  PhoneIcon,
} from "lucide-react";
import { WidgetFooter } from "../components/widget-footer";
import { cn } from "@workspace/ui/lib/utils";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { useState } from "react";
import Link from "next/link";

export const WidgetContactScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const phoneNumber = widgetSettings?.vapiSettings?.phoneNumber;
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!phoneNumber) return;
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy phone number:", error);
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div className="min-h-[calc(100vh-2px)] flex flex-col">
      <WidgetHeader>
        <div className="flex items-center gap-2">
          <Button
            variant="transparent"
            size="icon"
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon className="text-white" />
          </Button>
          <p>Contact Us</p>
        </div>
      </WidgetHeader>
      <div className="flex h-full flex-col items-center justify-center gap-yy-4">
        <div className="flex items-center justify-center rounded-full border bg-white p-3">
          <PhoneIcon className="size-6 text-muted-foreground"></PhoneIcon>
        </div>
        <p className="text-muted-foreground ">Available 24/7</p>
        <p className="font-bold text-2xl">{phoneNumber}</p>
      </div>
      <div className="border-t bg-background p-4">
        <div>
          <Button
            className="w-full"
            size="lg"
            variant="outline"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <CheckIcon className="mr-2 size-4" />
                Copied!
              </>
            ) : (
              <>
                <CopyIcon className="mr-2 size-4 rotate-90" />
                Copy Number
              </>
            )}
          </Button>
          <Button className="w-full mt-4" size="lg">
            <Link
              href={`tel:${phoneNumber}`}
              className="ml-4 flex items-center"
            >
              <PhoneIcon className="mr-2 size-4" />
              Call Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
