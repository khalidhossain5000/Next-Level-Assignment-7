'use client';

import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/layout/shared/modeToggle/ModeToggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/assets/svg/Logo';
import { useGetMe } from '@/hooks';

const NavBar = () => {
    const pathname = usePathname();
    const { data, isPending } = useGetMe()
    const routes = [
        { name: 'Home', url: '/' },
        { name: 'About us', url: '/about-us' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background  backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="flex items-center gap-3 text-foreground transition-colors hover:text-foreground/80"
                >
                    <Logo />
                    <h2 className="font-manrope text-lg font-extrabold tracking-tight sm:text-xl "> Power <span className="text-primary dark:text-cyan-400">
                        Pulse
                    </span></h2>

                </Link>

                <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-muted/40 p-1.5 md:flex">
                    {routes.map((route) => {
                        const isActive = pathname === route.url;

                        return (
                            <Link
                                key={route.url}
                                href={route.url}
                                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:bg-background hover:text-foreground dark:hover:bg-card'
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


                    {
                        data && !isPending ?
                            <Button
                                variant="destructive"
                                className="rounded-full  border-border  cursor-pointer px-5 font-manrope text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted "

                                nativeButton={false}
                            >
                                Logout
                            </Button> :
                            <Button
                                variant="outline"
                                className="rounded-full  border-border dark:border-cyan-200 bg-background/70 px-5 font-manrope text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted dark:bg-input/30 dark:hover:bg-input/50"
                                render={<Link href="/login" className="flex items-center">Login</Link>}
                                nativeButton={false}
                            >
                                Login
                            </Button>
                    }



                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};

export default NavBar;