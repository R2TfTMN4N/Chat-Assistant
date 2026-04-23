"use client ";

import { toast } from "sonner";
import { useVapiPhoneNumbers } from "../../hooks/use-vapi-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  CheckCircleIcon,
  CopyIcon,
  Loader2Icon,
  PhoneIcon,
  PhoneOffIcon,
  XCircleIcon,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

export const VapiPhoneNumbersTab = () => {
  const { data: phoneNumbers, isLoading } = useVapiPhoneNumbers();
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Phone number copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy phone number to clipboard.");
    }
  };
  return (
    <div className="bg-background">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="px-6 py-4 font-semibold">
              Phone Number
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold">Name</TableHead>
            <TableHead className="px-6 py-4 font-semibold">Status</TableHead>
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
                      <span>Loading phone numbers...</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }
            if (phoneNumbers?.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-6 py-16 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <PhoneOffIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          No phone numbers found
                        </p>
                        <p className="text-sm">
                          Add phone numbers in your Vapi dashboard to see them
                          here.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }
            return phoneNumbers?.map((phone, index) => (
              <TableRow
                className="group transition-colors hover:bg-muted/50"
                key={phone.id}
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <PhoneIcon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-sm font-medium">
                      {phone.number || "Not configured"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="font-medium">{phone.name || "Unnamed"}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge
                    className="gap-1 capitalize"
                    variant={
                      phone.status === "active" ? "default" : "destructive"
                    }
                  >
                    {phone.status === "active" ? (
                      <CheckCircleIcon className="h-3 w-3" />
                    ) : (
                      <XCircleIcon className="h-3 w-3" />
                    )}
                    {phone.status || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(phone.number || "")}
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
