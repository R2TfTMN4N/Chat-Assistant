import { Button } from "@workspace/ui/components/button";
import {
  ArrowRightIcon,
  ArrowRightLeftIcon,
  CheckIcon,
  PlugIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

export interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}
interface PluginCardProps {
  isDisabled?: boolean;
  serviceName: string;
  serviceImage: string;
  features: Feature[];
  onSubmit: () => void;
}
export const PluginCard = ({
  isDisabled,
  serviceName,
  serviceImage,
  features,
  onSubmit,
}: PluginCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm shadow-lg">
      {/* Header Section */}
      <div className="relative px-8 py-10">
        <div className="relative flex items-center justify-center gap-6">
          <div className="relative group">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 opacity-0 blur transition-opacity group-hover:opacity-100" />
            <div className="relative rounded-xl bg-background p-3 shadow-md ring-1 ring-border">
              <Image
                alt="Platform Logo"
                className="rounded-lg object-contain dark:invert"
                height={48}
                width={48}
                src="/ai-chatbot-assistant-software-logo-cute-style-no-title-loook-str.svg"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <ArrowRightLeftIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 rounded-2xl bg-primary/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
            <div className="relative rounded-xl bg-background p-3 shadow-md ring-1 ring-border">
              <Image
                alt={serviceName}
                className="rounded-lg object-contain"
                height={48}
                width={48}
                src={serviceImage}
              />
            </div>
          </div>
        </div>
        <div className="relative mt-6 text-center">
          <h2 className="text-xl font-semibold">
            Connect your {serviceName} account
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enable powerful voice AI features for your support platform
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-8 py-6">
        <div className="mb-4 flex items-center gap-2">
          <SparklesIcon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            What you&apos;ll get
          </span>
        </div>
        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary ring-1 ring-primary/10 transition-all group-hover:ring-primary/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{feature.label}</span>
                  <CheckIcon className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Section */}
      <div className="border-t bg-muted/30 px-8 py-6">
        <Button
          className="w-full gap-2 py-6 text-base font-medium shadow-lg transition-all hover:shadow-xl"
          disabled={isDisabled}
          variant="default"
          onClick={onSubmit}
          size="lg"
        >
          Connect to {serviceName}
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Your API keys are securely stored and encrypted
        </p>
      </div>
    </div>
  );
};
