"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Pencil,
  ShieldCheck,
} from "lucide-react";

import { useGetMe } from "@/hooks";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MyTechProfileDetails = () => {
  const { data, isPending } = useGetMe();

  const technicianProfile = data?.data?.technicianProfile;

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="h-20 animate-pulse rounded-xl bg-muted" />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-24 animate-pulse rounded-xl bg-muted" />
          <div className="h-24 animate-pulse rounded-xl bg-muted" />
          <div className="h-24 animate-pulse rounded-xl bg-muted" />
        </div>

        <div className="h-32 animate-pulse rounded-xl bg-muted" />
        <div className="h-28 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!technicianProfile) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BriefcaseBusiness className="size-6" />
          </div>

          <h3 className="text-lg font-semibold">Profile details not added</h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Add your professional information, expertise, experience, bio and
            resume to complete your technician profile.
          </p>

          <Button
            type="button"
            className="mt-5 gap-2 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Pencil className="size-4" />
            Update Profile
          </Button>
        </div>
      </div>
    );
  }

  const expertise = technicianProfile.expertise ?? [];
  const experience = technicianProfile.experience ?? 0;
  const availability = technicianProfile.availability;
  const bio = technicianProfile.bio?.trim();
  const resume = technicianProfile.resume;
  const verificationStatus =
    technicianProfile.technicianvProfileVerificationStatus;

  const isApproved = verificationStatus === "APPROVED";
  const isAvailable = availability === "AVAILABLE";

  const hasAnyDetails =
    expertise.length > 0 || experience > 0 || Boolean(bio) || Boolean(resume);

  if (!hasAnyDetails) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BriefcaseBusiness className="size-6" />
          </div>

          <h3 className="text-lg font-semibold">
            Complete your technician profile
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Your technician profile is ready, but no professional details have
            been added yet.
          </p>

          <Button
            type="button"
            className="mt-5 gap-2 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Pencil className="size-4" />
            Update Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top profile summary */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BriefcaseBusiness className="size-5" />
          </div>

          <div>
            <p className="text-sm font-semibold">Professional Information</p>

            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Your technician profile details
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full gap-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary sm:w-auto"
        >
          <Pencil className="size-4" />
          Update Profile
        </Button>
      </div>

      {/* Basic profile information */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Experience */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Experience
              </p>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold tracking-tight">
                  {experience}
                </span>

                <span className="text-sm text-muted-foreground">
                  {experience === 1 ? "year" : "years"}
                </span>
              </div>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BriefcaseBusiness className="size-4" />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Availability
              </p>

              <Badge
                variant="outline"
                className={`mt-3 rounded-full px-3 py-1 ${
                  isAvailable
                    ? "border-primary/20 bg-primary/10 text-primary"
                    : "border-border bg-muted text-muted-foreground"
                }`}
              >
                <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                {isAvailable ? "Available" : "Unavailable"}
              </Badge>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Clock3 className="size-4" />
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Verification
              </p>

              <div className="mt-3">
                <Badge
                  variant="outline"
                  className={`rounded-full px-3 py-1 ${
                    isApproved
                      ? "border-primary/20 bg-primary/10 text-primary"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {isApproved ? (
                    <CheckCircle2 className="mr-1.5 size-3.5" />
                  ) : (
                    <ShieldCheck className="mr-1.5 size-3.5" />
                  )}

                  {isApproved ? "Approved" : "Pending"}
                </Badge>
              </div>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Expertise */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-4">
          <p className="text-sm font-semibold">Areas of Expertise</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Skills and technical areas
          </p>
        </div>

        {expertise.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {expertise.map((item: string, index: number) => (
              <span
                key={`${item}-${index}`}
                className="rounded-md border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium capitalize text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No expertise added yet.
          </p>
        )}
      </div>

      {/* Bio */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-4">
          <p className="text-sm font-semibold">Professional Bio</p>

          <p className="mt-1 text-xs text-muted-foreground">
            About your professional experience
          </p>
        </div>

        <div className="rounded-lg border border-border/70 bg-background px-4 py-4">
          {bio ? (
            <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {bio}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              No professional bio added yet.
            </p>
          )}
        </div>
      </div>

      {/* Resume */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-4">
          <p className="text-sm font-semibold">Resume</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Your uploaded professional resume
          </p>
        </div>

        {resume ? (
          <div className="flex flex-col gap-4 rounded-lg border border-border/70 bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>

              <div>
                <p className="text-sm font-medium">Professional Resume</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Resume uploaded successfully
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 sm:w-auto"
              onClick={() =>
                window.open(resume, "_blank", "noopener,noreferrer")
              }
            >
              <ExternalLink className="size-4" />
              View Resume
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border px-4 py-5">
            <p className="text-sm text-muted-foreground">
              No resume uploaded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTechProfileDetails;
