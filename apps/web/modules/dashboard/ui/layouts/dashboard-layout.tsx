import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardHeader } from "@/modules/dashboard/ui/components/dashboard-header";
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard";
import {
  SidebarProvider,
  SidebarInset,
} from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import { Provider } from "jotai";

export const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <AuthGuard>
      <OrganizationGuard>
        <Provider>
          {(() => {
            const sidebarStyle = { ["--sidebar-width" as any]: "18rem" } as
              | React.CSSProperties
              | undefined;

            return (
              <SidebarProvider defaultOpen={defaultOpen} style={sidebarStyle}>
                <DashboardSidebar />
                <SidebarInset>
                  <DashboardHeader />
                  <main className="flex flex-1 flex-col overflow-auto">
                    {children}
                  </main>
                </SidebarInset>
              </SidebarProvider>
            );
          })()}
        </Provider>
      </OrganizationGuard>
    </AuthGuard>
  );
};
