import { useSetAtom } from "jotai";
import { screenAtom } from "../../atoms/widget-atoms";
import { useVapi } from "../../hooks/use-vapi";
import { WidgetHeader } from "../components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { MicIcon, MicOffIcon } from "lucide-react";
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

export const WidgetVoiceScreen = () => {
  const setScreen = useSetAtom(screenAtom);

  const {
    endCall,
    startCall,
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
  } = useVapi();
  return (
    <div className="min-h-[calc(100vh-2px)] flex flex-col">
      <WidgetHeader>
        <div className="flex items-center gap-2">
          <Button
            variant="transparent"
            size="icon"
            onClick={() => setScreen("selection")}
          ></Button>
          <p>Voice Chat</p>
        </div>
      </WidgetHeader>
      {transcript.length > 0 ? (
        <AIConversation className="h-full flex-1">
          <AIConversationContent>
            {transcript.map((message, index) => (
              <AIMessage
                from={message.role}
                key={`${message.role}-${index}-${message.text}`}
              >
                <AIMessageContent>{message.text}</AIMessageContent>
              </AIMessage>
            ))}
          </AIConversationContent>
          <AIConversationScrollButton />
        </AIConversation>
      ) : (
        <div className="flex flex-1 h-full flex-col items-center justify-center gap-y-4">
          <div className=" flex items-center justify-center rounded-full border bg-white p-3 ">
            <MicIcon className="size-6 text-muted-foreground"></MicIcon>
          </div>
          <p className="text-muted-foreground">
            Voice chat is coming soon! Stay tuned for updates.
          </p>
        </div>
      )}
      <div className="border-t bg-background p-4">
        <div className="flex flex-col items-center gap-y-4">
          {isConnected && (
            <div className="flex items-center gap-x-2">
              <div
                className={cn(
                  "size-4 rounded-full ",
                  isSpeaking ? "animated-pulse bg-red-500" : "bg-green-500"
                )}
              ></div>
              <span className="text-muted-foreground text-sm">
                {isSpeaking ? "Assistant is speaking..." : "Listening"}{" "}
              </span>
            </div>
          )}
          <div className="flex w-full justify-center">
            {false ? (
              <Button
                className="w-full"
                size="lg"
                variant="destructive"
                onClick={() => {
                  endCall;
                }}
              >
                <MicOffIcon />
                End Call
              </Button>
            ) : (
              <Button
                className="w-full"
                disabled={isConnecting}
                size="lg"
                onClick={() => {
                  startCall();
                }}
              >
                <MicIcon />
                Start Call
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
