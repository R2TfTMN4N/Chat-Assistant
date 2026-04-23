import type { ComponentProps, HTMLAttributes } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";

export type AIMessageProps = HTMLAttributes<HTMLDivElement> & {
  from: "user" | "assistant" | "operator";
};

export const AIMessage = ({ className, from, ...props }: AIMessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end justify-end gap-2 py-2",
      from === "user"
        ? "is-user"
        : from === "operator"
          ? "is-operator flex-row-reverse justify-end"
          : "is-assistant flex-row-reverse justify-end",
      "[&>div]:max-w-[80%]",
      className,
    )}
    {...props}
  />
);

export type AIMessageContentProps = HTMLAttributes<HTMLDivElement>;

export const AIMessageContent = ({
  children,
  className,
  ...props
}: AIMessageContentProps) => (
  <div
    className={cn(
      "break-words",
      "flex flex-col gap-2 rounded-2xl border px-4 py-2.5 text-sm transition-all",
      "bg-background text-foreground border-border shadow-sm",
      "group-[.is-user]:border-primary/50 group-[.is-user]:bg-primary/10 group-[.is-user]:text-foreground group-[.is-user]:shadow-md",
      "group-[.is-assistant]:bg-muted/50 group-[.is-assistant]:border-border/60",
      "group-[.is-operator]:bg-green-50 group-[.is-operator]:border-green-200 group-[.is-operator]:text-foreground group-[.is-operator]:shadow-md dark:group-[.is-operator]:bg-green-950/30 dark:group-[.is-operator]:border-green-800/50",
      className,
    )}
    {...props}
  >
    <div>{children}</div>
  </div>
);

export type AIMessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const AIMessageAvatar = ({
  src,
  name,
  className,
  ...props
}: AIMessageAvatarProps) => (
  <Avatar className={cn("size-8", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
);
