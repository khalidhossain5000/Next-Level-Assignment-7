import { LoaderCircle, ShieldCheck } from "lucide-react";

const AuthLoading = () => {
    return (
        <main
            aria-busy="true"
            aria-live="polite"
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12 text-foreground"
        >
            <div
                aria-hidden="true"
                 className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_0%,transparent_72%)]"
            />

            <section className="relative w-full max-w-sm rounded-lg border border-border/80 bg-card/95 px-7 py-9 text-center shadow-xl shadow-foreground/5 backdrop-blur-sm sm:px-10">
                <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck aria-hidden="true" className="size-7" strokeWidth={1.8} />
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Power Pulse
                </p>
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    Securing your session
                </h1>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                    We’re checking your account details. This should only take a moment.
                </p>

                <div className="mt-8 flex items-center justify-center gap-2.5 border-t border-border pt-5 text-sm text-muted-foreground">
                    <LoaderCircle
                        aria-hidden="true"
                        className="size-4 animate-spin text-primary motion-reduce:animate-none"
                        strokeWidth={2.5}
                    />
                    <span>Verifying your identity</span>
                </div>
            </section>
        </main>
    );
};

export default AuthLoading;