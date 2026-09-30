"use client";

import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/layout/shared/modeToggle/ModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/svg/Logo";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const NavBar = () => {
  const pathname = usePathname();
  const { data, isPending } = useGetMe();
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
    { name: "Dashboard", url: `/${data?.data?.role.toLowerCase()}/dashboard` },
  ];
console.log(data,"from navbar")
  const { mutate: logout } = useLogout();

  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Log out success");
        queryClient.removeQueries({
          queryKey: ["user"],
        });
      },
      onError: () => {
        toast.error("Log out failed");
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background  backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-muted/40 p-1.5 md:flex">
          {routes.map((route) => {
            const isActive = pathname === route.url;

            return (
              <Link
                key={route.url}
                href={route.url}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background hover:text-foreground dark:hover:bg-card"
                }`}
              >
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary-foreground/90" />
                )}
                {route.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {data && !isPending ? (
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="rounded-full  border-border  cursor-pointer px-5 font-manrope text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted "
            >
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-6 ">
              {" "}
              <Button
                variant="outline"
                nativeButton={false}
                className="rounded-full  border-border dark:border-cyan-200 bg-background/70 px-5 font-manrope text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted dark:bg-input/30 dark:hover:bg-input/50"
                render={
                  <Link href="/login" className="flex items-center">
                    Login
                  </Link>
                }
              >
                Login
              </Button>
              <Button
                variant="secondary"
                className="rounded-full  border-border dark:border-cyan-200  px-5 font-manrope text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted dark:bg-input/30 dark:hover:bg-input/50"
                render={
                  <Link href="/select-role" className="flex items-center">
                    Register
                  </Link>
                }
                nativeButton={false}
              >
                Register
              </Button>
            </div>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
