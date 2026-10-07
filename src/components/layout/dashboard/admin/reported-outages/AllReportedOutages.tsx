"use client";

import { FiMapPin, FiZap } from "react-icons/fi";

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

import type { IAllOutage } from "@/types";
import UpdateReportedOutageStatus from "@/components/modal/update-outage-status.modal";
import AssignTechnicianModal from "@/components/modal/assign-technician.modal";
import MyOutagesSkleton from "@/components/loader/skleton-loading/dashboard/my-outages.skleton";
import { getPriorityClassName, getStatusClassName } from "@/lib/utils";
import EmptyText from "@/components/layout/shared/empty-text/EmptyText";

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};


const renderActions = (outage: IAllOutage) => (
  <>
    <UpdateReportedOutageStatus
      outageId={outage.id}
      currentStatus={outage.status}
    />

    {outage.status === "REPORTED" ? (
      <AssignTechnicianModal outageId={outage.id} />
    ) : outage.status === "RESTORED" ? (
      <Button
        type="button"
        size="sm"
        disabled
        variant="outline"
        className="h-8 cursor-not-allowed gap-1.5 rounded-lg px-3 text-xs font-semibold text-white shadow-none disabled:bg-green-600 disabled:opacity-100"
      >
        Outage Restored
      </Button>
    ) : (
      <Button
        type="button"
        size="sm"
        disabled
        variant="outline"
        className="h-8 cursor-not-allowed gap-1.5 rounded-lg px-3 text-xs font-semibold text-white shadow-none disabled:bg-slate-600"
      >
        Technician Assigned
      </Button>
    )}
  </>
);

const AllReportedOutages = () => {
  const { data, isPending } = useGetAllOutages();

  const outages: IAllOutage[] = data?.data ?? [];

  if (isPending) {
    return <MyOutagesSkleton />;
  }

  if (outages.length === 0) {
    return (
    <EmptyText title="No Outages Reported" description="No customers have reported any power outages yet."/>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/30 hover:bg-muted/30">
                  <TableHead className="h-12 whitespace-nowrap pl-6">
                    Cause
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">Area</TableHead>
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
                        <span className="text-xs text-muted-foreground">
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
                        {renderActions(outage)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Mobile Tablet Cards */}
      <div className="space-y-2.5 xl:hidden">
        {outages.map((outage) => (
          <Card
            key={outage.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            <CardContent className="px-4 py-3.5 sm:px-5">
              <div className="hidden flex-wrap items-center gap-3 sm:flex">
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
                    outage.priority
                  )}`}
                >
                  {outage.priority}
                </Badge>

                {/* Technician */}
                <div className="hidden shrink-0 lg:block">
                  <p
                    className={`max-w-28 truncate text-xs ${
                      outage.techician
                        ? "font-medium text-card-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {outage.techician?.name ?? "Unassigned"}
                  </p>
                </div>

                {/* Reported */}
                <div className="hidden shrink-0 lg:block">
                  <p className="text-[11px] text-muted-foreground">Reported</p>
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
                  {renderActions(outage)}
                </div>
              </div>

              {/* below sm */}
              <div className="relative sm:hidden">
                <Badge
                  variant="outline"
                  className={`absolute right-0 top-0 text-[10px] font-semibold ${getStatusClassName(
                    outage.status
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
                        outage.priority
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
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-border pt-2.5">
                  {renderActions(outage)}
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
