"use client ";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import {
  BotIcon,
  CheckCircle2Icon,
  PhoneIcon,
  SettingsIcon,
  SparklesIcon,
  UnplugIcon,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { VapiPhoneNumbersTab } from "./vapi-phone-numbers-tab";
import { VapiAssistantsTab } from "./vapi-assistants-tab";
import { Badge } from "@workspace/ui/components/badge";

interface VapiConnectedViewProps {
  onDisconnect: () => void;
}

export const VapiConnectedView = ({ onDisconnect }: VapiConnectedViewProps) => {
  const [activeTab, setActiveTab] = useState("phone-numbers");
  return (
    <div className="space-y-6">
      {/* Integration Status Card */}
      <Card className="overflow-hidden shadow-sm border-border/50 bg-background/80 backdrop-blur-sm">
        <CardHeader className="relative pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-primary opacity-20 blur" />
                <Image
                  alt="Vapi"
                  className="relative rounded-xl object-contain ring-2 ring-background"
                  height={56}
                  width={56}
                  src="/vapi.jpg"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">Vapi Integration</CardTitle>
                  <Badge
                    variant="outline"
                    className="border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                  >
                    <CheckCircle2Icon className="mr-1 h-3 w-3" />
                    Connected
                  </Badge>
                </div>
                <CardDescription className="mt-1">
                  Manage your phone numbers and AI voice calls with Vapi
                </CardDescription>
              </div>
            </div>
            <Button
              className="gap-2 shadow-sm"
              onClick={onDisconnect}
              variant="destructive"
              size="default"
            >
              <UnplugIcon className="h-4 w-4" />
              Disconnect
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Widget Configuration Card */}
      <Card className="group transition-all duration-200 hover:shadow-md hover:border-primary/20 bg-background/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/10 transition-all group-hover:ring-primary/20">
                <SettingsIcon className="size-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Widget Configuration</CardTitle>
                <CardDescription>
                  Set up voice calls for your chat widget
                </CardDescription>
              </div>
            </div>
            <Button className="gap-2 shadow-sm" asChild>
              <Link href="/customization">
                <SparklesIcon className="h-4 w-4" />
                Configure
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs Section */}
      <Card className="overflow-hidden shadow-sm bg-background/80 backdrop-blur-sm">
        <Tabs
          className="gap-0"
          defaultValue="phone-numbers"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <div className="border-b bg-muted/30">
            <TabsList className="h-14 w-full justify-start gap-0 rounded-none bg-transparent p-0">
              <TabsTrigger
                className="relative h-full rounded-none border-b-2 border-transparent px-6 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                value="phone-numbers"
              >
                <PhoneIcon className="mr-2 h-4 w-4" />
                Phone Numbers
              </TabsTrigger>
              <TabsTrigger
                className="relative h-full rounded-none border-b-2 border-transparent px-6 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                value="assistants"
              >
                <BotIcon className="mr-2 h-4 w-4" />
                AI Assistants
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="phone-numbers" className="m-0">
            <VapiPhoneNumbersTab />
          </TabsContent>
          <TabsContent value="assistants" className="m-0">
            <VapiAssistantsTab />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
