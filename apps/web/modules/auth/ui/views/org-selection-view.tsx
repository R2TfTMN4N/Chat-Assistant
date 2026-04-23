"use client";
import { OrganizationList } from "@clerk/nextjs";

export const OrgSelectionView = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <OrganizationList
          afterCreateOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          hidePersonal
          skipInvitationScreen
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-background/80 backdrop-blur-xl shadow-2xl border border-border/50 rounded-2xl",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-muted-foreground",
              organizationPreviewMainIdentifier: "font-semibold",
              organizationPreview:
                "hover:bg-muted/50 transition-colors rounded-lg",
              createOrganizationButton:
                "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]",
            },
          }}
        />
      </div>
    </div>
  );
};
