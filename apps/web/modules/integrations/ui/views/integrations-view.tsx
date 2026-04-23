"use client";

import { useOrganization } from "@clerk/nextjs";
import { Organization } from "@clerk/nextjs/server";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  CopyIcon,
  CodeIcon,
  PlugIcon,
  CheckCircle2Icon,
  SparklesIcon,
} from "lucide-react";
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
      <div className="flex min-h-screen flex-col p-6 md:p-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <PlugIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Setup & Integrations
                </h1>
                <p className="text-muted-foreground mt-1">
                  Connect third-party services and manage your integrations
                  here.
                </p>
              </div>
            </div>
          </div>

          {/* Organization ID Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CodeIcon className="h-5 w-5 text-primary" />
                <CardTitle>Organization ID</CardTitle>
              </div>
              <CardDescription>
                Use this unique identifier to connect your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Input
                    id="organization-id"
                    disabled
                    readOnly
                    value={organization?.id || ""}
                    className="bg-muted font-mono text-sm pr-10"
                  />
                  <CheckCircle2Icon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                </div>
                <Button onClick={handleCopy} size="default" variant="secondary">
                  <CopyIcon className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Integrations Section */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                  <CardTitle>Available Integrations</CardTitle>
                </div>
                <CardDescription>
                  Add the following code snippet to your website to integrate
                  the Chat Widget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {INTERGRATIONS.map((integration) => (
                    <button
                      type="button"
                      key={integration.id}
                      onClick={() => handleIntegrationClick(integration.id)}
                      className="group flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-background p-6 transition-all hover:border-primary hover:shadow-md hover:scale-105 active:scale-100"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                        <Image
                          src={integration.icon}
                          alt={integration.title}
                          width={40}
                          height={40}
                          className="transition-transform group-hover:scale-110"
                        />
                      </div>
                      <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {integration.title}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CodeIcon className="h-5 w-5 text-primary" />
            Integrate with your Website
          </DialogTitle>
          <DialogDescription>
            Follow the instructions below to add the integration snippet to your
            website.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </div>
              <span className="font-medium">
                Copy the following code snippet
              </span>
            </div>
            <div className="group relative">
              <pre className="max-h-[300px] overflow-x-auto whitespace-pre-wrap break-all rounded-lg border bg-muted p-4 font-mono text-xs leading-relaxed">
                {snippet}
              </pre>
              <Button
                className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={handleCopy}
                size="sm"
                variant="secondary"
              >
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy Code
              </Button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </div>
              <span className="font-medium">Add the code to your page</span>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm leading-relaxed">
                Paste the chatbox code above into the HTML of your website. You
                can place it just before the closing{" "}
                <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
                  &lt;/body&gt;
                </code>{" "}
                tag to ensure it loads correctly.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
