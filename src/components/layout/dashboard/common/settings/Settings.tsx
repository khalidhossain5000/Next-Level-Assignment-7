"use client";

import { FiCamera, FiCheckCircle, FiXCircle } from "react-icons/fi";

import { useGetMe, useUpdateUserProfile } from "@/hooks";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import SettingsSkeleton from "@/components/loader/skleton-loading/dashboard/settings.skeleton";

const Settings = () => {
  const { data, isPending } = useGetMe();

  const { mutate, isPending: isUpdating } = useUpdateUserProfile();

  const user = data?.data;

  if (isPending || !user) return <SettingsSkeleton />;

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const infoItems = [
    { label: "Email", value: user.email },
    { label: "Member since", value: memberSince },
    {
      label: "Sign-in method",
      value: user.authProvider === "GOOGLE" ? "Google" : "Email & Password",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Profile header */}
      <div className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:p-8">
        <div className="relative shrink-0">
          <Avatar className="size-28 border border-border">
            <AvatarImage
              src={user.profileImage}
              alt={user.name}
              className="object-cover"
            />
            <AvatarFallback className="text-3xl font-semibold text-muted-foreground">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <button
            type="button"
            aria-label="Change profile image"
            className="absolute bottom-0 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
          >
            <FiCamera className="size-4" />
          </button>
        </div>

        <div className="min-w-0 text-center sm:text-left">
          <h3 className="truncate text-lg font-semibold text-card-foreground">
            {user.name}
          </h3>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>

          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge variant="secondary">{user.role}</Badge>
            <Badge variant="outline">{user.status}</Badge>
            <Badge
              variant={user.emailVerified ? "default" : "destructive"}
              className="gap-1"
            >
              {user.emailVerified ? (
                <FiCheckCircle className="size-3" />
              ) : (
                <FiXCircle className="size-3" />
              )}
              {user.emailVerified ? "Email verified" : "Email not verified"}
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Read-only info */}
      <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
        {infoItems.map((item) => (
          <div key={item.label} className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-1 truncate text-sm font-medium text-card-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Name field */}
      <div className="p-6 sm:p-8">
        <Label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-card-foreground"
        >
          Full Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Your name"
          defaultValue={user.name}
          autoComplete="name"
          className="h-11 rounded-xl"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end border-t border-border bg-muted/30 px-6 py-4 sm:px-8">
        <Button
          type="button"
          disabled={isUpdating}
          className="h-11 min-w-40 cursor-pointer rounded-xl font-semibold"
        >
          {isUpdating && <Spinner />}
          {isUpdating ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </div>
  );
};

export default Settings;