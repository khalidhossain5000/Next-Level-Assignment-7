
import type { ReactNode } from "react";
import DashboardSidebar from "@/components/layout/dashboard/common/DashboardSidebar/DashboardSidebar";
import MobileSidebar from "@/components/layout/dashboard/common/DashboardSidebar/MobileSidebar";


export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background lg:flex-row">
            <div className="hidden lg:block">
                <DashboardSidebar />
            </div>
            <MobileSidebar />
            <main className="min-w-0 flex-1 p-3 md:p-6">{children}</main>
        </div>
    );
}