"use client";

import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

export const PricingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center [&_.cl-modalBackdrop]:z-50 [&_.cl-modal]:z-50 [&_[data-clerk-portal]]:z-50">
      <div className="w-full">
        <ClerkPricingTable
          for="organization"
          appearance={{
            elements: {
              pricingTableCard:
                "shadow-lg! border! rounded-2xl! bg-gradient-to-b from-background to-background/95! backdrop-blur-sm! hover:shadow-xl! transition-all! duration-300! hover:scale-[1.02]! relative! overflow-hidden!",
              pricingTableCardHeader:
                "bg-gradient-to-r from-background/90 to-background! p-6! rounded-t-2xl!",
              pricingTableCardBody:
                "bg-background/50! backdrop-blur-sm! p-6! space-y-4!",
              pricingTableCardFooter:
                "bg-gradient-to-r from-background/90 to-background! p-6! rounded-b-2xl!",
              pricingTableRoot:
                "grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto!",
              pricingTableFeatureList: "space-y-3! text-sm!",
              pricingTableFeatureListItem: "flex items-start gap-2! py-1!",
              pricingTablePrice:
                "text-3xl! font-bold! bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent!",
              pricingTablePriceText: "text-2xl! font-bold!",
              pricingTableTitle: "text-2xl! font-bold! mb-2!",
              pricingTableDescription:
                "text-muted-foreground! text-base! leading-relaxed!",
              pricingTableButton:
                "w-full! bg-gradient-to-r from-primary to-primary/90! hover:from-primary/90 hover:to-primary! text-primary-foreground! font-medium! py-3! px-6! rounded-xl! transition-all! duration-200! shadow-lg hover:shadow-xl! hover:scale-[1.02]!",
              pricingTableButtonText: "font-semibold!",
              // Checkout drawer styling
              drawerRoot: "z-50!",
              drawerBackdrop: "z-50! bg-background/90! backdrop-blur-sm!",
              drawerContent: "z-50!",
              modalBackdrop: "z-50! bg-background/90! backdrop-blur-sm!",
              modalContent: "z-50!",
              rootBox: "z-50!",
            },
            layout: {
              shimmer: true,
            },
          }}
        />
      </div>

      {/* Trust indicators */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Trusted by businesses worldwide
        </p>
        <div className="flex items-center justify-center gap-8 opacity-60">
          <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
