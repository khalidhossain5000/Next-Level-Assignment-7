"use client";

import {
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiUser,
  FiZap,
} from "react-icons/fi";

import { useGetTechnicanAssignedOutages } from "@/hooks";

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

const AssignedOutages = () => {
  const { data, isPending } = useGetTechnicanAssignedOutages();

  const outages: IAssignedOutage[] = data?.data ?? [];

  const StatusSelect = ({ outage }: { outage: IAssignedOutage }) => {
    const isFinalized = outage.status === "RESTORED";

    if (isFinalized) {
      return (
        <Badge
          variant="outline"
          className={`flex w-fit items-center gap-1 text-xs font-semibold ${getStatusClassName(
            outage.status,
          )}`}
        >
          <FiCheckCircle className="size-3.5" />
          RESTORED
        </Badge>
      );
    }

    return (
      <Select value={outage.status}>
        <SelectTrigger
          className={`h-8 w-[140px] rounded-lg border text-xs font-semibold ${getStatusClassName(
            outage.status,
          )}`}
        >
          <SelectValue />
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
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-card-foreground">
            Assigned Outages
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Outages assigned to you — update the status as you make progress.
          </p>
        </div>

        <Badge
          variant="outline"
          className="w-fit rounded-full px-3 py-1 text-xs font-medium"
        >
          {outages.length} {outages.length === 1 ? "Outage" : "Outages"}
        </Badge>
      </div>

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
                    Customer
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Area
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Priority
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Reported At
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap pr-6">
                    Update Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {outages.map((outage) => (
                  <TableRow
                    key={outage.id}
                    className="transition-colors hover:bg-muted/30"
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

                    {/* Customer */}
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <FiUser className="size-3.5 shrink-0 text-muted-foreground" />
                        <div className="max-w-36">
                          <p className="truncate text-sm text-card-foreground">
                            {outage.user?.name ?? "N/A"}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {outage.user?.email ?? "N/A"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Area */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FiMapPin className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="max-w-36 truncate font-medium text-card-foreground">
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

                    {/* Reported At */}
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(outage.reported_At)}
                    </TableCell>

                    {/* Update Status */}
                    <TableCell className="pr-6">
                      <StatusSelect outage={outage} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

    
      <div className="space-y-3 xl:hidden">
        {outages.map((outage) => (
          <Card
            key={outage.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            <CardContent className="space-y-3 px-4 py-3.5 sm:px-5">
              {/* Top: Cause + Update dropdown */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                      {outage.cause}
                    </p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      #{outage.id.slice(0, 8)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FiMapPin className="size-3.5 shrink-0" />
                    <span className="truncate">
                      {outage.area?.name ?? "N/A"}
                    </span>
                  </div>
                </div>

                <StatusSelect outage={outage} />
              </div>

              {/* Customer + Priority + Reported */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-2.5 text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <FiUser className="size-3.5" />
                  <span className="text-card-foreground">
                    {outage.user?.name ?? "N/A"}
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className={`text-[10px] ${getPriorityClassName(
                    outage.priority,
                  )}`}
                >
                  {outage.priority}
                </Badge>

                <div className="ml-auto flex items-center gap-1 text-muted-foreground">
                  <FiClock className="size-3.5" />
                  {formatDate(outage.reported_At)}
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