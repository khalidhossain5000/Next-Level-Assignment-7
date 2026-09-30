"use client";

import { toast } from "sonner";
import { FiAward, FiCheckCircle, FiClock, FiX } from "react-icons/fi";

import { useApproveTechnician, useGetAllTechnician } from "@/hooks";
import { TechnicianProfileStatus } from "@/types"; 

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

interface TechnicianProfile {
  availability?: "AVAILABLE" | "BUSY";
  expertise?: string[];
  experience?: number;
  bio?: string;
  technicianvProfileVerificationStatus?: TechnicianProfileStatus;
}

interface Technician {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  status?: string;
  technicianProfile?: TechnicianProfile | null;
  assignedOutages?: { id: string; status: string }[];
}

const getAvailabilityClassName = (availability?: string) => {
  if (availability === "AVAILABLE") {
    return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";
  }
  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";
};

const getVerificationClassName = (status?: TechnicianProfileStatus) => {
  switch (status) {
    case TechnicianProfileStatus.APPROVED:
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";
    case TechnicianProfileStatus.REJECTED:
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";
    default:
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";
  }
};

const getVerificationLabel = (status?: TechnicianProfileStatus) => {
  switch (status) {
    case TechnicianProfileStatus.APPROVED:
      return "APPROVED";
    case TechnicianProfileStatus.REJECTED:
      return "REJECTED";
    default:
      return "PENDING";
  }
};

