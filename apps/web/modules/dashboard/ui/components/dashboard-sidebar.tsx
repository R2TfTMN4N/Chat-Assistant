"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import {
  CreditCardIcon,
  InboxIcon,
  LayoutDashboardIcon,
  LibraryIcon,
  Mic,
  PaletteIcon,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const customerSupportItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Conversations",
    url: "/conversations",
    icon: InboxIcon,
  },
  {
    title: "Knowledge Base",
    url: "/files",
    icon: LibraryIcon,
  },
];
const configurationItems = [
  {
    title: "Widget Customization",
    url: "/customization",
    icon: PaletteIcon,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Voice Assistant",
    url: "/plugins/vapi",
    icon: Mic,
  },
];
const accountItems = [
  {
    title: "Plans & Billing",
    url: "/billing",
    icon: CreditCardIcon,
  },
];
export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  const handleNavClick = () => {
    // Close mobile sidebar when navigating
    setOpenMobile(false);
  };

  return (
    <Sidebar className="group" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/dashboard" onClick={handleNavClick}>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary dark:bg-white">
                    <MessageSquare className="h-4 w-4 text-primary-foreground dark:text-primary" />
                  </div>
                  <span className="font-semibold text-sm group-data-[collapsible=icon]:hidden">
                    Chat Assistants
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {customerSupportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={cn(
                      "h-10",
                      isActive(item.url) &&
                        "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                    )}
                    tooltip={item.title}
                  >
                    <Link href={item.url} onClick={handleNavClick}>
                      <item.icon className="size-5 mx-2 group-data-[collapsible=icon]:mx-auto" />
                      <span
                        className={cn(
                          "text-lg opacity-80 transition-opacity group-data-[collapsible=icon]:hidden",
                          isActive(item.url) && "opacity-100",
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Configurations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {configurationItems.map((item) => (
                <SidebarMenuItem key={item.title} className="h-10">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={cn(
                      "h-10",
                      isActive(item.url) &&
                        "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                    )}
                    tooltip={item.title}
                  >
                    <Link href={item.url} onClick={handleNavClick}>
                      <item.icon className="size-5 mx-2 group-data-[collapsible=icon]:mx-auto" />
                      <span
                        className={cn(
                          "text-lg opacity-80 transition-opacity group-data-[collapsible=icon]:hidden",
                          isActive(item.url) && "opacity-100",
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={cn(
                      "h-10",
                      isActive(item.url) &&
                        "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                    )}
                    tooltip={item.title}
                  >
                    <Link href={item.url} onClick={handleNavClick}>
                      <item.icon className="size-5 mx-2 group-data-[collapsible=icon]:mx-auto" />
                      <span
                        className={cn(
                          "text-lg opacity-80 transition-opacity group-data-[collapsible=icon]:hidden",
                          isActive(item.url) && "opacity-100",
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
