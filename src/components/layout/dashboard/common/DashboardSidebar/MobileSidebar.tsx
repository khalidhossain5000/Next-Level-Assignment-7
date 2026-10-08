"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut, FiMenu, FiSettings, FiX } from "react-icons/fi";

import Logo from "@/assets/svg/Logo";
import { sidebarRoutes } from "./sidebarRoutes";
import type { TUserRole } from "@/types";
import ModeToggle from "@/components/layout/shared/modeToggle/ModeToggle";

const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const isSettingsActive =
        pathname === "/settings" || pathname.startsWith("/settings/");

    // Temporary role for UI development.
    // Later, replace this with the role from your API/auth data.
    const currentRole: TUserRole = "ADMIN";

    const navItems = sidebarRoutes.filter((route) =>
        route.roles.includes(currentRole)
    );

    return (
        <section>
            {/* Mobile Navbar */}
            <div className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
                <Logo />
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-label="Open menu"
                        className="rounded-full p-2.5 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground active:scale-95"
                    >
                        <FiMenu className="size-5" />
                    </button>
                </div>

            </div>

            {/* Overlay */}
            <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu overlay"
                className={`fixed inset-0 z-40 cursor-default bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            {/* Drawer */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${open ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
                    <Logo />

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                        className="rounded-full p-2 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground active:scale-95"
                    >
                        <FiX className="size-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav
                    aria-label="Dashboard navigation"
                    className="flex-1 space-y-1 overflow-y-auto px-3 py-5"
                >
                    <p className="mb-3 px-3 text-xs font-medium text-sidebar-foreground/45">
                        Workspace
                    </p>

                    {navItems.map((item) => {
                        const Icon = item.icon;

                        const isActive =
                            pathname === item.href || pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                aria-current={isActive ? "page" : undefined}
                                className={`group relative flex items-center gap-3 rounded-lg py-2.5 pl-4 pr-3 text-sm font-medium transition-colors ${isActive
                                    ? "bg-sidebar-primary/10 text-sidebar-primary"
                                    : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    }`}
                            >
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-sidebar-primary" />
                                )}
                                <Icon className="size-5 shrink-0" />
                                <span className="truncate">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="shrink-0 border-t border-sidebar-border px-3 py-4">
                    {/* Settings */}
                    <Link
                        href="/settings"
                        onClick={() => setOpen(false)}
                        aria-current={isSettingsActive ? "page" : undefined}
                        className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isSettingsActive
                            ? "bg-sidebar-primary/10 text-sidebar-primary"
                            : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            }`}
                    >
                        {isSettingsActive && (
                            <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-sidebar-primary" />
                        )}
                        <FiSettings className="size-5 shrink-0" />
                        <span>Settings</span>
                    </Link>

                    {/* User */}
                    <div className="mt-3 flex items-center gap-3 rounded-lg bg-sidebar-accent/40 px-3 py-2.5">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                            <span className="text-sm font-medium">KH</span>
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-sidebar-foreground">
                                Khalid Hossain
                            </p>

                            <p className="truncate text-xs text-sidebar-foreground/55">
                                khalid@example.com
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Log out"
                            className="shrink-0 rounded-md p-1.5 text-sidebar-foreground/50 transition-colors hover:bg-sidebar-background hover:text-sidebar-foreground"
                        >
                            <FiLogOut className="size-4" />
                        </button>
                    </div>
                </div>
            </aside>
        </section>
    );
};

export default MobileSidebar;