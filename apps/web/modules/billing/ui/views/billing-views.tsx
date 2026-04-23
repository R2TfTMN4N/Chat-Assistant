"use client";

import { CreditCardIcon, SparklesIcon, StarIcon, ZapIcon } from "lucide-react";
import { PricingTable } from "../components/pricing-table";
import { useEffect, useState } from "react";

export const BillingView = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    // Observe DOM for Clerk checkout drawer
    const observer = new MutationObserver((mutations) => {
      const checkoutDrawer = document.querySelector(
        "[data-clerk-portal], .cl-modalBackdrop, .cl-drawer",
      );
      setIsCheckoutOpen(!!checkoutDrawer);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-primary/5 via-background to-muted/20 transition-all duration-300 ${isCheckoutOpen ? "pr-[400px] lg:pr-[420px]" : ""}`}
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
              <SparklesIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Flexible Pricing
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-2xl shadow-primary/25">
                <CreditCardIcon className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
              Plans & Billing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose the plan that best fits your needs and scale as you grow.
              All plans include our core features with flexible upgrade options.
            </p>
          </div>
        </div>
      </div>

      {/* Features highlight */}
      <div className="relative py-8 z-0">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <ZapIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Instant Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Ready in minutes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <StarIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Always here to help
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">No Setup Fees</h3>
                <p className="text-sm text-muted-foreground">
                  Start immediately
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-20 relative z-0">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <PricingTable />
        </div>
      </div>
    </div>
  );
};
