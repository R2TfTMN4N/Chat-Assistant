"use client ";

import { toast } from "sonner";
import { useVapiAssistants } from "../../hooks/use-vapi-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  BotIcon,
  CheckCircleIcon,
  PhoneIcon,
  XCircle,
  XCircleIcon,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";

export const VapiAssistantsTab = () => {
  const { data: assistants, isLoading } = useVapiAssistants();
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Assistant copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy assistant to clipboard.");
    }
  };
  return (
    <div className="border-t bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4">Assistant</TableHead>
            <TableHead className="px-6 py-4">Model</TableHead>
            <TableHead className="px-6 py-4 ">First Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    Loading assistants...
                  </TableCell>
                </TableRow>
              );
            }
            if (assistants?.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No assistants found.
                  </TableCell>
                </TableRow>
              );
            }
            return assistants?.map((assistant) => (
              <TableRow className="hover:bg-muted/50" key={assistant.id}>
                <TableCell className="px-6 py-4 font-mono">
                  <div className="flex items-center gap-3">
                    <BotIcon className="size-4 text-muted-foreground" />
                    <span className="font-mono">
                      {assistant.name || "Unnamed Assistant"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 ">
                  {assistant.model?.model || "Not specified"}
                </TableCell>
                <TableCell className="px-6 py-4 max-w-xs ">
                  <p className="truncate text-muted-foreground">
                    {assistant.firstMessage || "No first message set."}
                  </p>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
};
