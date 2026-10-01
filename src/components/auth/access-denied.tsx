import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_0%,transparent_72%)]"
      />

      <section
        aria-labelledby="access-denied-title"
        className="relative w-full max-w-lg rounded-lg border border-border/80 bg-card/95 px-6 py-9 shadow-xl shadow-foreground/5 backdrop-blur-sm sm:px-10 sm:py-11"
      >
        <div className="mb-8 flex size-14 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400">
          <ShieldAlert aria-hidden="true" className="size-7" strokeWidth={1.8} />
        </div>

        <p className="mb-3 text-sm font-semibold text-muted-foreground">
          Error 403
        </p>
        <h1
          id="access-denied-title"
          className="max-w-sm text-2xl font-semibold leading-tight sm:text-3xl"
        >
          You don’t have permission to view this page
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Your account is signed in, but it doesn’t have access to this area. If
          you think this is a mistake, contact your administrator.
        </p>

        <div className="mt-8 border-t border-border pt-6">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Return to home
          </Link>
        </div>
      </section>
    </main>
  );
}