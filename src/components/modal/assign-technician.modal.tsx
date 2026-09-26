"use client";

import { useState } from "react";

import { FiAlertCircle, FiUserPlus, FiZap } from "react-icons/fi";
import { toast } from "sonner";

import { useAssignTechnician, useGetAllTechnician } from "@/hooks";

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

import { Spinner } from "@/components/ui/spinner";

interface AssignTechnicianModalProps {
  outageId: string;
}

interface TechnicianProfile {
  availability?: "AVAILABLE" | "BUSY";
  expertise?: string[];
  experience?: number;
  bio?: string;
}

interface Technician {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  technicianProfile?: TechnicianProfile | null;
}

const getAvailabilityClassName = (availability?: string) => {
  if (availability === "AVAILABLE") {
    return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";
  }
  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";
};

const AssignTechnicianModal = ({ outageId }: AssignTechnicianModalProps) => {
  const { data: technician, isPending: technicianPending } =
    useGetAllTechnician();

  const { mutate: assignTechnician, isPending: assigning } =
    useAssignTechnician();

  const [selectedTechnicianId, setSelectedTechnicianId] = useState("");

  const technicians: Technician[] = Array.isArray(technician)
    ? technician
    : (technician?.data ?? []);

  const selectedTechnician = technicians.find(
    (item) => item.id === selectedTechnicianId,
  );

  const handleAssignTechnician = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedTechnicianId) {
      toast.error("Please select a technician.");
      return;
    }

    assignTechnician(
      { outageId, technicianId: selectedTechnicianId },
      {
        onSuccess: () => {
          toast.success("Technician assigned successfully.");
          setSelectedTechnicianId("");
        },
        onError: (error) => {
          toast.error(
            (error as any)?.data?.message ||
              error?.message ||
              "Failed to assign technician.",
          );
        },
      },
    );
  };

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger
        render={
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 rounded-lg border-primary/25 bg-primary/5 px-3 text-xs font-semibold text-primary shadow-none transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary dark:text-white"
          >
            <FiUserPlus className="size-3.5" />
            Assign Technician
          </Button>
        }
      />

      {/* Dialog */}
      <DialogContent className="max-w-sm gap-0 overflow-hidden rounded-2xl p-0">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-primary/10 to-transparent px-6 pb-5 pt-7">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiUserPlus className="size-6" />
          </div>

          <DialogHeader className="items-center text-center">
            <DialogTitle className="font-manrope text-lg font-bold text-card-foreground">
              Assign Technician
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Select a technician to handle this reported outage.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleAssignTechnician}>
          {/* Body */}
          <div className="space-y-4 px-6 py-5">
            {/* Outage Info */}
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3.5">
              <div>
                <p className="text-xs text-muted-foreground">Outage ID</p>
                <p className="mt-1 font-mono text-sm font-semibold text-card-foreground">
                  #{outageId.slice(0, 8)}
                </p>
              </div>

              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary"
              >
                Assignment
              </Badge>
            </div>

            {/* Technician Select */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-card-foreground">
                Select Technician
              </h5>

              {technicianPending ? (
                <div className="flex h-10 items-center justify-center rounded-lg border border-border bg-muted/20">
                  <Spinner className="size-4 text-primary" />
                </div>
              ) : technicians.length === 0 ? (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3.5 py-3 text-xs text-muted-foreground">
                  <FiAlertCircle className="size-3.5 shrink-0 text-primary" />
                  <span>No technicians found at the moment.</span>
                </div>
              ) : (
                <Select
                  value={selectedTechnicianId}
                  onValueChange={(value) =>
                    setSelectedTechnicianId(value as string)
                  }
                >
                  <SelectTrigger className="h-10 w-full rounded-lg border-border bg-background">
                    <SelectValue placeholder="Choose a technician" />
                  </SelectTrigger>

                  <SelectContent>
                    {technicians.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        <div className="flex w-full items-center justify-between gap-2">
                          <span className="truncate">{item.name}</span>

                          <Badge
                            variant="outline"
                            className={`shrink-0 text-[10px] ${getAvailabilityClassName(
                              item.technicianProfile?.availability,
                            )}`}
                          >
                            {item.technicianProfile?.availability ?? "N/A"}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Selected Technician Info */}
            {selectedTechnician && (
              <div className="space-y-3 rounded-xl border border-border bg-muted/30 px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">
                      {selectedTechnician.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedTechnician.email}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className={getAvailabilityClassName(
                      selectedTechnician.technicianProfile?.availability,
                    )}
                  >
                    {selectedTechnician.technicianProfile?.availability ??
                      "N/A"}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 border-t border-border pt-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">
                      Experience:{" "}
                    </span>
                    <span className="font-medium text-card-foreground">
                      {selectedTechnician.technicianProfile?.experience ?? 0}{" "}
                      yr
                    </span>
                  </div>
                </div>

                {selectedTechnician.technicianProfile?.expertise &&
                  selectedTechnician.technicianProfile.expertise.length >
                    0 && (
                    <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
                      {selectedTechnician.technicianProfile.expertise.map(
                        (skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-[10px] font-normal text-muted-foreground"
                          >
                            {skill}
                          </Badge>
                        ),
                      )}
                    </div>
                  )}
              </div>
            )}

            {/* Info note */}
            <div className="flex items-start gap-2 rounded-xl bg-primary/5 px-3.5 py-3 text-xs text-muted-foreground">
              <FiAlertCircle className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <p>
                Assigning a technician will make them responsible for
                handling this outage.
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
                  disabled={assigning}
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              className="flex-1 gap-1.5 rounded-lg bg-primary font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
              disabled={
                !selectedTechnicianId ||
                technicianPending ||
                assigning ||
                technicians.length === 0
              }
            >
              {assigning ? (
                <>
                  <Spinner className="size-4" />
                  Assigning...
                </>
              ) : (
                <>
                  <FiZap className="size-3.5" />
                  Assign Technician
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTechnicianModal;