"use client";

import { FiEdit2, FiMapPin, FiTrash2, FiZap } from "react-icons/fi";

import { useGetMyOutages } from "@/hooks";

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

import type { IMyOutage } from "@/types";

const MyOutages = () => {
  const { data: myOutages, isPending } = useGetMyOutages();

  const outages = myOutages?.data ?? [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusClassName = (status: string) => {
    switch (status) {
      case "REPORTED":
        return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300";

      case "ACKNOWLEDGED":
        return "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300";

      case "ASSIGNED":
        return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300";

      case "IN_PROGRESS":
        return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";

      case "RESTORED":
        return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";

      case "CANCELLED":
        return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";

      default:
        return "border-border bg-muted text-muted-foreground";
    }
  };

  const getPriorityClassName = (priority: string) => {
    if (priority === "HIGH") {
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";
    }

    return "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300";
  };

  if (isPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (outages.length === 0) {
    return (
      <div className="mx-auto flex min-h-72 w-full max-w-6xl items-center justify-center rounded-2xl border border-border bg-card px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiZap className="size-5" />
          </div>

          <h3 className="font-manrope text-base font-semibold text-card-foreground">
            No Outages Reported
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            You have not reported any power outages yet.
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
            My Outages
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage the power outages you have reported.
          </p>
        </div>

        <Badge
          variant="outline"
          className="w-fit rounded-full px-3 py-1 text-xs font-medium"
        >
          {outages.length} {outages.length === 1 ? "Outage" : "Outages"}
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
                    Cause
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap">
                    Area
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap">
                    Priority
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap">
                    Status
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap">
                    Reported At
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap pr-6 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {outages.map((outage: IMyOutage) => (
                  <TableRow
                    key={outage.id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Cause */}
                    <TableCell className="pl-6">
                      <div className="max-w-52">
                        <p className="truncate font-semibold text-card-foreground">
                          {outage.cause}
                        </p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          #{outage.id.slice(0, 8)}
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
                          <p className="max-w-44 truncate font-medium text-card-foreground">
                            {outage.area?.name ?? "N/A"}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {outage.area?.code ?? "N/A"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Priority */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getPriorityClassName(outage.priority)}
                      >
                        {outage.priority}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusClassName(outage.status)}
                      >
                        {outage.status.replace("_", " ")}
                      </Badge>
                    </TableCell>

                    {/* Reported At */}
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(outage.reported_At)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        {outage.priority === "NORMAL" && (
                          <Button
                            type="button"
                            size="sm"
                            className="h-9 gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                            title="Pay for Priority Restoration"
                          >
                            <FiZap className="size-3.5" />
                            Priority Restore
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 cursor-pointer rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary"
                          title="Edit outage"
                          aria-label="Edit outage"
                        >
                          <FiEdit2 className="size-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 cursor-pointer rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                          title="Delete outage"
                          aria-label="Delete outage"
                        >
                          <FiTrash2 className="size-4" />
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
          BELOW XL → COMPACT LIST / CARD VIEW
      ====================================================== */}
      <div className="space-y-3 xl:hidden">
        {outages.map((outage: IMyOutage) => (
          <Card
            key={outage.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            {/* =============================================
                SM TO BELOW XL → HORIZONTAL COMPACT LIST
            ============================================== */}
            <CardContent className="hidden px-4 py-3 sm:block sm:px-5 sm:py-3.5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Cause + Area */}
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                      {outage.cause}
                    </p>

                    <span className="hidden shrink-0 text-xs text-muted-foreground md:inline">
                      #{outage.id.slice(0, 8)}
                    </span>

                    <Badge
                      variant="outline"
                      className={`shrink-0 text-[10px] font-semibold ${getStatusClassName(
                        outage.status,
                      )}`}
                    >
                      {outage.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <FiMapPin className="size-3.5 shrink-0" />

                    <span className="truncate">
                      {outage.area?.name ?? "N/A"}
                    </span>

                    <span className="hidden shrink-0 text-muted-foreground/50 md:inline">
                      •
                    </span>

                    <span className="hidden shrink-0 md:inline">
                      {outage.area?.code ?? "N/A"}
                    </span>
                  </div>
                </div>

                {/* Priority */}
                <Badge
                  variant="outline"
                  className={`hidden shrink-0 md:inline-flex ${getPriorityClassName(
                    outage.priority,
                  )}`}
                >
                  {outage.priority}
                </Badge>

                {/* Reported */}
                <div className="hidden shrink-0 lg:block">
                  <p className="text-[11px] text-muted-foreground">
                    Reported
                  </p>

                  <p className="text-xs font-medium text-card-foreground">
                    {formatDate(outage.reported_At)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  {outage.priority === "NORMAL" && (
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 gap-1.5 rounded-lg px-3 text-xs font-semibold"
                      title="Pay for Priority Restoration"
                    >
                      <FiZap className="size-3.5" />
                      <span>Priority Restore</span>
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 cursor-pointer rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    title="Edit outage"
                    aria-label="Edit outage"
                  >
                    <FiEdit2 className="size-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 cursor-pointer rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                    title="Delete outage"
                    aria-label="Delete outage"
                  >
                    <FiTrash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>

            {/* =============================================
                MOBILE → SMALL COMPACT LIST
            ============================================== */}
            <CardContent className="px-4 py-3 sm:hidden">
              {/* Top Info: title + status in same row, wraps if needed */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-card-foreground">
                      {outage.cause}
                    </p>

                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      #{outage.id.slice(0, 8)}
                    </span>
                  </div>

                  <div className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <FiMapPin className="size-3.5 shrink-0" />

                    <span className="truncate">
                      {outage.area?.name ?? "N/A"}
                    </span>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={`shrink-0 whitespace-nowrap text-[10px] font-semibold ${getStatusClassName(
                    outage.status,
                  )}`}
                >
                  {outage.status.replace("_", " ")}
                </Badge>
              </div>

              {/* Bottom Info + Actions */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${getPriorityClassName(
                      outage.priority,
                    )}`}
                  >
                    {outage.priority}
                  </Badge>

                  <span className="text-[11px] text-muted-foreground">
                    {formatDate(outage.reported_At)}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {outage.priority === "NORMAL" && (
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold"
                      title="Pay for Priority Restoration"
                    >
                      <FiZap className="size-3.5" />
                      Priority Restore
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    title="Edit outage"
                    aria-label="Edit outage"
                  >
                    <FiEdit2 className="size-3.5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                    title="Delete outage"
                    aria-label="Delete outage"
                  >
                    <FiTrash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOutages;