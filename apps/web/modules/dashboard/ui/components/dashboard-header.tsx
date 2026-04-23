"use client";

import { OrganizationSwitcher, UserButton, useUser } from "@clerk/nextjs";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@workspace/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

export const DashboardHeader = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user } = useUser();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5">
      {/* Container with unified backdrop and border */}
      <div className="flex items-center gap-2.5 p-1.5 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl shadow-lg">
        {/* Theme Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="h-8 w-8 hover:bg-accent/50 transition-colors"
              >
                {isDarkMode ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-border/50" />

        {/* Organization Switcher */}
        <div className="hidden sm:block">
          <OrganizationSwitcher
            hidePersonal={false}
            appearance={{
              elements: {
                rootBox: "flex items-center",
                organizationSwitcherTrigger:
                  "px-3 h-8 bg-transparent hover:bg-accent/50 border-0 rounded-lg text-sm font-medium transition-colors",
                organizationSwitcherTriggerIcon: "text-muted-foreground",
              },
            }}
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-border/50" />

        {/* User Button with Name */}
        <UserButton
          appearance={{
            elements: {
              rootBox: "flex items-center",
              userButtonTrigger:
                "h-8 pl-1 sm:pr-3 gap-2 hover:bg-accent/50 border-0 rounded-lg transition-colors",
              avatarBox: "size-6 rounded-full",
              userButtonOuterIdentifier: "hidden sm:block text-sm font-medium",
            },
          }}
        />
      </div>
    </div>
  );
};
