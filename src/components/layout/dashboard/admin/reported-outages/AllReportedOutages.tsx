"use client";

import {
  FiMapPin,
  FiRefreshCw,
  FiTrash2,
  FiUserPlus,
  FiZap,
} from "react-icons/fi";

import { useGetAllOutages } from "@/hooks";

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

import type { IAllOutage } from "@/types";
import UpdateReportedOutageStatus from "@/components/modal/update-outage-status.modal";
import AssignTechnicianModal from "@/components/modal/assign-technician.modal";

const AllReportedOutages = () => {
  const { data, isPending } = useGetAllOutages();

  const outages: IAllOutage[] = data?.data ?? [];

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

  const handleUpdateStatus = (outageId: string) => {
    console.log(outageId, "update status clicked");
  };

  const handleAssignTechnician = (outageId: string) => {
    console.log(outageId, "assign technician clicked");
  };

  const handleDelete = (outageId: string) => {
    console.log(outageId, "delete clicked");
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
            No customers have reported any power outages yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">



      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/30 hover:bg-muted/30">
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
                    Technician
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
                {outages.map((outage) => (
                  <TableRow
                    key={outage.id}
                    className="border-border transition-colors hover:bg-muted/20"
                  >
                    {/* Cause */}
                    <TableCell className="pl-6">
                      <div className="max-w-48">
                        <p className="truncate font-medium text-card-foreground">
                          {outage.cause}
                        </p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          #{outage.id.slice(0, 8)}
                        </p>
                      </div>
                    </TableCell>

                    {/* Area */}
                    <TableCell>
                      <div className="min-w-0">
                        <p className="max-w-40 truncate font-medium text-card-foreground">
                          {outage.area?.name ?? "N/A"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {outage.area?.code ?? "N/A"}
                        </p>
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

                    {/* Technician */}
                    <TableCell>
                      {outage.techician ? (
                        <span className="block max-w-28 truncate text-sm font-medium text-card-foreground">
                          {outage.techician.name}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground bg-rose-300">
                          Unassigned
                        </span>
                      )}
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
                        <UpdateReportedOutageStatus
                          outageId={outage.id}
                          currentStatus={outage.status}
                        />



                        {
                          outage.status === "REPORTED" ? <AssignTechnicianModal outageId={outage.id} /> : <Button
                            type="button"
                            size="sm"
                            disabled
                            variant="outline"
                            className="h-8 gap-1.5 rounded-lg border-primary/25  px-3 text-xs font-semibold text-white shadow-none transition-colors cursor-not-allowed hover:border-primary/40 hover:bg-primary/10 dark:text-white disabled:bg-slate-600"
                          >
                             Technician Assigned
                          </Button>
                        }

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                          title="Delete outage"
                          aria-label="Delete outage"
                          onClick={() => handleDelete(outage.id)}
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


      <div className="space-y-2.5 xl:hidden">
        {outages.map((outage) => (
          <Card
            key={outage.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            <CardContent className="px-4 py-3.5 sm:px-5">
          
              <div className="hidden items-center gap-3 sm:flex">
                {/* Cause  Area */}
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                      {outage.cause}
                    </p>

                    <span className="shrink-0 text-xs text-muted-foreground">
                      #{outage.id.slice(0, 8)}
                    </span>
                  </div>

                  <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="truncate">
                      {outage.area?.name ?? "N/A"}
                    </span>

                    <span className="hidden text-muted-foreground/50 md:inline">
                      •
                    </span>

                    <span className="hidden md:inline">
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

                {/* Technician */}
                <div className="hidden shrink-0 lg:block">
                  {outage.techician ? (
                    <p className="max-w-28 truncate text-xs font-medium text-card-foreground">
                      {outage.techician.name}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Unassigned
                    </p>
                  )}
                </div>

                {/* Reported */}
                <div className="hidden shrink-0 lg:block">
                  <p className="text-[11px] text-muted-foreground">
                    Reported
                  </p>

                  <p className="text-xs font-medium text-card-foreground">
                    {formatDate(outage.reported_At)}
                  </p>
                </div>

                {/* Status */}
                <Badge
                  variant="outline"
                  className={`shrink-0 ${getStatusClassName(outage.status)}`}
                >
                  {outage.status.replace("_", " ")}
                </Badge>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  <UpdateReportedOutageStatus
                    outageId={outage.id}
                    currentStatus={outage.status}
                  />

              {
                          outage.status === "REPORTED" ? <AssignTechnicianModal outageId={outage.id} /> : <Button
                            type="button"
                            size="sm"
                            disabled
                            variant="outline"
                            className="h-8 gap-1.5 rounded-lg border-primary/25  px-3 text-xs font-semibold text-white shadow-none transition-colors cursor-not-allowed hover:border-primary/40 hover:bg-primary/10 dark:text-white disabled:bg-slate-600"
                          >
                             Technician Assigned
                          </Button>
                        }


                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    title="Delete outage"
                    aria-label="Delete outage"
                    onClick={() => handleDelete(outage.id)}
                  >
                    <FiTrash2 className="size-3.5" />
                  </Button>
                </div>
              </div>

    
              <div className="relative sm:hidden">
           
                <Badge
                  variant="outline"
                  className={`absolute right-0 top-0 text-[10px] font-semibold ${getStatusClassName(
                    outage.status,
                  )}`}
                >
                  {outage.status.replace("_", " ")}
                </Badge>

                {/* Cause + Area */}
                <div className="min-w-0 pr-24">
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

                {/* Bottom Info */}
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${getPriorityClassName(
                        outage.priority,
                      )}`}
                    >
                      {outage.priority}
                    </Badge>

                    <span className="truncate text-[11px] text-muted-foreground">
                      {outage.techician?.name ?? "Unassigned"}
                    </span>
                  </div>

                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {formatDate(outage.reported_At)}
                  </span>
                </div>

                {/* Mobile Actions */}
                <div className="mt-2.5 grid grid-cols-[1fr_1fr_auto] gap-1.5 border-t border-border pt-2.5">
                  <Button
                    type="button"
                    size="sm"
                    className="h-9 rounded-lg bg-primary px-2 text-[11px] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                    onClick={() => handleUpdateStatus(outage.id)}
                  >
                    <FiRefreshCw className="size-3.5" />
                    Update Status
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-9 rounded-lg border-primary/25 bg-primary/5 px-2 text-[11px] font-semibold text-primary shadow-none hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    onClick={() =>
                      handleAssignTechnician(outage.id)
                    }
                  >
                    <FiUserPlus className="size-3.5" />
                    Assign Technician
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    title="Delete outage"
                    aria-label="Delete outage"
                    onClick={() => handleDelete(outage.id)}
                  >
                    <FiTrash2 className="size-4" />
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

export default AllReportedOutages;