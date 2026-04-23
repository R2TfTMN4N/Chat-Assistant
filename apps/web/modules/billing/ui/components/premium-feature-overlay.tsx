"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  BookIcon,
  BotIcon,
  GemIcon,
  MicIcon,
  PaletteIcon,
  PhoneIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface PremiumFeatureOverlayProps {
  children: React.ReactNode;
}

const features: Feature[] = [
  {
    icon: BotIcon,
    label: "AI Customer Support",
    description:
      "Intelligent automated responses 24/7 to enhance customer satisfaction.",
  },
  {
    icon: MicIcon,
    label: "AI Voice Assistant",
    description:
      "Voice-activated commands and responses for hands-free interaction.",
  },
  {
    icon: PhoneIcon,
    label: "Phone System",
    description:
      "Seamless integration with phone systems for direct customer calls.",
  },
  {
    icon: BookIcon,
    label: "Knowledge Base Integration",
    description:
      "Access and manage a comprehensive knowledge base for quick support.",
  },
  {
    icon: PaletteIcon,
    label: "Advanced Customization",
    description:
      "Personalize the widget appearance to match your brand identity.",
  },
  {
    icon: UsersIcon,
    label: "Team Collaboration",
    description:
      "Multiple user access for efficient team management and support.",
  },
];

export const PremiumFeatureOverlay = ({
  children,
}: PremiumFeatureOverlayProps) => {
  const router = useRouter();
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none select-none blur-[2px]">
        {children}
      </div>
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
      <div className="absolute inset-0 z-40 flex items-center justify-center p-4 ">
        <Card className="w-full max-w-md ">
          <CardHeader className=" text-center">
            <div className="flex items-center justify-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border bg-muted">
                <GemIcon className="size-6 text-muted-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">Premium Features</CardTitle>
            <CardDescription>
              This feature is available for premium users. Upgrade to access
              exclusive features and enhance your experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="mb-4 flex items-center gap-4"
                >
                  <div className="flex size-9 items-center justify-center rounded-full border bg-muted">
                    <feature.icon className="size-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{feature.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="w-full"
              onClick={() => {
                router.push("/billing");
              }}
              size="lg"
            >
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
