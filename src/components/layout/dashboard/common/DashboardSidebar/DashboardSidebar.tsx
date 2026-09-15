"use client";

import {
    FiLogOut,
    FiSettings,
    FiShield,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/svg/Logo";
import { sidebarRoutes } from "./sidebarRoutes";

const DashboardSidebar = () => {
    const pathname = usePathname();

    const currentRole = "ADMIN";

    const visibleRoutes = sidebarRoutes.filter((route) =>
        route.roles.includes(currentRole),
    );

    return (
        <aside className="flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:h-screen">
            {/* Logo */}
            <div className="flex h-20 items-center border-b border-sidebar-border px-6">
                <Logo />
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-4 py-6">
                {/* Workspace / Role */}
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-3 py-3">
                    <div className="flex size-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                        <FiShield className="size-4" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-sidebar-foreground">
                            {currentRole}
                        </p>

                        <p className="text-xs text-sidebar-foreground/60">
                            Workspace
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav
                    aria-label="Dashboard navigation"
                    className="flex-1"
                >
                    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/50">
                        Workspace
                    </p>

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
                                    <Icon
                                        className="size-4"
                                        aria-hidden="true"
                                    />

                                    <span>{route.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Bottom Actions */}
                <div className="mt-6 flex flex-col gap-1 border-t border-sidebar-border pt-4">
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <FiSettings
                            className="size-4"
                            aria-hidden="true"
                        />

                        <span>Settings</span>
                    </Link>

                    <button
                        type="button"
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                        <FiLogOut
                            className="size-4"
                            aria-hidden="true"
                        />

                        <span>Log out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebar;