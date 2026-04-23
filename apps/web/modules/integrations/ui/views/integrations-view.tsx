"use client";

import { useOrganization } from "@clerk/nextjs";
import { Organization } from "@clerk/nextjs/server";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { IntegrationId, INTERGRATIONS } from "../../constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useState } from "react";
import { createScript } from "../../utils";

export const IntegrationsView = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState("");
  const { organization } = useOrganization();
  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.error("Organization not found");
      return;
    }

    const snippet = createScript(integrationId, organization.id);
    setSelectedSnippet(snippet || "");
    setDialogOpen(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(organization?.id || "");
      toast.success("Organization ID copied to clipboard!");
    } catch {
      toast.error("Failed to copy text: ");
    }
  };
  return (
    <>
      <IntegrationsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippet={selectedSnippet}
      />
      <div className="flex min-h-screen flex-col bg-muted p-8">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="space-y-2">
            <h1 className="text-2xl md:md:text-4xl">Setup & Integrations</h1>
            <p className="text-muted-foreground">
              Connect third-party services and manage your integrations here.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <Label className="w-34" htmlFor="organization-id">
                Organization ID
              </Label>
              <Input
                id="organization-id"
                disabled
                readOnly
                value={organization?.id || ""}
                className="flex-1 bg-background font-mono tex-sm"
              />
              <Button className="gap-2" onClick={handleCopy} size="sm">
                <CopyIcon />
                Copy
              </Button>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-lg">Integrations</Label>
              <p className="text-muted-foreground text-sm">
                Add the following code snippet to your website to integrate the
                Chat
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {INTERGRATIONS.map((integration) => (
                <button
                  type="button"
                  key={integration.id}
                  onClick={() => handleIntegrationClick(integration.id)}
                  className="flex items-center min-w-30 gap-4 rounded-lg border bg-background p-4 hover:bg-accent"
                >
                  <Image
                    src={integration.icon}
                    alt={integration.title}
                    width={32}
                    height={32}
                  />
                  <span className="font-medium">{integration.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const IntegrationsDialog = ({
  open,
  onOpenChange,
  snippet,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snippet: string;
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      toast.success("Snippet copied to clipboard!");
    } catch {
      toast.error("Failed to copy text: ");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integrate with your Website</DialogTitle>
          <DialogDescription>
            Follow the instructions below to add the integration snippet to your
            website.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              1. Copy the following code snippet:
            </div>
            <div className="group relative">
              <pre className="max-h-[300px] overflow-x-auto overflow-auto whitespace-pre-wrap break-all  rounded-md bg-foreground  p-2 font-mono text-secondary text-sm">
                {snippet}
              </pre>
              <Button
                className="absolute top-4 right-1 size-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={handleCopy}
                size="icon"
                variant="secondary"
              >
                <CopyIcon />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              2. Add the code in your page
            </div>
            <p className="text-muted-foreground text-sm">
              Paste the chatbox code above into the HTML of your website. You
              can place it just before the closing &lt;/body&gt; tag to ensure
              it loads correctly.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
