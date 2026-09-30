/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import { toast } from "sonner";
import { FiCheckCircle, FiZap } from "react-icons/fi";

import { useGetTechnicanAssignedOutages, useUpdateStatus } from "@/hooks";

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
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MyOutagesSkleton from "@/components/loader/skleton-loading/dashboard/my-outages.skleton";
import AssignedOutagesSkeleton from "@/components/loader/skleton-loading/dashboard/assigned-outages.skeleton";

interface IAssignedUser {
  id: string;
  name: string;
  email: string;
}

interface IAssignedArea {
  id: string;
  name: string;
  code: string;
}

interface IAssignedOutage {
  id: string;
  cause: string;
  description: string;
  priority: "NORMAL" | "HIGH";
  status: string;
  reported_At: string;
  area: IAssignedArea | null;
  user: IAssignedUser | null;
}

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

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const headClass =
  "h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground";

const AssignedOutages = () => {
  const { data, isPending } = useGetTechnicanAssignedOutages();
  const {
    mutate: updateOutageStatus,
    isPending: statusUpdating,
    variables,
  } = useUpdateStatus();

  const outages: IAssignedOutage[] = data?.data ?? [];

  const handleStatusChange = (outageId: string, newStatus: string) => {
    updateOutageStatus(
      { id: outageId, status: newStatus },
      {
        onSuccess: () => {
          toast.success(
            newStatus === "RESTORED"
              ? "Outage marked as restored."
              : "Outage marked as rejected.",
          );
        },
        onError: (error: any) => {
          toast.error(
            error?.data?.message ||
              error?.message ||
              "Failed to update status.",
          );
        },
      },
    );
  };

  // Actions column / card-এর status update control
  const renderStatusAction = (outage: IAssignedOutage) => {
    const isFinalized = outage.status === "RESTORED";
    const isThisRowUpdating =
      statusUpdating && (variables as any)?.id === outage.id;

    if (isFinalized) {
      return (
        <span className="flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-300">
          <FiCheckCircle className="size-3.5" />
          Completed
        </span>
      );
    }

    if (isThisRowUpdating) {
      return (
        <div className="flex h-8 w-35 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-muted-foreground">
          <Spinner className="size-3.5" />
          Updating...
        </div>
      );
    }

    return (
      <Select
        value=""
        onValueChange={(value) => handleStatusChange(outage.id, value as string)}
      >
        <SelectTrigger className="h-8 w-35 rounded-lg border border-border text-xs font-semibold">
          <SelectValue placeholder="Update status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="RESTORED" className="text-xs">
            RESTORED
          </SelectItem>
          <SelectItem value="CANCELLED" className="text-xs">
            REJECTED
          </SelectItem>
        </SelectContent>
      </Select>
    );
  };

  if (isPending) {
    return (
     <AssignedOutagesSkeleton/>
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
            No Assigned Outages
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            You don&apos;t have any outages assigned to you yet.
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
                <TableRow className="hover:bg-transparent font-inter">
                  <TableHead className={`${headClass} pl-6`}>Cause</TableHead>
                  <TableHead className={headClass}>Customer</TableHead>
                  <TableHead className={headClass}>Area</TableHead>
                  <TableHead className={headClass}>Priority</TableHead>
                  <TableHead className={headClass}>Status</TableHead>
                  <TableHead className={headClass}>Reported At</TableHead>
                  <TableHead className={`${headClass} pr-6 text-right`}>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {outages.map((outage, index) => {
                  const cellBorder =
                    index !== outages.length - 1
                      ? "border-b border-border"
                      : "";

                  return (
                    <TableRow
                      key={outage.id}
                      className="group border-0 transition-colors hover:bg-muted/30"
                    >
                      {/* Cause */}
                      <TableCell className={`pl-6 ${cellBorder}`}>
                        <div className="max-w-52">
                          <p className="truncate font-semibold text-card-foreground">
                            {outage.cause}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            #{outage.id.slice(0, 8)}
                          </p>
                        </div>
                      </TableCell>

                      {/* Customer */}
                      <TableCell className={cellBorder}>
                        <p className="max-w-44 truncate font-medium text-card-foreground">
                          {outage.user?.name ?? "N/A"}
                        </p>

                        <p className="max-w-44 truncate text-xs text-muted-foreground">
                          {outage.user?.email ?? "N/A"}
                        </p>
                      </TableCell>

                      {/* Area */}
                      <TableCell className={cellBorder}>
                        <p className="max-w-44 truncate font-medium text-card-foreground">
                          {outage.area?.name ?? "N/A"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {outage.area?.code ?? "N/A"}
                        </p>
                      </TableCell>

                      {/* Priority */}
                      <TableCell className={cellBorder}>
                        <Badge
                          variant="outline"
                          className={getPriorityClassName(outage.priority)}
                        >
                          {outage.priority}
                        </Badge>
                      </TableCell>

                      {/* Status */}
                      <TableCell className={cellBorder}>
                        <Badge
                          variant="outline"
                          className={getStatusClassName(outage.status)}
                        >
                          {outage.status.replace("_", " ")}
                        </Badge>
                      </TableCell>

                      {/* Reported At */}
                      <TableCell
                        className={`whitespace-nowrap text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {formatDate(outage.reported_At)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className={`pr-6 ${cellBorder}`}>
                        <div className="flex items-center justify-end gap-1.5">
                          {renderStatusAction(outage)}
                        </div>
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
        {outages.map((outage) => (
          <Card
            key={outage.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            {/* sm and up */}
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
                    {outage.user?.name && (
                      <span className="hidden md:inline">
                        {" "}
                        &middot; {outage.user.name}
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
                  <p className="text-[11px] text-muted-foreground">Reported</p>

                  <p className="text-xs font-medium text-card-foreground">
                    {formatDate(outage.reported_At)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  {renderStatusAction(outage)}
                </div>
              </div>
            </CardContent>

            {/* below sm */}
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
                    {outage.user?.name && <> &middot; {outage.user.name}</>}
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
                  {renderStatusAction(outage)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignedOutages;