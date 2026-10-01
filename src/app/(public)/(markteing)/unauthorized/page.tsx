import { House, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <section className="relative isolate flex min-h-[65vh] items-center justify-center overflow-hidden bg-background px-5 py-14 text-foreground sm:px-8">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_0%,transparent_72%)]"
            />

            <div className="relative grid w-full max-w-5xl items-center gap-9 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="flex size-14 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400">
                        <ShieldAlert
                            aria-hidden="true"
                            className="size-7"
                            strokeWidth={1.8}
                        />
                    </div>
                    <p className="mt-5 text-sm font-semibold text-muted-foreground">
                        Power Pulse access control
                    </p>
                    <p
                        aria-hidden="true"
                        className="mt-2 text-7xl font-semibold leading-none text-primary/20 sm:text-8xl"
                    >
                        403
                    </p>
                </div>

                <div className="max-w-xl text-center md:text-left">
                    <p className="mb-3 text-sm font-semibold text-amber-700 dark:text-amber-400">
                        Access restricted
                    </p>
                    <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                        Your account can’t access this area
                    </h1>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
                        You’re signed in, but this section is limited to specific account
                        roles. If you believe you should have access, contact your
                        administrator.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            <House aria-hidden="true" className="size-4" />
                            Go to homepage
                        </Link>
                    </div>
                    <p className="mt-5 text-xs text-muted-foreground">
                        Access is based on the role assigned to your account.
                    </p>
                </div>
            </div>
        </section>
    );
}
