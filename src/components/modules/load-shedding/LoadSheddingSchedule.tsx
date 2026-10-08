"use client";

import { ArrowRight, CalendarClock, Clock3, MapPin } from "lucide-react";
import Link from "next/link";

import FilterSidebar from "@/components/layout/shared/filter-search-sidebar/FilterSearchSidebar";

import PublicDataSkeleton from "@/components/loader/skleton-loading/others/public-data.skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useGetLoadSheddingSchedule } from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import { PaginationUi } from "@/components/layout/shared/pagination-ui/PaginationUi";
import type { LoadSheddingSchedule } from "@/types";
import { useUrlListState } from "@/hooks/use-url-list-state.hook";

const LoadSheddingSchedules = () => {
  const { searchTerm, page, limit, updateQuery } = useUrlListState();

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isPending } = useGetLoadSheddingSchedule(
    {
      searchTerm: debouncedSearch || undefined,
      page,
      limit
    }
  );

  if (isPending) {
    return <PublicDataSkeleton />;
  }

  const schedules: LoadSheddingSchedule[] = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const formatDateTime = (value: string) => {
    return new Date(value).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
      {/* Filter Sidebar */}
      <div className="w-full lg:sticky lg:top-6 lg:w-72 lg:shrink-0">
        <FilterSidebar
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            updateQuery({ searchTerm: value, page: 1 });
          }}
          onReset={() => {
            updateQuery({ searchTerm: null, page: 1 });
          }}
        />
      </div>

      {/* Schedules + Pagination */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Schedule Cards */}
        {schedules.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-border bg-card px-5 text-center text-sm text-muted-foreground">
            No load shedding schedules found
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {schedules.map((schedule) => {
              const statusStyles =
                schedule.status === "SCHEDULED"
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : schedule.status === "IN_PROGRESS"
                  ? "border-[#009689]/20 bg-[#009689]/10 text-[#009689]"
                  : schedule.status === "COMPLETED"
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                  : "border-destructive/20 bg-destructive/10 text-destructive";

              return (
                <Card
                  key={schedule.id}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Top Accent */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary via-[#009689] to-primary" />

                  {/* Glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 size-44 rounded-full bg-primary/10 blur-3xl transition-all duration-300 group-hover:bg-primary/15"
                  />

                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-20 -left-20 size-44 rounded-full bg-[#009689]/10 blur-3xl"
                  />

                  <CardContent className="relative flex h-full flex-col gap-5 p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <CalendarClock className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            Load Shedding Schedule
                          </p>

                          <h3 className="line-clamp-2 text-base font-semibold leading-6 tracking-tight text-foreground">
                            {schedule.title}
                          </h3>
                        </div>
                      </div>

                      {/* Status */}
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusStyles}`}
                      >
                        {schedule.status.replace("_", " ")}
                      </span>
                    </div>

                    {/* Area */}
                    <div className="rounded-xl border border-border/70 bg-muted/40 p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#009689]/10 text-[#009689]">
                          <MapPin className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Area
                          </p>

                          <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
                            {schedule.area.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {schedule.area.code} · {schedule.area.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {/* Start */}
                      <div className="rounded-xl border border-border/70 bg-background/50 p-3.5">
                        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                          <Clock3 className="size-3.5" />

                          <span className="text-[10px] font-semibold uppercase tracking-wider">
                            Start Time
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-foreground">
                          {formatDateTime(schedule.startTime)}
                        </p>
                      </div>

                      {/* End */}
                      <div className="rounded-xl border border-border/70 bg-background/50 p-3.5">
                        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                          <Clock3 className="size-3.5" />

                          <span className="text-[10px] font-semibold uppercase tracking-wider">
                            End Time
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-foreground">
                          {formatDateTime(schedule.endTime)}
                        </p>
                      </div>
                    </div>

                   

                    {/* Action */}
                    <CardFooter className="mt-auto px-0 pb-0 pt-0">
                      <Link
                        href={`/load-shedding-schedule/${schedule.id}`}
                        className="w-full"
                      >
                        <Button className="group/button h-10 w-full cursor-pointer gap-2 rounded-xl bg-primary font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90">
                          View Details
                          <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {schedules.length > 0 && (
          <div className="mt-8 w-full border-t border-border/60 pt-6">
            <PaginationUi
              currentPage={meta?.page ?? page}
              itemsPerPage={meta?.limit ?? limit}
              totalItems={meta?.total ?? 0}
              totalPages={meta?.totalPages ?? 1}
              onPageChange={(value) => updateQuery({ page: value }, "push")}
              onItemsPerPageChange={(value) => {
                updateQuery({ limit: value, page: 1 });
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default LoadSheddingSchedules;
