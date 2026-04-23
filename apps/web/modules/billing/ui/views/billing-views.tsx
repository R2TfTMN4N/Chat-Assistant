"use client";

import { CreditCardIcon } from "lucide-react";
import { PricingTable } from "../components/pricing-table";

export const BillingView = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-muted/20">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white)]" />
        <div className="relative mx-auto max-w-screen-lg px-6 py-10 md:py-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
              <CreditCardIcon className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Plans & Billing
              </h1>
              <p className="text-muted-foreground mt-1">
                Choose the plan that best fits your needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-screen-lg px-6 py-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <PricingTable />
        </div>
      </div>
    </div>
  );
};
