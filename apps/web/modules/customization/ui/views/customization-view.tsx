"use client";

import { api } from "@workspace/backend/_generated/api";
import { useQuery } from "convex/react";
import { Loader2Icon, PaletteIcon } from "lucide-react";
import { CustomizationForm } from "../components/customization-form";

export const CustomizationView = () => {
  const widgetSettings = useQuery(api.private.widgetSettings.getOne);
  const vapiPlugin = useQuery(api.private.plugins.getOne, { service: "vapi" });
  const isLoading = widgetSettings === undefined || vapiPlugin === undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-y-2 bg-gradient-to-br from-primary/5 via-background to-muted/20 p-8">
        <Loader2Icon className="animate-spin size-6 text-muted-foreground" />
        <p className="text-muted-foreground ">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-muted/20">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white)]" />
        <div className="relative mx-auto max-w-screen-lg px-6 py-10 md:py-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
              <PaletteIcon className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Widget Customization
              </h1>
              <p className="text-muted-foreground mt-1">
                Customize the appearance and behavior of your chat widget
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-screen-lg px-6 py-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CustomizationForm
            initialData={widgetSettings}
            hasVapiPlugin={vapiPlugin !== undefined}
          />
        </div>
      </div>
    </div>
  );
};
