"use client";

import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { Button } from "@workspace/ui/components/button";
import { useAction, useMutation, useQuery } from "convex/react";
import { MoreHorizontalIcon, Wand2Icon } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@workspace/ui/components/form";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { AIResponse } from "@workspace/ui/components/ai/response";
import {
  AIInput,
  AIInputButton,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@workspace/ui/components/ai/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { ConversationStatusButton } from "../components/conversation-status-button";
import { useState } from "react";
import { set } from "date-fns";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { cn } from "@workspace/ui/lib/utils";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { toast } from "sonner";
const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message is too long"),
});

export const ConversationIdView = ({
  conversationId,
}: {
  conversationId: Id<"conversations">;
}) => {
  const conversation = useQuery(api.private.conversations.getOne, {
    conversationId,
  });
  const messages = useThreadMessages(
    api.private.messages.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : "skip",
    { initialNumItems: 10 },
  );
  const { handleLoadMore, isLoadingMore, canLoadMore, topElementRef } =
    useInfiniteScroll({
      status: messages.status,
      loadMore: messages.loadMore,
      loadSize: 10,
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const [isEnhancing, setIsEnhancing] = useState(false);
  const enhanceResponse = useAction(api.private.messages.enhanceResponse);

  const handleEnhanceResponse = async () => {
    setIsEnhancing(true);
    const currentValue = form.getValues("message");
    try {
      const response = await enhanceResponse({ prompt: currentValue });
      form.setValue("message", response);
    } catch (error) {
      toast.error("Failed to enhance response. Please try again.");
      console.error("Failed to enhance response:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const createMessage = useMutation(api.private.messages.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createMessage({
        prompt: values.message,
        conversationId: conversationId,
      });
      form.reset();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const updateConversationStatus = useMutation(
    api.private.conversations.updateStatus,
  );
  const handleToggleStatus = async () => {
    if (!conversation) return;
    setIsUpdatingStatus(true);
    let newStatus: "resolved" | "unresolved" | "escalated";
    switch (conversation.status) {
      case "resolved":
        newStatus = "unresolved";
        break;
      case "unresolved":
        newStatus = "escalated";
        break;
      case "escalated":
        newStatus = "resolved";
        break;
      default:
        return; // bảo vệ TypeScript
    }

    try {
      await updateConversationStatus({
        conversationId: conversationId,
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update conversation status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  if (conversation === undefined || messages.status === "LoadingFirstPage") {
    return <ConversationIdViewLoading />;
  }
  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-primary/5 via-background to-muted/20">
      <header className="flex items-center justify-end border-b bg-background/80 backdrop-blur-sm p-2.5">
        {!!conversation && (
          <ConversationStatusButton
            status={conversation?.status}
            onClick={handleToggleStatus}
            disabled={isUpdatingStatus}
          />
        )}
      </header>
      <AIConversation className="max-h-[calc(100vh-180px)]">
        <AIConversationContent>
          <InfiniteScrollTrigger
            onLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
            canLoadMore={canLoadMore}
            ref={topElementRef}
          />
          {toUIMessages(messages.results ?? [])?.map((message) => (
            <AIMessage
              from={message.role === "user" ? "assistant" : "user"}
              key={message.id}
            >
              <AIMessageContent>
                <AIResponse>{message.content}</AIResponse>
              </AIMessageContent>
              {message.role === "user" && (
                <DicebearAvatar
                  size={32}
                  seed={conversation?.contactSessionId ?? "user"}
                />
              )}
            </AIMessage>
          ))}
        </AIConversationContent>
        <AIConversationScrollButton />
      </AIConversation>
      <div className="p-2">
        {conversation?.status === "unresolved" && (
          <div className="mb-2 rounded-lg border border-amber-200/50 bg-amber-50/80 dark:bg-amber-950/30 dark:border-amber-800/50 p-2 text-sm text-amber-800 dark:text-amber-200 backdrop-blur-sm shadow-sm">
            This conversation is currently <strong>unresolved</strong> — the AI
            is handling messages. Click the <em>Unresolved</em> status button to
            escalate and take over the chat.
          </div>
        )}
        <Form {...form}>
          <AIInput onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              disabled={
                conversation?.status === "resolved" ||
                conversation?.status === "unresolved"
              }
              render={({ field }) => (
                <AIInputTextarea
                  {...field}
                  disabled={
                    conversation?.status === "resolved" ||
                    conversation?.status === "unresolved" ||
                    form.formState.isSubmitting
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder={
                    conversation?.status === "resolved"
                      ? "Conversation resolved"
                      : conversation?.status === "unresolved"
                        ? "Conversation unresolved — click Unresolved to escalate"
                        : "Type your message..."
                  }
                  value={field.value}
                />
              )}
            />
            <AIInputToolbar>
              <AIInputTools>
                <AIInputButton
                  disabled={
                    conversation?.status === "resolved" ||
                    conversation?.status === "unresolved" ||
                    isEnhancing ||
                    !form.formState.isValid
                  }
                  onClick={handleEnhanceResponse}
                >
                  <Wand2Icon />
                  {isEnhancing ? "Enhancing..." : "Enhance"}
                </AIInputButton>
              </AIInputTools>
              <AIInputSubmit
                disabled={
                  conversation?.status === "resolved" ||
                  conversation?.status === "unresolved" ||
                  form.formState.isSubmitting ||
                  !form.formState.isValid
                }
                status="ready"
                type="submit"
              />
            </AIInputToolbar>
          </AIInput>
        </Form>
      </div>
    </div>
  );
};
export const ConversationIdViewLoading = () => {
  return (
    <div className="flex h-full flex-col bg-muted ">
      <header className="flex items-center justify-between border-b bg-background p-2.5">
        <Button size="sm" variant="ghost" disabled>
          <MoreHorizontalIcon></MoreHorizontalIcon>
        </Button>
      </header>
      <AIConversation className="max-h-[calc(100vh-180px)]">
        <AIConversationContent>
          {Array.from({ length: 8 }).map((_, index) => {
            const isUser = index % 2 === 0;
            const widths = ["w-48", "w-60", "w-72"];
            const width = widths[index % widths.length];
            return (
              <div
                className={cn(
                  "group flex w-full items-end justify-end gap-2 py-2 [&>div]:max-w-[80%] ",
                  isUser ? "is-user" : "is-assistant flex-row-reverse",
                )}
                key={index}
              >
                <Skeleton
                  className={`h-9 ${width} rounded-lg bg-neutral-200`}
                />
                <Skeleton className="h-8 w-8 rounded-full bg-neutral-200" />
              </div>
            );
          })}
        </AIConversationContent>
        <div className="p-2">
          <AIInput>
            <AIInputTextarea
              disabled
              placeholder="Type your message as an operator..."
            />
            <AIInputToolbar>
              <AIInputTools />
              <AIInputSubmit disabled status="ready" type="submit" />
            </AIInputToolbar>
          </AIInput>
        </div>
      </AIConversation>
    </div>
  );
};
