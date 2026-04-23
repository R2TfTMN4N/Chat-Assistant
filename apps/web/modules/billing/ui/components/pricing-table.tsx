"use client";

import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";
export const PricingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <ClerkPricingTable
        for="organization"
        appearance={{
          elements: {
            pricingTableCard: "shadow-none! border! rounded-lg!  ",
            pricingTableCardHeader: "bg-background!",
            pricingTableCardBody: "bg-background!",
            pricingTableCardFooter: "bg-background!",
            pricingTableRoot: "grid-cols-1 md:grid-cols-3 gap-4 md:gap-6",
            pricingTableFeatureList: "space-y-2",
          },
        }}
      />
    </div>
  );
};
