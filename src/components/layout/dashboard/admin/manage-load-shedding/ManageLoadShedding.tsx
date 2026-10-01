"use client";

import { useState } from "react";

import { FiCalendar, FiZap } from "react-icons/fi";

import { useGetLoadSheddingSchedule } from "@/hooks";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import MyOutagesSkleton from "@/components/loader/skleton-loading/dashboard/my-outages.skleton";
import UpdateLoadSheddingModal from "@/components/modal/update-load-shedding.modal";

interface IArea {
  id: string;
  name: string;
  code: string;
  address: string;
}

interface ILoadShedding {
  id: string;
  title: string;
  reason: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  startTime: string;
  endTime: string;
  area: IArea | null;
}

interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const getStatusClassName = (status: string) => {
  switch (status) {
    case "SCHEDULED":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300";

    case "IN_PROGRESS":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";

    case "COMPLETED":
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";

    case "CANCELLED":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const headClass =
  "h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground";

const ManageLoadShedding = () => {
  const [page, setPage] = useState(1);

  const { data: loadShedding, isPending } = useGetLoadSheddingSchedule(page);

  const schedules: ILoadShedding[] = loadShedding?.data?.data ?? [];

  const meta: IMeta | undefined = loadShedding?.data?.meta;

  const getPageNumbers = () => {
    if (!meta) return [];

    return Array.from({ length: meta.totalPages }, (_, i) => i + 1);
  };

  if (isPending) {
    return <MyOutagesSkleton />;
  }

  if (schedules.length === 0) {
    return (
      <div className="mx-auto flex min-h-72 w-full max-w-6xl items-center justify-center rounded-2xl border border-border bg-card px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiZap className="size-5" />
          </div>

          <h3 className="font-manrope text-base font-semibold text-card-foreground">
            No Load Shedding Schedules
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            No load shedding has been scheduled yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table className="border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="font-inter hover:bg-transparent">
                  <TableHead className={`${headClass} pl-6`}>Title</TableHead>

                  <TableHead className={headClass}>Area</TableHead>

                  <TableHead className={headClass}>Reason</TableHead>

                  <TableHead className={headClass}>Start Time</TableHead>

                  <TableHead className={headClass}>End Time</TableHead>

                  <TableHead className={`${headClass} pr-6`}>Status</TableHead>

                  <TableHead className={`${headClass} pr-6`}>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {schedules.map((schedule, index) => {
                  const cellBorder =
                    index !== schedules.length - 1
                      ? "border-b border-border"
                      : "";

                  return (
                    <TableRow
                      key={schedule.id}
                      className="group border-0 transition-colors hover:bg-muted/30"
                    >
                      {/* Title */}
                      <TableCell className={`pl-6 ${cellBorder}`}>
                        <div className="max-w-52">
                          <p className="truncate font-semibold text-card-foreground">
                            {schedule.title}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            #{schedule.id.slice(0, 8)}
                          </p>
                        </div>
                      </TableCell>

                      {/* Area */}
                      <TableCell className={cellBorder}>
                        <p className="max-w-44 truncate font-medium text-card-foreground">
                          {schedule.area?.name ?? "N/A"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {schedule.area?.code ?? "N/A"}
                        </p>
                      </TableCell>

                      {/* Reason */}
                      <TableCell className={cellBorder}>
                        <div className="max-w-48 truncate text-sm text-muted-foreground">
                          {schedule.reason}
                        </div>
                      </TableCell>

                      {/* Start Time */}
                      <TableCell
                        className={`whitespace-nowrap text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {formatDate(schedule.startTime)}
                      </TableCell>

                      {/* End Time */}
                      <TableCell
                        className={`whitespace-nowrap text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {formatDate(schedule.endTime)}
                      </TableCell>

                      {/* Status */}
                      <TableCell className={`pr-6 ${cellBorder}`}>
                        <Badge
                          variant="outline"
                          className={getStatusClassName(schedule.status)}
                        >
                          {schedule.status.replace("_", " ")}
                        </Badge>
                      </TableCell>

                      {/* Action */}
                      <TableCell className={`pr-6 ${cellBorder}`}>
                   < UpdateLoadSheddingModal
                   id={schedule.id}
                   title={schedule.title}
                   currentAreaId={schedule.area?.id ?? ""}
                   currentAreaName={schedule.area?.name ?? ""}
                   />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 xl:hidden">
        {schedules.map((schedule) => (
          <Card
            key={schedule.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            {/* sm and up */}
            <CardContent className="hidden px-4 py-3 sm:block sm:px-5 sm:py-3.5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Title + Area */}
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                      {schedule.title}
                    </p>

                    <span className="hidden shrink-0 text-xs text-muted-foreground md:inline">
                      #{schedule.id.slice(0, 8)}
                    </span>

                    <Badge
                      variant="outline"
                      className={`shrink-0 text-[10px] font-semibold ${getStatusClassName(
                        schedule.status
                      )}`}
                    >
                      {schedule.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {schedule.area?.name ?? "N/A"}

                    {schedule.area?.code && (
                      <span className="hidden md:inline">
                        {" "}
                        &middot; {schedule.area.code}
                      </span>
                    )}

                    <span className="hidden md:inline">
                      {" "}
                      &middot; {schedule.reason}
                    </span>
                  </p>
                </div>

                {/* Start */}
                <div className="hidden shrink-0 md:block">
                  <p className="text-[11px] text-muted-foreground">Starts</p>

                  <p className="text-xs font-medium text-card-foreground">
                    {formatDate(schedule.startTime)}
                  </p>
                </div>

                {/* Action */}
                <button
                  type="button"
                  className="shrink-0 text-sm font-medium text-primary hover:underline"
                  onClick={() =>
                    console.log(schedule.id, "update load shedding schedule")
                  }
                >
                  Update
                </button>

                {/* End */}
                <div className="hidden shrink-0 lg:block">
                  <p className="text-[11px] text-muted-foreground">Ends</p>

                  <p className="text-xs font-medium text-card-foreground">
                    {formatDate(schedule.endTime)}
                  </p>
                </div>
              </div>
            </CardContent>

            {/* below sm */}
            <CardContent className="px-4 py-3 sm:hidden">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-card-foreground">
                    {schedule.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {schedule.area?.name ?? "N/A"}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={`shrink-0 whitespace-nowrap text-[10px] font-semibold ${getStatusClassName(
                    schedule.status
                  )}`}
                >
                  {schedule.status.replace("_", " ")}
                </Badge>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                {schedule.reason}
              </p>

              <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-2.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Starts</span>

                  <span className="font-medium text-card-foreground">
                    {formatDate(schedule.startTime)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ends</span>

                  <span className="font-medium text-card-foreground">
                    {formatDate(schedule.endTime)}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-primary hover:underline"
                  onClick={() =>
                    console.log(schedule.id, "update load shedding schedule")
                  }
                >
                  Update
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <Pagination className="pt-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                className={
                  page <= 1 ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>

            {getPageNumbers().map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={pageNumber === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  if (page < meta.totalPages) {
                    setPage(page + 1);
                  }
                }}
                className={
                  page >= meta.totalPages
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ManageLoadShedding;
