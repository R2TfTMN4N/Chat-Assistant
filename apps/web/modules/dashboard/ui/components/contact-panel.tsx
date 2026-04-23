"use client";

import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/country-utils";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { useQuery } from "convex/react";
import { getCountriesForTimezone } from "countries-and-timezones";
import { ClockIcon, GlobeIcon, MailIcon, MonitorIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { userAgent } from "next/server";
import { use, useMemo } from "react";
import Bowser from "bowser";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@workspace/ui/components/accordion";
type InfoItem = {
  label: string;
  value: string | React.ReactNode;
  className?: string;
};
type InfoSection = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: InfoItem[];
};

export const ContactPanel = () => {
  const params = useParams();
  const conversationId = params.conversationId as Id<"conversations"> | null;
  const contactSession = useQuery(
    api.private.contactSessions.getOneByConversationId,
    conversationId ? { conversationId } : "skip"
  );

  const parseUserAgent = useMemo(() => {
    return (userAgent?: string) => {
      if (!userAgent)
        return {
          browser: "Unknown",
          os: "Unknown",
          device: "Unknown",
        };
      const browser = Bowser.getParser(userAgent);
      const result = browser.getResult();
      return {
        browser: `${result.browser.name}`,
        browserVersion: `${result.browser.version}`,
        os: `${result.os.name}`,
        osVersion: `${result.os.version}`,
        device: result.platform.type || "Desktop",
        deviceVendor: result.platform.vendor || "Unknown",
        deviceModel: result.platform.model || "Unknown",
      };
    };
  }, []);
  const userAgentInfo = useMemo(() => {
    return parseUserAgent(contactSession?.metadata?.userAgent);
  }, [contactSession?.metadata?.userAgent, parseUserAgent]);
  const countryInfo = useMemo(() => {
    return getCountryFromTimezone(contactSession?.metadata?.timezone);
  }, [contactSession?.metadata?.timezone]);
  const accordionSections = useMemo<InfoSection[]>(() => {
    if (!contactSession?.metadata) return [];
    return [
      {
        id: "device-info",
        icon: MonitorIcon,
        title: "Device Information",
        items: [
          {
            label: "Browser",
            value:
              userAgentInfo.browser +
              (userAgentInfo.browserVersion
                ? ` ${userAgentInfo.browserVersion}`
                : ""),
          },
          {
            label: "Operating System",
            value:
              userAgentInfo.os +
              (userAgentInfo.osVersion ? ` ${userAgentInfo.osVersion}` : ""),
          },
          {
            label: "Device",
            value:
              userAgentInfo.device +
              (userAgentInfo.deviceVendor !== "Unknown"
                ? userAgentInfo.deviceVendor + " "
                : "") +
              (userAgentInfo.deviceModel !== "Unknown"
                ? userAgentInfo.deviceModel
                : ""),
            className: "capitalize",
          },
          {
            label: "Screen",
            value: contactSession.metadata.screenResolution,
          },
          {
            label: "Viewport",
            value: contactSession.metadata.viewportSize,
          },
          {
            label: "Cookies",
            value: contactSession.metadata.cookieEnabled
              ? "Enabled"
              : "Disabled",
          },
        ],
      },
      {
        id: "location-info",
        icon: GlobeIcon,
        title: "Location & Language",
        items: [
          ...(countryInfo
            ? [
                {
                  label: "Country",
                  value: <span className="capitalize">{countryInfo.name}</span>,
                },
              ]
            : []),
          {
            label: "Language",
            value: contactSession.metadata.languages || "Unknown",
          },
          {
            label: "Timezone",
            value: contactSession.metadata.timezone || "Unknown",
          },
          {
            label: "UTC Offset",
            value: contactSession.metadata.timezoneOffset
              ? `${contactSession.metadata.timezoneOffset / 60} hours`
              : "Unknown",
          },
        ],
      },
      {
        id: "section-details",
        icon: ClockIcon,
        title: "Session Details",
        items: [
          {
            label: "Session Started",
            value: new Date(contactSession._creationTime).toLocaleString(),
          },
          {
            label: "Expires At",
            value: new Date(contactSession.expiresAt).toLocaleString(),
          },
        ],
      },
    ];
  }, [contactSession, userAgentInfo, countryInfo]);
  if (!contactSession) {
    return null;
  }
  return (
    <div className="flex h-full w-full flex-col bg-background text-fore-ground">
      <div className="flex flex-col gap-y-4 p-4">
        <div className="flex items-center gap-x-2">
          <DicebearAvatar
            badgeImageUrl={
              countryInfo?.code
                ? getCountryFlagUrl(countryInfo.code)
                : undefined
            }
            size={42}
            seed={contactSession._id}
            imageUrl=""
          />
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-x-2">
              <h4 className="line-clamp-1">
                {contactSession.name || "Unnamed Contact"}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {contactSession.email || "No email provided"}
            </p>
          </div>
        </div>
        <Button asChild className="w-full" size="lg">
          <Link href={`mailto:${contactSession.email}`}>
            <MailIcon className="mr-2 size-4" />
            Send Email
          </Link>
        </Button>
      </div>
      <div>
        {contactSession?.metadata && (
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-none border-y"
          >
            {accordionSections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="rounded-none outline-none has-focus-visible:z-10 has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2"
              >
                <AccordionTrigger
                  className="flex w-full items-center gap-4 px-5 py-4 
                text-left rounded-none outline-none transition-all hover:no-underline disabled:pointer-events-none text-sm bg-accent font-medium disabled:opacity-50"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <section.icon className="size-5 text-muted-foreground" />
                    <span>{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-secondary/50 px-4 py-4">
                  <div className="space-y-2 text-sm">
                    {section.items.map((item) => (
                      <div
                        className="flex justify-between "
                        key={`${section.id}-${item.label}`}
                      >
                        <span className="text-muted-foreground">
                          {item.label}:
                        </span>
                        <span className={item.className}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};
