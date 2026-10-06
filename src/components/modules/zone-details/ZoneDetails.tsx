"use client";

import {
  Activity,
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock3,
  Hash,
  MapPin,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useGetZoneDetails } from "@/hooks";

import { Card, CardContent } from "@/components/ui/card";
import type { Zone } from "@/types";
import DetailsSkeleton from "@/components/loader/skleton-loading/others/details-skeleton";

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

const ZoneDetails = ({ id }: IProps) => {
  const { data, isPending, isError } = useGetZoneDetails(id);

  if (isPending) return <DetailsSkeleton />;

  const zone = data?.data as Zone | undefined;

  if (isError || !zone) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card px-6 py-12 text-center">
          <p className="font-manrope text-xl font-bold text-foreground">
            Zone details unavailable
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            We could not load this zone. Please try again later.
          </p>
          <Link
            href="/zones"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to zones
          </Link>
        </div>
      </section>
    );
  }

  const substations = zone.substations ?? [];
  const isActive = zone.status === "ACTIVE";

  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-136 bg-linear-to-br from-primary/10 via-chart-1/10 to-transparent blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
        <Link
          href="/zones"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" /> All zones
        </Link>

        <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative aspect-4/3 min-h-64 overflow-hidden bg-muted sm:aspect-16/10 lg:aspect-auto lg:min-h-102.5">
            {zone.zoneImageUrl ? (
              <Image
                src={zone.zoneImageUrl}
                alt={`${zone.name} zone`}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-linear-to-br from-primary/15 via-chart-1/10 to-muted text-primary">
                <Building2 className="size-14" />
              </div>
            )}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/35 to-transparent"
            />
            <span className="absolute bottom-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 truncate rounded-md border border-white/30 bg-black/45 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm sm:bottom-5 sm:left-5">
              <Hash className="size-3.5 shrink-0" /> {zone.code}
            </span>
          </div>

          <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <span
                  className={`size-2 rounded-full ${
                    isActive ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
                {zone.status}
              </span>
              <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {substations.length}{" "}
                {substations.length === 1 ? "substation" : "substations"}
              </span>
            </div>
            <h1 className="mt-5 wrap-break-word font-manrope text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              {zone.name}
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              {zone.description ||
                "No description has been provided for this zone."}
            </p>

            <div className="mt-7 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {formatDate(zone.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock3 className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Last updated</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {formatDate(zone.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
         
           
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Zone infrastructure
            </p>
            <h2 className="mt-1 font-manrope text-2xl font-bold text-foreground sm:text-3xl">
              Substations
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {substations.length}{" "}
            {substations.length === 1 ? "facility" : "facilities"} in{" "}
            {zone.name}
          </p>
        </div>

        {substations.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {substations.map((substation) => (
              <Card
                key={substation.id}
                className="group gap-0 rounded-lg border border-border bg-card p-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Zap className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="wrap-break-word font-manrope text-base font-bold text-foreground">
                          {substation.name}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-muted-foreground">
                          {substation.code}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        substation.status === "ACTIVE"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Activity className="size-3" /> {substation.status}
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Capacity
                      </p>
                      <p className="mt-1 text-sm font-bold text-foreground">
                        {substation.capacity || "Not specified"}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Location
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
                        <MapPin className="size-3.5 shrink-0 text-primary" />
                        {substation.location || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
                    <div className="min-w-0">
                      <p className="text-[11px] text-muted-foreground">
                        Created
                      </p>
                      <p className="mt-1 text-xs font-medium text-foreground">
                        {formatDate(substation.createdAt)}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-muted-foreground">
                        Updated
                      </p>
                      <p className="mt-1 text-xs font-medium text-foreground">
                        {formatDate(substation.updatedAt)}
                      </p>
                    </div>
                  </div>
               
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/60 px-6 text-center">
            <Building2 className="size-8 text-muted-foreground/60" />
            <p className="mt-3 font-semibold text-foreground">
              No substations yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Substations assigned to this zone will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ZoneDetails;
