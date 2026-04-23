import { cn } from "@workspace/ui/lib/utils";
import { CheckIcon } from "lucide-react";
interface ConversationStatusIconProps {
  status: "unresolved" | "resolved" | "escalated";
}
const statusConfig = {
  resolved: {
    icon: CheckIcon,
    bgColor: "bg-green-500",
  },
  unresolved: {
    icon: CheckIcon,
    bgColor: "bg-red-500    ",
  },
  escalated: {
    icon: CheckIcon,
    bgColor: "bg-yellow-500",
  },
} as const;

export const ConversationStatusIcon = ({
  status,
}: ConversationStatusIconProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full p-1.5",
        config.bgColor
      )}
    >
      <Icon className="size-3 stroke-3 text-white" />
    </div>
  );
};
