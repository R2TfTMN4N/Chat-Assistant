"use client";
import { api } from "@workspace/backend/_generated/api";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import { formatDistanceToNow } from "date-fns";
import { usePaginatedQuery } from "convex/react";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
  CornerUpLeftIcon,
  ListIcon,
} from "lucide-react";
import {
  getCountryFlagUrl,
  getCountryFromTimezone,
} from "../../../../lib/country-utils";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai/react";
import { statusFilterAtom } from "../../atoms";
import { Skeleton } from "@workspace/ui/components/skeleton";
export const ConversationsPanel = () => {
  const pathname = usePathname();
  const statusFilter = useAtomValue(statusFilterAtom);
  const setStatusFilter = useSetAtom(statusFilterAtom);
  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    {
      status: statusFilter === "all" ? undefined : statusFilter,
    },
    {
      initialNumItems: 10,
    },
  );

  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: 10,
  });
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-background via-background to-muted/30 text-sidebar-foreground overflow-hidden">
      <div className="flex flex-col gap-3.5 border-b border-border/50 bg-background/80 backdrop-blur-sm p-3 shrink-0">
        <Select
          defaultValue="all"
          onValueChange={(value) =>
            setStatusFilter(
              value as "unresolved" | "resolved" | "escalated" | "all",
            )
          }
          value={statusFilter}
        >
          <SelectTrigger className="h-8 border border-border/50 bg-background/60 px-2.5 shadow-sm ring-0 hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-primary/20 rounded-lg transition-all">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <ListIcon className="size-4" />
                <span>All</span>
              </div>
            </SelectItem>
            <SelectItem value="resolved">
              <div className="flex items-center gap-2">
                <CheckIcon className="size-4" />
                <span>Resolved</span>
              </div>
            </SelectItem>
            <SelectItem value="unresolved">
              <div className="flex items-center gap-2">
                <ArrowRightIcon className="size-4" />
                <span>Unresolved</span>
              </div>
            </SelectItem>
            <SelectItem value="escalated">
              <div className="flex items-center gap-2">
                <ArrowUpIcon className="size-4" />
                <span>Escalated</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoadingFirstPage ? (
        <SkeletonConversations />
      ) : (
        <ScrollArea className="flex-1 min-h-0">
          <div className="flex w-full flex-col text-sm">
            {conversations.results.map((conversation) => {
              const isLastMessageFromOperator =
                conversation.lastMessage?.message?.role !== "user";
              const country = getCountryFromTimezone(
                conversation.contactSession?.metadata?.timezone || "",
              );
              const countryFlagUrl = country?.code
                ? getCountryFlagUrl(country.code)
                : null;
              return (
                <Link
                  href={`/conversations/${conversation._id}`}
                  key={conversation._id.toString()}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-3 border-b border-border/30 px-4 min-h-[80px] max-h-[80px] text-sm leading-tight transition-all duration-200 hover:bg-accent/80 hover:text-accent-foreground",
                    pathname === `/conversations/${conversation._id}` &&
                      "bg-primary/5 text-accent-foreground border-l-2 border-l-primary",
                  )}
                >
                  <div
                    className={cn(
                      "-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-primary opacity-0 transition-all duration-200 shadow-sm shadow-primary/30",
                      pathname === `/conversations/${conversation._id}` &&
                        "opacity-100",
                    )}
                  ></div>
                  <DicebearAvatar
                    seed={conversation.contactSession._id || "User"}
                    size={48}
                    badgeImageUrl={countryFlagUrl || undefined}
                    className="shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex w-full items-center gap-2">
                      <span className="truncate font-bold text-base">
                        {conversation.contactSession.name}
                      </span>
                      <span className="ml-auto shrink-0 text-muted-foreground text-sm">
                        {formatDistanceToNow(conversation._creationTime)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="flex w-0 grow items-center gap-1">
                        {isLastMessageFromOperator && (
                          <CornerUpLeftIcon className="size-4 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            "line-clamp-1 text-muted-foreground text-sm",
                            !isLastMessageFromOperator &&
                              "font-semibold text-foreground",
                          )}
                        >
                          {conversation.lastMessage?.text}
                        </span>
                      </div>
                      <ConversationStatusIcon
                        status={conversation.status}
                      ></ConversationStatusIcon>
                    </div>
                  </div>
                </Link>
              );
            })}
            <InfiniteScrollTrigger
              ref={topElementRef}
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
            />
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
export const SkeletonConversations = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
      <div className="relative flex w-full min-w-0 flex-col p-2">
        <div className="w-full space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-start gap-3 rounded-lg p-4">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1">
                <div className="flex w-full items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="ml-auto h-3 w-12 shrink-0" />
                </div>
                <div className="mt-2">
                  <Skeleton className=" h-3 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
