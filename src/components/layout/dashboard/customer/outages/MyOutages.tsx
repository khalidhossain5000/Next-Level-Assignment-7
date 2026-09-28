"use client";

import { FiEdit2, FiTrash2, FiZap } from "react-icons/fi";

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
import PriorityInfoModal from "@/components/modal/priority-info.modal";
import UpdateOutageModal from "@/components/modal/update-my-outage.modal";
import DeleteMyOutageConfirmModal from "@/components/modal/delete-my-outage.modal";

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
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table className="border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 pl-6 font-semibold text-foreground">
                    Cause
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground">
                    Area
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground">
                    Priority
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground">
                    Status
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground">
                    Reported At
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 pr-6 text-right font-semibold text-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {outages.map((outage: IMyOutage, index: number) => (
                  <TableRow
                    key={outage.id}
                    className="group border-0 transition-colors hover:bg-muted/30"
                  >
                    {/* Cause */}
                    <TableCell
                      className={`pl-6 ${
                        index !== outages.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
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
                    <TableCell
                      className={
                        index !== outages.length - 1 ? "border-b border-border" : ""
                      }
                    >
                      <p className="max-w-44 truncate font-medium text-card-foreground">
                        {outage.area?.name ?? "N/A"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {outage.area?.code ?? "N/A"}
                      </p>
                    </TableCell>

                    {/* Priority */}
                    <TableCell
                      className={
                        index !== outages.length - 1 ? "border-b border-border" : ""
                      }
                    >
                      <Badge
                        variant="outline"
                        className={getPriorityClassName(outage.priority)}
                      >
                        {outage.priority}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell
                      className={
                        index !== outages.length - 1 ? "border-b border-border" : ""
                      }
                    >
                      <Badge
                        variant="outline"
                        className={getStatusClassName(outage.status)}
                      >
                        {outage.status.replace("_", " ")}
                      </Badge>
                    </TableCell>

                    {/* Reported At */}
                    <TableCell
                      className={`whitespace-nowrap text-sm text-muted-foreground ${
                        index !== outages.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      {formatDate(outage.reported_At)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell
                      className={`pr-6 ${
                        index !== outages.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        {outage.priority === "NORMAL" && (
                          <PriorityInfoModal outageId={outage.id} />
                        )}

                      <UpdateOutageModal outage={outage} />

                        <DeleteMyOutageConfirmModal outageId={outage.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="space-y-3 xl:hidden">
        {outages.map((outage: IMyOutage) => (
          <Card
            key={outage.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            {/* Tablet layout (sm and up, below xl) */}
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

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {outage.area?.name ?? "N/A"}
                    {outage.area?.code && (
                      <span className="hidden md:inline">
                        {" "}
                        &middot; {outage.area.code}
                      </span>
                    )}
                  </p>
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
                    <PriorityInfoModal outageId={outage.id} />
                  )}

                 <UpdateOutageModal outage={outage} />
<DeleteMyOutageConfirmModal outageId={outage.id} />
                </div>
              </div>
            </CardContent>

            {/* Mobile layout (below sm) */}
            <CardContent className="px-4 py-3 sm:hidden">
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

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {outage.area?.name ?? "N/A"}
                  </p>
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
                    <PriorityInfoModal outageId={outage.id} />
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

               <DeleteMyOutageConfirmModal outageId={outage.id} />
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