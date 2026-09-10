import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NavBar = () => {
    const routes = [
        { name: 'Home', url: '/' },
        { name: 'About us', url: '/about-us' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="flex items-center gap-3 text-foreground transition-colors hover:text-foreground/80"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground shadow-sm shadow-primary/20 ">
                        PP
                    </span>
                    <span className="font-manrope text-lg font-extrabold tracking-tight sm:text-xl">
                        Power Pulse
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-muted/40 p-1.5 md:flex">
                    {routes.map((route) => (
                        <Link
                            key={route.url}
                            href={route.url}
                            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground dark:hover:bg-card"
                        >
                            {route.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="rounded-full border-border bg-background/70 px-5 font-manrope text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted dark:bg-input/30 dark:hover:bg-input/50"
                        render={<Link href="/login" className="flex items-center">Login</Link>}
                        nativeButton={false}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default NavBar;