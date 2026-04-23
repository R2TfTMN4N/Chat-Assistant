import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard";
import {
  SidebarProvider,
  SIDEBAR_COOKIE_NAME,
} from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
export const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true";
  return (
    <AuthGuard>
      <OrganizationGuard>
        <SidebarProvider defaultOpen={true}>
          <DashboardSidebar />
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  );
};
