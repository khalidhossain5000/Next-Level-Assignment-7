"use client";

import { useState } from "react";
import { FiEdit2, FiMapPin, FiZap } from "react-icons/fi";

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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

const ManageLoadShedding = () => {
  const [page, setPage] = useState(1);

  const { data, isPending } = useGetLoadSheddingSchedule(page);

  const schedules: ILoadShedding[] = data?.data?.data ?? [];
  const meta: IMeta | undefined = data?.data?.meta;

  const getPageNumbers = () => {
    if (!meta) return [];
    return Array.from({ length: meta.totalPages }, (_, i) => i + 1);
  };

  const handleUpdate = (scheduleId: string) => {
    // TODO: open update modal/form
    console.log(scheduleId, "update load shedding schedule");
  };

  if (isPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
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
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-card-foreground">
            Load Shedding Schedules
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            All scheduled load shedding across feeders and areas.
          </p>
        </div>

        <Badge
          variant="outline"
          className="w-fit rounded-full px-3 py-1 text-xs font-medium"
        >
          {meta?.total ?? schedules.length}{" "}
          {(meta?.total ?? schedules.length) === 1 ? "Schedule" : "Schedules"}
        </Badge>
      </div>

      {/* =====================================================
          XL AND ABOVE → TABLE VIEW
      ====================================================== */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="h-12 whitespace-nowrap pl-6">
                    Title
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Area
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Reason
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Start Time
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    End Time
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Status
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap pr-6 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow
                    key={schedule.id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Title */}
                    <TableCell className="pl-6">
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
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FiMapPin className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="max-w-40 truncate font-medium text-card-foreground">
                            {schedule.area?.name ?? "N/A"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {schedule.area?.code ?? "N/A"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Reason */}
                    <TableCell className="max-w-48 truncate text-sm text-muted-foreground">
                      {schedule.reason}
                    </TableCell>

                    {/* Start Time */}
                    <TableCell className="whitespace-nowrap text-sm text-card-foreground">
                      {formatDate(schedule.startTime)}
                    </TableCell>

                    {/* End Time */}
                    <TableCell className="whitespace-nowrap text-sm text-card-foreground">
                      {formatDate(schedule.endTime)}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusClassName(schedule.status)}
                      >
                        {schedule.status.replace("_", " ")}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-6">
                      <div className="flex items-center justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdate(schedule.id)}
                          className="h-9 gap-1.5 rounded-lg px-3 text-xs font-semibold"
                        >
                          <FiEdit2 className="size-3.5" />
                          Update
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* =====================================================
          BELOW XL → CARD VIEW
      ====================================================== */}
      <div className="space-y-3 xl:hidden">
        {schedules.map((schedule) => (
          <Card
            key={schedule.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            <CardContent className="space-y-3 px-4 py-3.5 sm:px-5">
              {/* Top: Title + Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                    {schedule.title}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FiMapPin className="size-3.5 shrink-0" />
                    <span className="truncate">
                      {schedule.area?.name ?? "N/A"}
                    </span>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={`shrink-0 text-[10px] ${getStatusClassName(
                    schedule.status,
                  )}`}
                >
                  {schedule.status.replace("_", " ")}
                </Badge>
              </div>

              {/* Reason */}
              <p className="border-t border-border pt-2.5 text-xs text-muted-foreground">
                {schedule.reason}
              </p>

              {/* Time range */}
              <div className="flex flex-col gap-1.5 border-t border-border pt-2.5 text-xs">
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

              {/* Action */}
              <div className="flex items-center justify-end border-t border-border pt-2.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdate(schedule.id)}
                  className="h-8 gap-1.5 rounded-lg px-3 text-xs font-semibold"
                >
                  <FiEdit2 className="size-3.5" />
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* =====================================================
          PAGINATION
      ====================================================== */}
      {meta && meta.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
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
                  if (page < meta.totalPages) setPage(page + 1);
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