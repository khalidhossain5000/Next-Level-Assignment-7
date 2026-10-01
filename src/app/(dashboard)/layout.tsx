
import type { ReactNode } from "react";
import DashboardSidebar from "@/components/layout/dashboard/common/DashboardSidebar/DashboardSidebar";
import MobileSidebar from "@/components/layout/dashboard/common/DashboardSidebar/MobileSidebar";
import AuthGuard from "@/components/auth/auth-guard";


export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
          <AuthGuard>
        <div className="flex min-h-screen flex-col bg-background lg:flex-row">
          
            <div className="hidden lg:block">
                <DashboardSidebar />
            </div>
            <MobileSidebar />
            <main className="min-w-0 flex-1 p-3 md:p-6">{children}</main>
       
        </div>
             </AuthGuard>
    );
}