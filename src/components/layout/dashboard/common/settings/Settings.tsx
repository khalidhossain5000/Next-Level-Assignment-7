"use client";

import {
  BadgeCheck,
  Calendar,
  Camera,
  Clock,
  Edit2Icon,
  Fingerprint,
  KeyRound,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import { useGetMe, useUpdateUserProfile } from "@/hooks";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SettingsSkeleton from "@/components/loader/skleton-loading/dashboard/settings.skleton";
import { formatDate } from "@/lib/formateDate";
import type { SettingsUser } from "@/types";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { updateUserProfileSchema } from "@/validation";
import { toast } from "sonner";

const Settings = () => {
  const { data, isPending } = useGetMe();
  const { mutate: updateProfile, isPending: profileUpdating } =
    useUpdateUserProfile();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const user: SettingsUser | undefined = data?.data;
  //update profile is start here

  const form = useForm({
    defaultValues: {
      name: user?.name as string | undefined,
      profileImage: null as File | null | undefined,
    },
    validators: {
      onSubmit: updateUserProfileSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value, "update profile value");
      const profileData = {
        name: value.name as string,
      };
      console.log(profileData, "profileData");
      updateProfile(
        {
          data: profileData,
          profileImage: value.profileImage as File,
        },
        {
          onSuccess: (res) => {
            console.log(res, "Profile udpted res Successfully");

            toast.success(res.message || "Profile is Updated Successfully");
          },
          onError: (err) => {
            const message =
              (err as any)?.data?.message ||
              err.message ||
              "Failed when updating profile";
            console.log(err, "this is update profile error error");
            toast.error(
              message || "Something went wrong when updating profile"
            );
          },
        }
      );
    },
  });

  if (isPending) return <SettingsSkeleton />;

  const accountDetails1 = [
    { label: "User ID", value: user?.id, icon: Fingerprint },
    {
      label: "Auth method",
      value:
        user?.authProvider === "CREDENTIAL" ? "Email & Password" : "Google",
      icon: KeyRound,
    },
    ...(user?.googleId
      ? [{ label: "Google ID", value: user.googleId, icon: KeyRound }]
      : []),
  ];

  const accountDetails2 = [
    {
      label: "Member since",
      value: formatDate(user?.createdAt),
      icon: Calendar,
    },
    {
      label: "Last updated",
      value: formatDate(user?.updatedAt),
      icon: Clock,
    },
  ];

  return (
    <section className="relative">
      {/* gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 size-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -right-32 top-1/3 size-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {/* left side profile */}
          <Card className="relative h-fit self-start overflow-hidden border-border/60 bg-card/70 shadow-sm backdrop-blur-xl lg:col-span-1">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-primary/25 via-primary/10 to-transparent"
            />

            <CardContent className="relative space-y-5 pt-8 pb-6">
              <div className="flex flex-col items-center gap-4 text-center">
                {/* profile image field */}
                <form.Field name="profileImage">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                          <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-primary/40 to-primary/0 blur-md" />
                          <Avatar className="relative size-28 border-4 border-background shadow-lg ring-1 ring-border">
                            <AvatarImage
                              src={imagePreview ?? user?.profileImage}
                              alt={user?.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="text-2xl font-semibold uppercase">
                              {user?.name?.slice(0, 2) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <Label
                            htmlFor={field.name}
                            className="absolute bottom-0 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md transition hover:bg-primary/90"
                          >
                            <Camera className="size-4" />
                            <span className="sr-only">
                              Upload new profile image
                            </span>
                          </Label>
                          <input
                            id={field.name}
                            name={field.name}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              const file = e.target.files?.[0];

                              if (!file) return;

                              if (imagePreview) {
                                URL.revokeObjectURL(imagePreview);
                              }

                              field.handleChange(file);
                              setImagePreview(URL.createObjectURL(file));
                            }}
                          />
                        </div>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                {/* user orle and active status */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge className="gap-1 rounded-sm">
                    <ShieldCheck className="size-3" />
                    {user?.role || "—"}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    {user?.status || "—"}
                  </Badge>
                  {user?.emailVerified && (
                    <Badge variant="outline" className="gap-1">
                      <BadgeCheck className="size-3 text-emerald-600" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* acount update created will be here */}
                <dl className="grid gap-3 sm:grid-cols-2">
                  {accountDetails2.map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3 transition hover:bg-muted/50"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground ring-1 ring-border">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <dt className="text-xs text-muted-foreground">
                          {label}
                        </dt>
                        <dd
                          className="truncate text-sm font-medium"
                          title={value ? String(value) : undefined}
                        >
                          {value || "—"}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </CardContent>
          </Card>

          {/* right side info */}
          <Card className="relative overflow-hidden border-border/60 bg-card/70 shadow-sm backdrop-blur-xl lg:col-span-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-primary/15 blur-3xl"
            />

            <div className="relative flex flex-col gap-6">
              <CardHeader>
                <CardTitle className="text-base">Profile information</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Update your personal details. Your email address is locked.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* name field */}
                  <form.Field name="name">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <div className="space-y-2">
                          <Label
                            htmlFor={field.name}
                            className="text-xs font-medium"
                          >
                            Full name
                          </Label>
                          <div className="group relative">
                            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                            <Input
                              id={field.name}
                              required
                              name={field.name}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="Your name"
                              autoComplete="name"
                              className="h-11 rounded-lg border-border/70 bg-background/60 pl-9 shadow-sm transition-all focus-visible:border-primary/60 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/20"
                            />
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </div>
                      );
                    }}
                  </form.Field>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-1.5 text-xs font-medium"
                    >
                      Email address
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-normal uppercase tracking-wide text-muted-foreground">
                        Locked
                      </span>
                    </Label>
                    <div className="group relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="h-11 cursor-not-allowed rounded-lg border-dashed border-border/70 bg-muted/40 pl-9 text-muted-foreground shadow-none"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Account details
                  </p>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {accountDetails1.map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3 transition hover:bg-muted/50"
                      >
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground ring-1 ring-border">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <dt className="text-xs text-muted-foreground">
                            {label}
                          </dt>
                          <dd
                            className="truncate text-sm font-medium"
                            title={value ? String(value) : undefined}
                          >
                            {value || "—"}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </CardContent>

              <CardFooter className="justify-end border-t border-border/60 pt-6">
               <form.Subscribe
  selector={(state) => ({
    name: state.values.name,
    profileImage: state.values.profileImage,
  })}
>
  {({ name, profileImage }) => {
    const nameChanged = (name ?? "").trim() !== (user?.name ?? "");
    const imageSelected = !!profileImage;
    const hasChanges = nameChanged || imageSelected;

    return (
      <Button
        type="submit"
        disabled={!hasChanges || profileUpdating}
        className="w-full sm:w-auto cursor-pointer disabled:cursor-not-allowed"
      >
        Update profile
      </Button>
    );
  }}
</form.Subscribe>
              </CardFooter>
            </div>
          </Card>
        </div>
      </form>
    </section>
  );
};

export default Settings;
