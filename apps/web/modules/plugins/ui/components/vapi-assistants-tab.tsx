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
  BotOffIcon,
  CopyIcon,
  Loader2Icon,
  MessageSquareIcon,
  SparklesIcon,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

export const VapiAssistantsTab = () => {
  const { data: assistants, isLoading } = useVapiAssistants();
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Assistant ID copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy assistant to clipboard.");
    }
  };
  return (
    <div className="bg-background">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="px-6 py-4 font-semibold">Assistant</TableHead>
            <TableHead className="px-6 py-4 font-semibold">Model</TableHead>
            <TableHead className="px-6 py-4 font-semibold">
              First Message
            </TableHead>
            <TableHead className="px-6 py-4 w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-6 py-16 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Loader2Icon className="h-8 w-8 animate-spin text-primary/50" />
                      <span>Loading assistants...</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }
            if (assistants?.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-6 py-16 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <BotOffIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          No assistants found
                        </p>
                        <p className="text-sm">
                          Create an assistant in your Vapi dashboard to see it
                          here.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }
            return assistants?.map((assistant) => (
              <TableRow
                className="group transition-colors hover:bg-muted/50"
                key={assistant.id}
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-600 dark:text-violet-400">
                      <BotIcon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">
                      {assistant.name || "Unnamed Assistant"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge
                    variant="secondary"
                    className="gap-1 font-mono text-xs"
                  >
                    <SparklesIcon className="h-3 w-3" />
                    {assistant.model?.model || "Not specified"}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 max-w-xs">
                  <div className="flex items-start gap-2">
                    <MessageSquareIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="truncate text-sm text-muted-foreground">
                      {assistant.firstMessage || "No first message set"}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(assistant.id || "")}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
};
