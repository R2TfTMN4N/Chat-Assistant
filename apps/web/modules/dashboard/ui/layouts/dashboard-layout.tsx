import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard";
import {
  SidebarProvider,
  // SIDEBAR_COOKIE_NAME,
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
            const sidebarStyle = { ["--sidebar-width" as any]: "19rem" } as
              | React.CSSProperties
              | undefined;

            return (
              <SidebarProvider defaultOpen={defaultOpen} style={sidebarStyle}>
                <DashboardSidebar />
                <main className="flex flex-1 flex-col overflow-auto">
                  {children}
                </main>
              </SidebarProvider>
            );
          })()}
        </Provider>
      </OrganizationGuard>
    </AuthGuard>
  );
};
