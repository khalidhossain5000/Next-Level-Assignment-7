/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Pencil,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

import { useGetMe } from "@/hooks";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TechnicianProfileSkleton from "@/components/loader/skleton-loading/dashboard/tech-profile.skeleton";
import UpdateTechProfileModal from "@/components/modal/update-tech-profile.modal";


const StatCard = ({
  label,
  hint,
  icon: Icon,
  children,
}: {
  label: string;
  hint: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
    <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/10 blur-2xl" />

    <div className="relative flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>

        {children}
      </div>

      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
    </div>
  </div>
);

const DetailCard = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
    <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/8 blur-3xl" />

    <div className="relative flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>

    <div className="relative p-5 sm:p-6">{children}</div>
  </div>
);

const EmptyText = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
    {children}
  </p>
);

const EmptyState = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
    <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />

    <div className="relative flex min-h-[340px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
        <Icon className="size-6" />
      </div>

      <h3 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>

     <UpdateTechProfileModal />
    </div>
  </div>
);

const MyTechProfileDetails = () => {
  const { data, isPending } = useGetMe();
console.log(data,"this is data")
  const technicianProfile = data?.data?.technicianProfile;

  if (isPending) {
    return <TechnicianProfileSkleton />;
  }

  if (!technicianProfile) {
    return (
      <EmptyState
        icon={Sparkles}
        title="Complete your technician profile"
        description="Add your expertise, experience, bio and resume so customers can see who they are hiring."
      />
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
  const isRejected = verificationStatus === "REJECTED";

  const hasDetails =
    expertise.length > 0 || experience > 0 || Boolean(bio) || Boolean(resume);

  if (!hasDetails) {
    return (
      <EmptyState
        icon={BriefcaseBusiness}
        title="Your profile is incomplete"
        description="Add your professional information to finish setting up your technician profile."
      />
    );
  }

  const badgeBase = "h-7 gap-1.5 rounded-full px-3 text-xs font-medium";

  const verificationStyle = isApproved
    ? "border-primary/25 bg-primary/10 text-primary"
    : isRejected
    ? "border-destructive/25 bg-destructive/10 text-destructive"
    : "border-border bg-muted text-muted-foreground";

  const availabilityStyle = isAvailable
    ? "border-primary/25 bg-primary/10 text-primary"
    : "border-border bg-muted text-muted-foreground";

  const VerificationIcon = isApproved
    ? BadgeCheck
    : isRejected
    ? ShieldAlert
    : Clock3;

  const verificationLabel = isApproved
    ? "Verified technician"
    : isRejected
    ? "Verification rejected"
    : "Verification pending";

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 size-64 rounded-full bg-primary/[0.07] blur-3xl" />

        <div className="relative flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={`${badgeBase} ${verificationStyle}`}
              >
                <VerificationIcon className="size-3.5" />
                {verificationLabel}
              </Badge>

              <Badge
                variant="outline"
                className={`${badgeBase} ${availabilityStyle}`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    isAvailable ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
                {isAvailable ? "Available for work" : "Currently unavailable"}
              </Badge>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Technician profile
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                This is how customers and admins see your professional details.
                Keep your expertise, experience and resume up to date to get
                verified faster and receive more job requests.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
            {resume ? (
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full gap-2 rounded-lg bg-background/60 backdrop-blur sm:w-auto"
                onClick={() =>
                  window.open(resume, "_blank", "noopener,noreferrer")
                }
              >
                <FileText className="size-4" />
                View resume
                <ExternalLink className="size-3.5 opacity-70" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full gap-2 rounded-lg border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary sm:w-auto"
              >
                <Upload className="size-4" />
                Upload resume
              </Button>
            )}

          <UpdateTechProfileModal />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={BriefcaseBusiness}
          label="Experience"
          hint="Total years in the field"
        >
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold tracking-tight text-foreground">
              {experience}
            </span>

            <span className="text-sm text-muted-foreground">
              {experience === 1 ? "year" : "years"}
            </span>
          </div>
        </StatCard>

        <StatCard
          icon={CalendarClock}
          label="Availability"
          hint="Whether you can take new jobs"
        >
          <Badge
            variant="outline"
            className={`${badgeBase} ${availabilityStyle}`}
          >
            <span
              className={`size-1.5 rounded-full ${
                isAvailable ? "bg-primary" : "bg-muted-foreground"
              }`}
            />

            {isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </StatCard>

        <StatCard
          icon={ShieldCheck}
          label="Verification"
          hint="Review status of your profile"
        >
          <Badge
            variant="outline"
            className={`${badgeBase} ${verificationStyle}`}
          >
            {isApproved ? (
              <CheckCircle2 className="size-3.5" />
            ) : (
              <VerificationIcon className="size-3.5" />
            )}

            {isApproved ? "Approved" : isRejected ? "Rejected" : "Pending"}
          </Badge>
        </StatCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailCard
          icon={BriefcaseBusiness}
          title="Areas of expertise"
          description="The skills and services you offer"
        >
          {expertise.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {expertise.map((item: string, index: number) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-xs font-medium capitalize text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <EmptyText>No expertise has been added yet.</EmptyText>
          )}
        </DetailCard>

        <DetailCard
          icon={FileText}
          title="Professional bio"
          description="A short introduction about your work"
        >
          {bio ? (
            <p className="whitespace-pre-line text-sm leading-7 text-foreground/80">
              {bio}
            </p>
          ) : (
            <EmptyText>No professional bio has been added yet.</EmptyText>
          )}
        </DetailCard>
      </div>
    </div>
  );
};

export default MyTechProfileDetails;
