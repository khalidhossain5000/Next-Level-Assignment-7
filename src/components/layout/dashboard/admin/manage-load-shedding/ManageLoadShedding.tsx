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
import { getLoadSheddingStatusClassName } from "@/lib/utils";
import type { ILoadShedding, IMeta } from "@/types";
import EmptyText from "@/components/layout/shared/empty-text/EmptyText";





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

  const { data: loadShedding, isPending } = useGetLoadSheddingSchedule({
    page
  });

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
    <EmptyText title="No Load Shedding Schedules" description=" No load shedding has been scheduled yet."/>
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
                          className={getLoadSheddingStatusClassName(schedule.status)}
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
                      className={`shrink-0 text-[10px] font-semibold ${getLoadSheddingStatusClassName(
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
                < UpdateLoadSheddingModal
                  id={schedule.id}
                  title={schedule.title}
                  currentAreaId={schedule.area?.id ?? ""}
                  currentAreaName={schedule.area?.name ?? ""}
                />

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
                  className={`shrink-0 whitespace-nowrap text-[10px] font-semibold ${getLoadSheddingStatusClassName(
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
                < UpdateLoadSheddingModal
                  id={schedule.id}
                  title={schedule.title}
                  currentAreaId={schedule.area?.id ?? ""}
                  currentAreaName={schedule.area?.name ?? ""}
                />
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
