"use client";

import {
    BadgeCheck,
    Calendar,
    Camera,
    Clock,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SettingsSkeleton from "@/components/loader/skleton-loading/dashboard/settings.skleton";
import { formatDate } from "@/lib/formateDate";
import type { SettingsUser } from "@/types";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { updateUserProfileSchema } from "@/validation";


const Settings = () => {
    const { data, isPending } = useGetMe();
    const { mutate: updateProfile, isPending: profileUpdating } = useUpdateUserProfile()
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const user: SettingsUser | undefined = data?.data;

    const form = useForm({
        defaultValues: {
            name: user?.name
        },
        validators: {
            onSubmit: updateUserProfileSchema,
        },
        onSubmit: {

        }
    })






    if (isPending) return <SettingsSkeleton />;



    const accountDetails = [
        { label: "User ID", value: user?.id, icon: Fingerprint },
        {
            label: "Auth method",
            value: user?.authProvider === "CREDENTIAL" ? "Email & Password" : "Google",
            icon: KeyRound,
        },
        ...(user?.googleId
            ? [{ label: "Google ID", value: user.googleId, icon: KeyRound }]
            : []),
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
    //update profile is start here

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
                                <div className="relative">
                                    <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-primary/40 to-primary/0 blur-md" />
                                    <Avatar className="relative size-28 border-4 border-background shadow-lg ring-1 ring-border">
                                        <AvatarImage
                                            src={user?.profileImage}
                                            alt={user?.name}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="text-2xl font-semibold uppercase">
                                            {user?.name?.slice(0, 2) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Label
                                        htmlFor="profile-image"
                                        className="absolute bottom-0 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md transition hover:bg-primary/90"
                                    >
                                        <Camera className="size-4" />
                                        <span className="sr-only">Upload new profile image</span>
                                    </Label>
                                    <input
                                        id="profile-image"
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                    />
                                </div>

                                <div className="w-full space-y-1">
                                    <h2 className="truncate text-lg font-semibold">
                                        {user?.name || "—"}
                                    </h2>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {user?.email || "—"}
                                    </p>
                                </div>

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
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-medium">
                                            Full name
                                        </Label>
                                        <div className="group relative">
                                            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                            <Input
                                                id="name"
                                                name="name"
                                                defaultValue={user?.name}
                                                placeholder="Your name"
                                                className="h-11 rounded-lg border-border/70 bg-background/60 pl-9 shadow-sm transition-all focus-visible:border-primary/60 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/20"
                                            />
                                        </div>
                                    </div>

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
                                        {accountDetails.map(({ label, value, icon: Icon }) => (
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
                                <Button
                                    type="button"
                                    disabled
                                    className="w-full cursor-not-allowed sm:w-auto"
                                >
                                    Update profile
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>
                </div>
            </form>
        </section>
    );
};

export default Settings;