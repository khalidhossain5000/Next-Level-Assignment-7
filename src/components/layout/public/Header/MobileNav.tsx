"use client";

import { LogOut, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";

type NavRoute = {
  name: string;
  url: string;
};

type MobileNavProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  routes: NavRoute[];
  pathname: string;
  isLoggedIn: boolean;
  onLogout: () => void;
};

const isActiveRoute = (pathname: string, url: string) => {
  if (url === "/") return pathname === "/";
  return pathname === url || pathname.startsWith(`${url}/`);
};

const MobileNav = ({
  isOpen,
  setIsOpen,
  routes,
  pathname,
  isLoggedIn,
  onLogout,
}: MobileNavProps) => {
  // lock page scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden
        onClick={closeDrawer}
        className={`fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-70 max-w-[85vw] flex-col border-l border-border bg-background shadow-2xl transition-all duration-300 xl:hidden ${
          isOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-5">
          <Logo />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={closeDrawer}
            aria-label="Close menu"
            className="cursor-pointer rounded-full"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-5">
          {routes.map((route) => {
            const isActive = isActiveRoute(pathname, route.url);

            return (
              <Link
                key={route.url}
                href={route.url}
                onClick={closeDrawer}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {route.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth buttons */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-border p-5">
          {isLoggedIn ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onLogout();
                closeDrawer();
              }}
              className="h-10 w-full cursor-pointer gap-2 rounded-full font-manrope font-semibold"
            >
              <LogOut className="size-4" />
              Logout
            </Button>
          ) : (
            <>
              <Button
                className="h-10 w-full rounded-full font-manrope font-semibold"
                nativeButton={false}
                onClick={closeDrawer}
                render={
                  <Link href="/select-role" className="flex items-center">
                    Register
                  </Link>
                }
              >
                Register
              </Button>

              <Button
                variant="outline"
                className="h-10 w-full rounded-full font-manrope font-semibold"
                nativeButton={false}
                onClick={closeDrawer}
                render={
                  <Link href="/login" className="flex items-center">
                    Login
                  </Link>
                }
              >
                Login
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default MobileNav;