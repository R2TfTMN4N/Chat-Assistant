"use client";

import { DashboardAnalytics } from "@/modules/dashboard/ui/components/dashboard-analytics";

export default function Page() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your customer support metrics and activity
        </p>
      </div>
      <DashboardAnalytics />
    </div>
  );
}
