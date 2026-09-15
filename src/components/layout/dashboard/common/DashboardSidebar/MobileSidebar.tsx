"use client";

import { useState } from "react";
import {
  FiLogOut,
  FiMenu,
  FiSettings,
  FiShield,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/svg/Logo";
import { sidebarRoutes } from "./sidebarRoutes";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Temporary role for UI development.
  // Later, replace this with the authenticated user's role.
  const currentRole = "ADMIN";

  const visibleRoutes = sidebarRoutes.filter((route) =>
    route.roles.includes(currentRole),
  );

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative z-50 md:hidden">
      {/* Mobile Header */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4">
        <Logo />

        <button
          type="button"
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted"
        >
          {isOpen ? (
            <FiX className="size-5" />
          ) : (
            <FiMenu className="size-5" />
          )}
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeDrawer}
          className="fixed inset-0 top-16 bg-foreground/20"
        />
      )}

      {/* Drawer */}
      <aside
        aria-label="Mobile dashboard navigation"
        className={`absolute left-0 top-16 w-[min(19rem,calc(100vw-2rem))] border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl transition-transform duration-200 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 py-6">
          {/* Workspace / Role */}
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-3 py-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <FiShield
                className="size-4"
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
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
                    aria-current={
                      isActive ? "page" : undefined
                    }
                    onClick={closeDrawer}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
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
              onClick={closeDrawer}
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
              onClick={closeDrawer}
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
    </div>
  );
};

export default MobileSidebar;