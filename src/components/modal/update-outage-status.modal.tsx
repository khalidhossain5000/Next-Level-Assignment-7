"use client";

import { useState } from "react";

import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateReportedOutageStatusProps {
  outageId: string;
  currentStatus:
    | "REPORTED"
    | "ACKNOWLEDGED"
    | "ASSIGNED"
    | "IN_PROGRESS"
    | "RESTORED"
    | "CANCELLED";
}

const statusOptions = [
  {
    value: "REPORTED",
    label: "Reported",
  },
  {
    value: "ACKNOWLEDGED",
    label: "Acknowledged",
  },
  {
    value: "ASSIGNED",
    label: "Assigned",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "RESTORED",
    label: "Restored",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
] as const;

const UpdateReportedOutageStatus = ({
  outageId,
  currentStatus,
}: UpdateReportedOutageStatusProps) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleUpdateStatus = () => {
    console.log({
      outageId,
      status: selectedStatus,
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

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger
        render={
          <Button
            type="button"
            size="sm"
            className="h-8 gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <FiRefreshCw className="size-3.5" />
            Update Status
          </Button>
        }
      />

      {/* Dialog */}
      <DialogContent className="max-w-sm gap-0 overflow-hidden rounded-2xl p-0">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-primary/10 to-transparent px-6 pb-5 pt-7">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiRefreshCw className="size-6" />
          </div>

          <DialogHeader className="items-center text-center">
            <DialogTitle className="font-manrope text-lg font-bold text-card-foreground">
              Update Outage Status
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Change the current status of this reported outage.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-5">
          {/* Current Status */}
          <div className="rounded-xl border border-border bg-muted/30 px-4 py-3.5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  Current status
                </p>

                <p className="mt-1 text-sm font-semibold text-card-foreground">
                  {currentStatus.replace("_", " ")}
                </p>
              </div>

              <Badge
                variant="outline"
                className={getStatusClassName(currentStatus)}
              >
                {currentStatus.replace("_", " ")}
              </Badge>
            </div>
          </div>

          {/* Status Select */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-card-foreground">
              Outage Status
            </h2>

            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(
                  value as UpdateReportedOutageStatusProps["currentStatus"],
                )
              }
            >
              <SelectTrigger className="h-10 w-full rounded-lg border-border bg-background">
                <SelectValue placeholder="Select outage status" />
              </SelectTrigger>

              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-2 rounded-xl bg-primary/5 px-3.5 py-3 text-xs text-muted-foreground">
            <FiAlertCircle className="mt-0.5 size-3.5 shrink-0 text-primary" />

            <p>
              Update the outage status according to the current restoration
              progress.
            </p>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2 border-t border-border px-6 py-4 sm:gap-2">
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-lg"
              >
                Cancel
              </Button>
            }
          />

          <Button
            type="button"
            className="flex-1 gap-1.5 rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            onClick={handleUpdateStatus}
            disabled={selectedStatus === currentStatus}
          >
            <FiRefreshCw className="size-3.5" />
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReportedOutageStatus;