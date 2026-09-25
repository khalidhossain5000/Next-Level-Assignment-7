"use client";

import { useGetMyOutages } from "@/hooks";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import type { IMyOutage } from "@/types";

const MyOutages = () => {
  const { data: myOutages, isPending } = useGetMyOutages();
console.log(myOutages,'outages')
  const outages = myOutages?.data ?? [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "RESTORED":
        return "default";
      case "REPORTED":
        return "secondary";
      case "ACKNOWLEDGED":
        return "outline";
      case "ASSIGNED":
        return "outline";
      case "IN_PROGRESS":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPriorityVariant = (priority: string) => {
    if (priority === "HIGH") {
      return "destructive";
    }

    return "secondary";
  };

  if (isPending) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (outages.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-2xl border border-border bg-card">
        <p className="text-sm text-muted-foreground">
          You have not reported any outages yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div>
        <h2 className="font-manrope text-xl font-bold tracking-tight text-card-foreground">
          My Outages
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          View and track all the power outages you have reported.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">
                  Cause
                </TableHead>

                <TableHead className="whitespace-nowrap">
                  Area
                </TableHead>

                <TableHead className="whitespace-nowrap">
                  Priority
                </TableHead>

                <TableHead className="whitespace-nowrap">
                  Status
                </TableHead>

                <TableHead className="whitespace-nowrap">
                  Reported At
                </TableHead>

                <TableHead className="min-w-70">
                  Description
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {outages.map((outage:IMyOutage) => (
                <TableRow key={outage.id}>
                  {/* Cause */}
                  <TableCell className="font-medium whitespace-nowrap">
                    {outage.cause}
                  </TableCell>

                  {/* Area */}
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-medium whitespace-nowrap">
                        {outage.area?.name ?? "N/A"}
                      </p>

                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {outage.area?.code ?? "N/A"}
                      </p>
                    </div>
                  </TableCell>

                  {/* Priority */}
                  <TableCell>
                    <Badge
                      variant={getPriorityVariant(outage.priority)}
                    >
                      {outage.priority}
                    </Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={getStatusVariant(outage.status)}
                    >
                      {outage.status.replace("_", " ")}
                    </Badge>
                  </TableCell>

                  {/* Reported At */}
                  <TableCell className="whitespace-nowrap text-sm">
                    {formatDate(outage.reported_At)}
                  </TableCell>

                  {/* Description */}
                  <TableCell>
                    <p
                      title={outage.description}
                      className="max-w-105 truncate text-sm text-muted-foreground"
                    >
                      {outage.description}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MyOutages;