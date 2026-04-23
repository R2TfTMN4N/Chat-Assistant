import { Doc } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { Hint } from "@workspace/ui/components/hint";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";

export const ConversationStatusButton = ({
  status,
  onClick,
  disabled,
}: {
  status: Doc<"conversations">["status"];
  onClick: () => void;
  disabled?: boolean;
}) => {
  if (status === "resolved") {
    return (
      <Hint text="Mark as unresolved">
        <Button
          onClick={onClick}
          variant="tertiary"
          size="sm"
          disabled={disabled}
          className="gap-1.5 shadow-sm hover:shadow-md transition-all"
        >
          <CheckIcon className="size-4" />
          Resolved
        </Button>
      </Hint>
    );
  }
  if (status === "escalated") {
    return (
      <Hint text="Mark as resolved">
        <Button
          onClick={onClick}
          variant="warning"
          size="sm"
          disabled={disabled}
          className="gap-1.5 shadow-sm hover:shadow-md transition-all"
        >
          <ArrowUpIcon className="size-4" />
          Escalated
        </Button>
      </Hint>
    );
  }
  return (
    <Hint text="Mark as escalated">
      <Button
        onClick={onClick}
        variant="destructive"
        size="sm"
        disabled={disabled}
        className="gap-1.5 shadow-md shadow-destructive/25 hover:shadow-lg hover:shadow-destructive/30 transition-all"
      >
        <ArrowRightIcon className="size-4" />
        Unresolved
      </Button>
    </Hint>
  );
};
