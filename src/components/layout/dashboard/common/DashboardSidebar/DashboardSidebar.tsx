"use client";

import { FiLogOut, FiSettings, FiShield } from "react-icons/fi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Logo from "@/assets/svg/Logo";
import { sidebarRoutes } from "./sidebarRoutes";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const isSettingsActive =
    pathname === "/settings" || pathname.startsWith("/settings/");
  const { data: getMe, isPending } = useGetMe();

  const currentRole = getMe?.data?.role;
  const router = useRouter()
  const visibleRoutes = sidebarRoutes.filter((route) =>
    route.roles.includes(currentRole)
  );
  const queryClient = useQueryClient();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.info("Log out success");
        queryClient.removeQueries({
          queryKey: ["user"],
        });
        router.push("/login")
      },
      onError: () => {
        toast.error("Log out failed");
      },
    });
  };
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:h-screen">
      {/* Logo */}
      <div className="flex h-20 items-center  px-6">
        <Logo />
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 py-6">
        {/* Navigation */}
        <nav
          aria-label="Dashboard navigation"
          className="sidebar-scrollbar min-h-0 flex-1 overflow-y-auto"
        >
          <div className="flex flex-col gap-1">
            {visibleRoutes.map((route) => {
              const Icon = route.icon;

              const isActive =
                pathname === route.href ||
                pathname.startsWith(`${route.href}/`);

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                >
                  <Icon className="size-4" aria-hidden="true" />

                  <span className="font-manrope">{route.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="mt-6 flex flex-col gap-1 border-t border-slate-100 dark:border-slate-600 pt-4">
          <Link
            href="/settings"
            aria-current={isSettingsActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isSettingsActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
          >
            <FiSettings className="size-4" aria-hidden="true" />

            <span className="font-manrope">Settings</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer "
          >
            <FiLogOut className="size-4" aria-hidden="true" />

            <span className="font-manrope">Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
