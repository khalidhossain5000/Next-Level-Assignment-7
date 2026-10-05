"use client";

import {
    Activity,
    ArrowLeft,
    CalendarDays,
    Clock3,
    Hash,
    MapPin,
    Zap,
} from "lucide-react";
import Link from "next/link";


import { Card, CardContent } from "@/components/ui/card";
import { useGetPlannedOutageDetails } from "@/hooks";
import DetailsSkeleton from "@/components/loader/skleton-loading/others/details-skeleton";
import type { LoadSheddingSchedule } from "@/types";

interface IProps {
    id: string;
}



const formatDate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "Not available"
        : new Intl.DateTimeFormat("en", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
};

const getDuration = (startTime: string, endTime: string) => {
    const duration = new Date(endTime).getTime() - new Date(startTime).getTime();
    if (!Number.isFinite(duration) || duration < 0) return "Not available";

    const totalMinutes = Math.floor(duration / 60_000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return [hours > 0 ? `${hours}h` : "", minutes > 0 ? `${minutes}m` : ""]
        .filter(Boolean)
        .join(" ") || "Less than a minute";
};

const PlannedOutageDetails = ({ id }: IProps) => {
    const { data, isPending, isError } = useGetPlannedOutageDetails(id);

    if (isPending) return <DetailsSkeleton />;

    const schedule = data?.data as LoadSheddingSchedule | undefined;

    if (isError || !schedule) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-lg border border-border bg-card px-6 py-12 text-center">
                    <p className="font-manrope text-xl font-bold text-foreground">
                        Schedule details unavailable
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        We could not load this schedule. Please try again later.
                    </p>
                    <Link
                        href="/planned-outage"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                        <ArrowLeft className="size-4" /> Back to schedules
                    </Link>
                </div>
            </section>
        );
    }

    const area = schedule.area;
    const isScheduled = schedule.status === "SCHEDULED";

    return (
        <section className="relative isolate overflow-hidden bg-background">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-linear-to-br from-primary/10 via-chart-1/10 to-transparent blur-3xl"
            />
            <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
                <Link
                    href="/load-shedding-schedule"
                    className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    <ArrowLeft className="size-4" /> All schedules
                </Link>

                <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-linear-to-br from-primary/15 via-chart-1/10 to-muted p-6 sm:aspect-[16/10] sm:p-8 lg:aspect-auto lg:min-h-[410px] lg:p-10">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
                        />
                        <div className="relative flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/75 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
                                <Hash className="size-3.5" /> {area?.code ?? "AREA"}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/75 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm">
                                <span
                                    className={`size-2 rounded-full ${isScheduled ? "bg-primary" : "bg-muted-foreground"}`}
                                />
                                {schedule.status}
                            </span>
                        </div>

                        <div className="relative mt-10 sm:mt-16 lg:mt-0">
                            <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/15 bg-background/70 text-primary shadow-lg shadow-primary/10 backdrop-blur-sm sm:size-20">
                                <Zap className="size-8 sm:size-10" />
                            </div>
                            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                                Scheduled outage
                            </p>
                            <p className="mt-2 font-manrope text-2xl font-bold text-foreground sm:text-3xl">
                                {getDuration(schedule.startTime, schedule.endTime)}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">planned duration</p>
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:p-10">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                            <Activity className="size-3.5" /> Load-shedding schedule
                        </span>
                        <h1 className="mt-5 break-words font-manrope text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                            {schedule.title}
                        </h1>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                            {schedule.reason || "No reason has been provided for this schedule."}
                        </p>

                        <div className="mt-7 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                            <div className="flex min-w-0 items-start gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <CalendarDays className="size-4" />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">Starts</p>
                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                        {formatDate(schedule.startTime)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex min-w-0 items-start gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Clock3 className="size-4" />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">Ends</p>
                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                        {formatDate(schedule.endTime)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Created</p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                    {formatDate(schedule.createdAt)}
                                </p>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Last updated</p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                    {formatDate(schedule.updatedAt)}
                                </p>
                            </div>
                        </div>
                        <p className="mt-5 break-all border-t border-border pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                            <span className="font-sans font-medium text-foreground">
                                Schedule ID
                            </span>{" "}
                            {schedule.id}
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                            Service location
                        </p>
                        <h2 className="mt-1 font-manrope text-2xl font-bold text-foreground sm:text-3xl">
                            Area details
                        </h2>
                    </div>
                    {area && (
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                            <span
                                className={`size-2 rounded-full ${area.status === "ACTIVE" ? "bg-primary" : "bg-muted-foreground"}`}
                            />
                            {area.status}
                        </span>
                    )}
                </div>

                {area ? (
                    <Card className="mt-5 gap-0 rounded-lg border border-border bg-card p-0 shadow-sm">
                        <CardContent className="p-5 sm:p-6">
                            <div className="flex min-w-0 items-start gap-3">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <MapPin className="size-5" />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="break-words font-manrope text-lg font-bold text-foreground sm:text-xl">
                                        {area.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{area.address}</p>
                                </div>
                            </div>

                            <div className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                        Area code
                                    </p>
                                    <p className="mt-1 break-words text-sm font-semibold text-foreground">
                                        {area.code}
                                    </p>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                        Feeder ID
                                    </p>
                                    <p className="mt-1 break-all font-mono text-xs text-foreground">
                                        {area.feederId}
                                    </p>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                        Created
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-foreground">
                                        {formatDate(area.createdAt)}
                                    </p>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                        Updated
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-foreground">
                                        {formatDate(area.updatedAt)}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 break-all border-t border-border pt-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
                                Area ID: {area.id}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="mt-5 flex min-h-40 items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 text-center text-sm text-muted-foreground">
                        Area information is not available for this schedule.
                    </div>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
                    <span>Area reference</span>
                    <span className="break-all font-mono text-foreground/75">
                        {schedule.areaId}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default PlannedOutageDetails;