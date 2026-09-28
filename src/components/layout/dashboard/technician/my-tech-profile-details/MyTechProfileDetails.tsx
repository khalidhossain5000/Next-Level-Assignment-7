"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Pencil,
  ShieldCheck,
  Upload,
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
        <div className="h-16 animate-pulse rounded-xl bg-muted" />

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="h-24 animate-pulse rounded-xl bg-muted" />
          <div className="h-24 animate-pulse rounded-xl bg-muted" />
          <div className="h-24 animate-pulse rounded-xl bg-muted" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-40 animate-pulse rounded-xl bg-muted" />
          <div className="h-40 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                         NO TECHNICIAN PROFILE                              */
  /* -------------------------------------------------------------------------- */

  if (!technicianProfile) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BriefcaseBusiness className="size-6" />
          </div>

          <h3 className="text-lg font-semibold">
            Complete your technician profile
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Add your expertise, experience, bio and resume to complete your
            professional profile.
          </p>

          <Button
            type="button"
            className="mt-5 border border-primary bg-primary px-4 text-primary-foreground shadow-sm hover:bg-primary/90 dark:border-primary/80 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
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

  const isAvailable = availability === "AVAILABLE";
  const isApproved = verificationStatus === "APPROVED";

  const hasDetails =
    expertise.length > 0 || experience > 0 || Boolean(bio) || Boolean(resume);

  /* -------------------------------------------------------------------------- */
  /*                         PROFILE NOT COMPLETED                              */
  /* -------------------------------------------------------------------------- */

  if (!hasDetails) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BriefcaseBusiness className="size-6" />
          </div>

          <h3 className="text-lg font-semibold">Your profile is incomplete</h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Add your professional information to make your technician profile
            complete.
          </p>

          <Button
            type="button"
            className="mt-5 border border-primary bg-primary px-4 text-primary-foreground shadow-sm hover:bg-primary/90 dark:border-primary/80 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
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
      {/* ---------------------------------------------------------------------- */}
      {/* Top Action Bar                                                         */}
      {/* ---------------------------------------------------------------------- */}

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={
              isApproved
                ? "border-primary/30 bg-primary/10 px-3 py-1.5 text-primary dark:border-primary/40 dark:bg-primary/15 dark:text-primary"
                : "border-border bg-muted px-3 py-1.5 text-muted-foreground"
            }
          >
            <ShieldCheck className="mr-1.5 size-3.5" />
            {isApproved ? "Verified Technician" : "Verification Pending"}
          </Badge>

          <Badge
            variant="outline"
            className={
              isAvailable
                ? "border-primary/30 bg-primary/10 px-3 py-1.5 text-primary dark:border-primary/40 dark:bg-primary/15 dark:text-primary"
                : "border-border bg-muted px-3 py-1.5 text-muted-foreground"
            }
          >
            <Clock3 className="mr-1.5 size-3.5" />
            {isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {resume ? (
            <Button
              type="button"
              variant="outline"
              className="w-full border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-primary dark:border-border dark:bg-background dark:text-foreground dark:hover:border-primary/50 dark:hover:bg-primary/15 dark:hover:text-primary sm:w-auto"
              onClick={() =>
                window.open(resume, "_blank", "noopener,noreferrer")
              }
            >
              <FileText className="size-4" />
              View Resume
              <ExternalLink className="size-3.5" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary dark:border-primary/40 dark:bg-primary/10 dark:text-primary dark:hover:bg-primary/20 sm:w-auto"
            >
              <Upload className="size-4" />
              Upload Resume
            </Button>
          )}

          <Button
            type="button"
            className="w-full border border-primary bg-primary px-4 text-primary-foreground shadow-sm hover:bg-primary/90 dark:border-primary/80 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 sm:w-auto"
          >
            <Pencil className="size-4" />
            Update Profile
          </Button>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Profile Summary                                                         */}
      {/* ---------------------------------------------------------------------- */}

      <div className="grid gap-4 sm:grid-cols-3">
        {/* Experience */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Experience
              </p>

              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold tracking-tight text-foreground">
                  {experience}
                </span>

                <span className="text-sm text-muted-foreground">
                  {experience === 1 ? "year" : "years"}
                </span>
              </div>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BriefcaseBusiness className="size-5" />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Availability
              </p>

              <Badge
                variant="outline"
                className={
                  isAvailable
                    ? "mt-3 border-primary/30 bg-primary/10 px-3 py-1.5 text-primary dark:border-primary/40 dark:bg-primary/15 dark:text-primary"
                    : "mt-3 border-border bg-muted px-3 py-1.5 text-muted-foreground"
                }
              >
                <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                {isAvailable ? "Available" : "Unavailable"}
              </Badge>
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Clock3 className="size-5" />
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Verification
              </p>

              <div className="mt-3">
                <Badge
                  variant="outline"
                  className={
                    isApproved
                      ? "border-primary/30 bg-primary/10 px-3 py-1.5 text-primary dark:border-primary/40 dark:bg-primary/15 dark:text-primary"
                      : "border-border bg-muted px-3 py-1.5 text-muted-foreground"
                  }
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
              <ShieldCheck className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Expertise + Bio                                                        */}
      {/* ---------------------------------------------------------------------- */}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Expertise */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BriefcaseBusiness className="size-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">Areas of Expertise</p>

                <p className="text-xs text-muted-foreground">
                  Your professional skills
                </p>
              </div>
            </div>
          </div>

          {expertise.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {expertise.map((item: string) => (
                <span
                  key={`${item}-${i}`}
                  className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium capitalize text-primary dark:border-primary/25 dark:bg-primary/10 dark:text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No expertise has been added yet.
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BriefcaseBusiness className="size-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">Professional Bio</p>

                <p className="text-xs text-muted-foreground">
                  About your professional experience
                </p>
              </div>
            </div>
          </div>

          {bio ? (
            <p className="text-sm leading-7 text-muted-foreground">{bio}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              No professional bio has been added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTechProfileDetails;
