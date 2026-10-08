"use client";

import { useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { House, LoaderCircle, RotateCcw, ZapOff } from "lucide-react";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
	unstable_retry?: () => void;
}

export default function ErrorPage({
	error,
	reset,
	unstable_retry,
}: ErrorPageProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		console.error(error);
	}, [error]);

	const handleRetry = () => {
		startTransition(() => {
			if (unstable_retry) {
				unstable_retry();
				return;
			}
			router.refresh();
			reset();
		});
	};

	return (
		<main
			role="alert"
			className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-background px-4 py-14 text-foreground sm:px-8"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_45%,transparent)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_0%,transparent_75%)]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-xl max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-destructive/25 blur-[110px]"
			/>

			<div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-destructive/30 bg-card/80 px-6 py-10 text-center shadow-2xl shadow-destructive/10 backdrop-blur-md sm:px-12 sm:py-14">
				<div
					aria-hidden="true"
					className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-destructive to-transparent"
				/>

				<div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-destructive">
					<span className="relative flex size-2">
						<span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-60 motion-reduce:animate-none" />
						<span className="relative inline-flex size-2 rounded-full bg-destructive" />
					</span>
					Error 500
				</div>

				<div
					aria-hidden="true"
					className="mt-8 flex items-center justify-center gap-2 font-manrope text-8xl font-extrabold leading-none sm:gap-3 sm:text-9xl"
				>
					<span>5</span>
					<span className="inline-flex size-[0.78em] items-center justify-center rounded-full border-[0.07em] border-destructive/50 bg-destructive/10 text-destructive">
						<ZapOff className="size-[0.4em]" strokeWidth={1.75} />
					</span>
					<span>0</span>
				</div>

				<div
					aria-hidden="true"
					className="mx-auto mt-8 flex w-full max-w-xs items-center gap-3 text-destructive/50"
				>
					<span className="h-px flex-1 bg-current" />
					<span className="size-1.5 rotate-45 bg-destructive" />
					<span className="h-px flex-1 bg-current" />
				</div>

				<h1 className="mt-8 font-manrope text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
					We hit a short circuit
				</h1>
				<p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
					Something failed on our end and this page couldn&apos;t load. Try
					again, or head back to the Power Pulse home page.
				</p>

				<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
					<button
						type="button"
						onClick={handleRetry}
						disabled={isPending}
						className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-destructive px-7 text-sm font-semibold text-destructive-foreground shadow-lg shadow-destructive/30 transition hover:bg-destructive/90 hover:shadow-xl hover:shadow-destructive/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
					>
						{isPending ? (
							<LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
						) : (
							<RotateCcw aria-hidden="true" className="size-4" />
						)}
						{isPending ? "Retrying..." : "Try again"}
					</button>
					<Link
						href="/"
						className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-7 text-sm font-semibold text-foreground transition hover:border-destructive/40 hover:bg-destructive/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
					>
						<House aria-hidden="true" className="size-4" />
						Back to home
					</Link>
				</div>

				{error.digest && (
					<p className="mt-8 inline-block rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-muted-foreground">
						Reference ID{" "}
						<span className="font-mono font-semibold text-foreground">
							{error.digest}
						</span>
					</p>
				)}
			</div>
		</main>
	);
}