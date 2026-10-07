
import { ArrowRight, House, Zap } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-background px-5 py-16 text-foreground sm:px-8">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_0%,transparent_76%)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div className="relative grid w-full max-w-6xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
                <div className="flex flex-col items-center md:items-start">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50 motion-reduce:animate-none" />
                            <span className="relative inline-flex size-2 rounded-full bg-primary" />
                        </span>
                        POWERPULSE <span className="text-border">/</span> SIGNAL LOST
                    </div>

                    <div role="img" aria-label="404" className="mt-8 flex items-center gap-1 font-manrope text-8xl font-extrabold leading-none text-foreground sm:text-9xl">
                        <span aria-hidden="true">4</span>
                        <span aria-hidden="true" className="relative mx-1 inline-flex size-[0.78em] items-center justify-center rounded-full border-[0.095em] border-primary/25 text-primary">
                            <span className="absolute inset-1 rounded-full border border-dashed border-primary/35" />
                            <Zap aria-hidden="true" className="size-[0.34em] fill-primary/15" strokeWidth={1.8} />
                        </span>
                        <span aria-hidden="true">4</span>
                    </div>

                    <div aria-hidden="true" className="mt-7 flex w-full max-w-xs items-center gap-2 text-primary/60 md:max-w-sm">
                        <span className="h-px flex-1 bg-current" />
                        <span className="size-1.5 rounded-full bg-current" />
                        <span className="h-px w-8 bg-current" />
                        <Zap className="size-3.5" />
                        <span className="h-px w-8 bg-current" />
                        <span className="size-1.5 rounded-full bg-current" />
                        <span className="h-px flex-1 bg-current" />
                    </div>
                </div>

                <section className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
                    <p className="text-sm font-semibold text-primary">Looks like this page went off-grid</p>
                    <h1 className="mt-3 font-manrope text-3xl font-bold leading-tight sm:text-4xl">
                        We can’t find the page you’re looking for.
                    </h1>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                        The link may be out of date, or the page may have moved. Let’s get you back to something that’s powered on.
                    </p>

                    <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
                        <Link
                            href="/"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transform-none"
                        >
                            <House aria-hidden="true" className="size-4" />
                            Back to homepage
                        </Link>
                       
                    </div>

                    <p className="mt-7 text-xs text-muted-foreground">
                        Error code <span className="font-mono font-semibold text-foreground">404</span>
                    </p>
                </section>
            </div>
        </main>
    );
};

export default NotFoundPage;