const ManageTechnician = () => {
  const { data: technician, isPending: technicianPending } =
    useGetAllTechnician();

  const {
    mutate: approveTechnician,
    isPending: approving,
    variables,
  } = useApproveTechnician();

  const technicians: Technician[] = Array.isArray(technician)
    ? technician
    : (technician?.data ?? []);

  const handleUpdateStatus = (
    technicianId: string,
    status: TechnicianProfileStatus,
  ) => {
    const payload = {
      technicianId,
      status,
    };

    approveTechnician(payload, {
      onSuccess: () => {
        toast.success(
          status === TechnicianProfileStatus.APPROVED
            ? "Technician approved successfully."
            : "Technician rejected.",
        );
      },
      onError: (error: any) => {
        toast.error(
          error?.data?.message ||
            error?.message ||
            `Failed to ${
              status === TechnicianProfileStatus.APPROVED
                ? "approve"
                : "reject"
            } technician.`,
        );
      },
    });
  };

  if (technicianPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (technicians.length === 0) {
    return (
      <div className="mx-auto flex min-h-72 w-full max-w-6xl items-center justify-center rounded-2xl border border-border bg-card px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiAward className="size-5" />
          </div>
          <h3 className="font-manrope text-base font-semibold text-card-foreground">
            No Technicians Found
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No technician accounts have been registered yet.
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
            Technicians
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review technician profiles and approve verification requests.
          </p>
        </div>

        <Badge
          variant="outline"
          className="w-fit rounded-full px-3 py-1 text-xs font-medium"
        >
          {technicians.length}{" "}
          {technicians.length === 1 ? "Technician" : "Technicians"}
        </Badge>
      </div>

     
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="h-12 whitespace-nowrap pl-6">
                    Technician
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Expertise
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Experience
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Availability
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Assigned Outages
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Verification
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap pr-6 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {technicians.map((item) => {
                  const verificationStatus =
                    item.technicianProfile
                      ?.technicianvProfileVerificationStatus;
                  const isApproved =
                    verificationStatus === TechnicianProfileStatus.APPROVED;
                  const isThisRowPending =
                    approving &&
                    (variables as any)?.technicianId === item.id;

                  return (
                    <TableRow
                      key={item.id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      {/* Technician */}
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0 max-w-44">
                            <p className="truncate font-semibold text-card-foreground">
                              {item.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Expertise */}
                      <TableCell>
                        <div className="flex max-w-56 flex-wrap gap-1">
                          {(item.technicianProfile?.expertise ?? [])
                            .slice(0, 2)
                            .map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-[10px] font-normal text-muted-foreground"
                              >
                                {skill}
                              </Badge>
                            ))}
                          {(item.technicianProfile?.expertise?.length ?? 0) >
                            2 && (
                            <Badge
                              variant="outline"
                              className="text-[10px] font-normal text-muted-foreground"
                            >
                              +{item.technicianProfile!.expertise!.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      {/* Experience */}
                      <TableCell className="whitespace-nowrap text-sm text-card-foreground">
                        {item.technicianProfile?.experience ?? 0} yr
                      </TableCell>

                      {/* Availability */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getAvailabilityClassName(
                            item.technicianProfile?.availability,
                          )}
                        >
                          {item.technicianProfile?.availability ?? "N/A"}
                        </Badge>
                      </TableCell>

                      {/* Assigned Outages */}
                      <TableCell className="whitespace-nowrap text-sm text-card-foreground">
                        {item.assignedOutages?.length ?? 0}
                      </TableCell>

                      {/* Verification */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getVerificationClassName(
                            verificationStatus,
                          )}
                        >
                          {getVerificationLabel(verificationStatus)}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          {isApproved ? (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <FiCheckCircle className="size-3.5 text-green-600" />
                              Approved
                            </span>
                          ) : (
                            <>
                              <Button
                                type="button"
                                size="sm"
                                disabled={isThisRowPending}
                                onClick={() =>
                                  handleUpdateStatus(
                                    item.id,
                                    TechnicianProfileStatus.APPROVED,
                                  )
                                }
                                className="h-9 gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                              >
                                <FiCheckCircle className="size-3.5" />
                                Approve
                              </Button>

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={isThisRowPending}
                                onClick={() =>
                                  handleUpdateStatus(
                                    item.id,
                                    TechnicianProfileStatus.REJECTED,
                                  )
                                }
                                className="h-9 gap-1.5 rounded-lg border-red-200 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                              >
                                <FiX className="size-3.5" />
                                Reject
                              </Button>
                            </>
                          )}
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

      {/* =====================================================
          BELOW XL → CARD VIEW
      ====================================================== */}
      <div className="space-y-3 xl:hidden">
        {technicians.map((item) => {
          const verificationStatus =
            item.technicianProfile?.technicianvProfileVerificationStatus;
          const isApproved =
            verificationStatus === TechnicianProfileStatus.APPROVED;
          const isThisRowPending =
            approving && (variables as any)?.technicianId === item.id;

          return (
            <Card
              key={item.id}
              className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
            >
              <CardContent className="space-y-3 px-4 py-3.5 sm:px-5">
                {/* Top: Name + Verification */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-card-foreground">
                        {item.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.email}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={`shrink-0 text-[10px] ${getVerificationClassName(
                      verificationStatus,
                    )}`}
                  >
                    {getVerificationLabel(verificationStatus)}
                  </Badge>
                </div>

                {/* Expertise */}
                {(item.technicianProfile?.expertise?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-1.5 border-t border-border pt-2.5">
                    {item.technicianProfile!.expertise!.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-[10px] font-normal text-muted-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-2.5 text-xs">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${getAvailabilityClassName(
                      item.technicianProfile?.availability,
                    )}`}
                  >
                    {item.technicianProfile?.availability ?? "N/A"}
                  </Badge>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <FiClock className="size-3.5" />
                    <span>
                      {item.technicianProfile?.experience ?? 0} yr experience
                    </span>
                  </div>

                  <span className="ml-auto text-muted-foreground">
                    {item.assignedOutages?.length ?? 0} assigned
                  </span>
                </div>

                {/* Action */}
                <div className="flex items-center justify-end gap-1.5 border-t border-border pt-2.5">
                  {isApproved ? (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <FiCheckCircle className="size-3.5 text-green-600" />
                      Approved
                    </span>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isThisRowPending}
                        onClick={() =>
                          handleUpdateStatus(
                            item.id,
                            TechnicianProfileStatus.REJECTED,
                          )
                        }
                        className="h-8 gap-1.5 rounded-lg border-red-200 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                      >
                        <FiX className="size-3.5" />
                        Reject
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        disabled={isThisRowPending}
                        onClick={() =>
                          handleUpdateStatus(
                            item.id,
                            TechnicianProfileStatus.APPROVED,
                          )
                        }
                        className="h-8 gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                      >
                        <FiCheckCircle className="size-3.5" />
                        Approve
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ManageTechnician;