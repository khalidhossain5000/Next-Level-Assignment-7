"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  FiBriefcase,
  FiCamera,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiUser,
  FiXCircle,
} from "react-icons/fi";

import { useGetMe } from "@/hooks";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface ITechnicianProfile {
  expertise?: string[];
  experienceYears?: number;
  bio?: string | null;
  resume?: string | null;
}

interface IMeData {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
  authProvider: string;
  role: string;
  emailVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  technicianProfile: ITechnicianProfile | null;
}

interface IMeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IMeData;
}

interface InfoItemProps {
  label: string;
  children: ReactNode;
}

const InfoItem = ({ label, children }: InfoItemProps) => {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <div className="mt-1 truncate text-sm font-medium text-card-foreground">
        {children}
      </div>
    </div>
  );
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const getStatusClassName = (status: string) => {
  if (status === "ACTIVE") {
    return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";
  }

  return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";
};

const Settings = () => {
  const { data, isPending } = useGetMe() as {
    data: IMeResponse | undefined;
    isPending: boolean;
  };

  const [nameDraft, setNameDraft] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (isPending) {
    return <h2> Loadingssss </h2>;
  }

  const user = data?.data;

  if (!user) {
    return (
      <div className="mx-auto flex min-h-72 w-full max-w-6xl items-center justify-center rounded-2xl border border-border bg-card px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiUser className="size-5" />
          </div>

          <h3 className="font-manrope text-base font-semibold text-card-foreground">
            Profile Not Found
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            We could not load your profile information.
          </p>
        </div>
      </div>
    );
  }

  const technician = user.technicianProfile;

  const nameValue = nameDraft ?? user.name;

  const isNameChanged =
    nameValue.trim() !== user.name && nameValue.trim().length > 0;

  const displayImage = imagePreview ?? user.profileImage;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Revoke the previous preview URL before creating a new one.
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(URL.createObjectURL(file));
  };

  const handleNameSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: connect update profile mutation here
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3">
      {/* Profile summary */}
      <Card className="relative h-fit overflow-hidden rounded-2xl border-border py-0 lg:col-span-1">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-linear-to-br from-primary/25 via-primary/10 to-transparent blur-3xl" />

        <CardContent className="relative flex flex-col items-center gap-4 px-6 py-8 text-center">
          <div className="relative">
            <div className="flex size-28 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-primary/10 shadow-md ring-2 ring-primary/20">
              {displayImage ? (
                <Image
                  src={displayImage}
                  alt={`${user.name} profile`}
                  width={112}
                  height={112}
                  unoptimized
                  className="size-full object-cover"
                />
              ) : (
                <span className="font-manrope text-2xl font-bold text-primary">
                  {getInitials(user.name)}
                </span>
              )}
            </div>

            <Button
              type="button"
              size="icon"
              aria-label="Change profile image"
              title="Change profile image"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 size-9 cursor-pointer rounded-full border-2 border-card bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <FiCamera className="size-4" />
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="min-w-0 max-w-full">
            <h2 className="truncate font-manrope text-lg font-bold tracking-tight text-card-foreground">
              {user.name}
            </h2>

            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 font-semibold text-primary"
            >
              {user.role}
            </Badge>

            <Badge
              variant="outline"
              className={`font-semibold ${getStatusClassName(user.status)}`}
            >
              {user.status}
            </Badge>
          </div>

          {imagePreview && (
            <p className="text-xs text-muted-foreground">
              New image selected. Save to apply changes.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Right column */}
      <div className="space-y-6 lg:col-span-2">
        {/* Edit profile */}
        <Card className="relative overflow-hidden rounded-2xl border-border py-0">
          <CardHeader className="gap-1 border-b border-border px-6 py-5">
            <CardTitle className="font-manrope text-lg font-bold tracking-tight text-card-foreground">
              Edit Profile
            </CardTitle>

            <CardDescription>
              Update your display name. Email cannot be changed.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 py-6">
            <form onSubmit={handleNameSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <Label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-card-foreground"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </Label>

                  <div className="group relative">
                    <FiUser className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                    <Input
                      id="name"
                      name="name"
                      value={nameValue}
                      onChange={(e) => setNameDraft(e.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      className="h-11 w-full rounded-xl border-border bg-background pl-10 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-card-foreground"
                  >
                    Email
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    value={user.email}
                    disabled
                    readOnly
                    className="h-11 w-full rounded-xl border-border bg-muted/40 text-sm shadow-none"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  disabled={nameDraft === null && !imagePreview}
                  onClick={() => {
                    setNameDraft(null);

                    if (imagePreview) {
                      URL.revokeObjectURL(imagePreview);
                      setImagePreview(null);
                    }

                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="h-11 cursor-pointer rounded-xl"
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  disabled={!isNameChanged && !imagePreview}
                  className="h-11 cursor-pointer rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Account information */}
        <Card className="rounded-2xl border-border py-0">
          <CardHeader className="gap-1 border-b border-border px-6 py-5">
            <CardTitle className="font-manrope text-lg font-bold tracking-tight text-card-foreground">
              Account Information
            </CardTitle>

            <CardDescription>
              Details about your account and sign in method.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5 px-6 py-6 sm:grid-cols-2">
            <InfoItem label="Email">{user.email}</InfoItem>

            <InfoItem label="Role">{user.role}</InfoItem>

            <InfoItem label="Sign in method">
              {user.authProvider.replaceAll("_", " ")}
            </InfoItem>

            <InfoItem label="Email verification">
              {user.emailVerified ? (
                <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <FiCheckCircle className="size-4" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400">
                  <FiXCircle className="size-4" />
                  Not verified
                </span>
              )}
            </InfoItem>

            <InfoItem label="Member since">
              {formatDate(user.createdAt)}
            </InfoItem>

            <InfoItem label="Last updated">
              {formatDate(user.updatedAt)}
            </InfoItem>
          </CardContent>
        </Card>

        {/* Technician profile */}
        {technician && (
          <Card className="relative overflow-hidden rounded-2xl border-border py-0">
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-linear-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />

            <CardHeader className="relative gap-1 border-b border-border px-6 py-5">
              <CardTitle className="font-manrope text-lg font-bold tracking-tight text-card-foreground">
                Technician Profile
              </CardTitle>

              <CardDescription>
                Your professional details visible to the team.
              </CardDescription>
            </CardHeader>

            <CardContent className="relative space-y-5 px-6 py-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Experience */}
                <InfoItem label="Experience">
                  <span className="inline-flex items-center gap-1.5">
                    <FiClock className="size-4 text-primary" />
                    {technician.experienceYears ?? 0} year
                    {technician.experienceYears === 1 ? "" : "s"}
                  </span>
                </InfoItem>

                {/* Resume */}
                <InfoItem label="Resume">
                  {technician.resume ? (
                    <a
                      href={technician.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <FiFileText className="size-4" />
                      View resume
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Not uploaded</span>
                  )}
                </InfoItem>
              </div>

              {/* Expertise */}
              <div>
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <FiBriefcase className="size-3.5" />
                  Expertise
                </p>

                {technician.expertise && technician.expertise.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {technician.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">
                    No expertise added yet.
                  </p>
                )}
              </div>

              {/* Bio */}
              <div>
                <p className="text-xs font-medium text-muted-foreground">Bio</p>

                <p className="mt-1 text-sm leading-6 text-card-foreground">
                  {technician.bio || "No bio added yet."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;
