"use client";

import Image from "next/image";
import { FiHash, FiMapPin, FiFileText, FiX } from "react-icons/fi";


import {  useAddSubstation, useGetAllZone } from "@/hooks";

import { useForm } from "@tanstack/react-form";

import { Field, FieldError, FieldGroup } from "../ui/field";

import { Input } from "../ui/input";

import { Label } from "../ui/label";

import { Spinner } from "../ui/spinner";

import { Button } from "../ui/button";
import { addSubstationSchema } from "@/validation";
import { toast } from "sonner";

const AddSubstationForm = () => {
    //need this beacuse of we want zone id which is necessary to add with substation
    const {data:getAllZone, isPending:allZonePending} = useGetAllZone();
    const {mutate:addSubstation , isPending:substationPending} = useAddSubstation()

    const form = useForm({
        defaultValues: {
            name: "Khulna Distrubution zone",
            code: "KYS-005",
            capacity: "this is the khulna distribution zone",
            location:"jashore sadar",
            zoneId:"sdhfjdsk"
        },
        validators: {
            onSubmit: addSubstationSchema
        },

        onSubmit: async ({ value }) => {
            console.log(value, "value value");

            const substationData = {
                name: value.name,
                code: value.code,
                capacity: value.capacity,
                location: value.location,
                zoneId:value.zoneId
            };

            addSubstation( substationData , {
                onSuccess: (res) => {
                    console.log(res, "substation Added Successfully")
                    form.reset()
                    toast.success(res.message || "substation Added Successfully")

                },
                onError: (err) => {
                    const message =
                        (err as any)?.data?.message ||
                        err.message ||
                        "Failed when creating new substation";
                    console.log(err, "this is substation error")
                    toast.error(message || "Something went wrong when adding substation")
                }
            });
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="mx-auto w-full max-w-3xl"
        >
            {/* Main Card */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {/* Decorative gradient glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent blur-3xl" />

                {/* Header */}
                <div className="relative border-b border-border px-6 py-6 sm:px-8">
                    <h2 className="font-manrope text-xl font-bold tracking-tight text-card-foreground">
                        Add New Substation
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Create a new distribution Substation and provide its basic information.
                    </p>
                </div>

                {/* Form Body */}
                <div className="relative p-6 sm:p-8">
                    <FieldGroup>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Substation Name */}
                            <form.Field name="name">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <Label
                                                htmlFor={field.name}
                                                className="mb-2 block text-sm font-semibold text-card-foreground"
                                            >
                                                Substation Name <span className="text-destructive">*</span>
                                            </Label>

                                            <div className="group relative">
                                                <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                                                <Input
                                                    id={field.name}
                                                    placeholder="e.g. Dhaka Zone"
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    className="h-11 rounded-xl border-border bg-background pl-10 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                                                    autoComplete="name"
                                                />
                                            </div>

                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Substation Code */}
                            <form.Field name="code">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <Label
                                                htmlFor={field.name}
                                                className="mb-2 block text-sm font-semibold text-card-foreground"
                                            >
                                                Zone Code <span className="text-destructive">*</span>
                                            </Label>

                                            <div className="group relative">
                                                <FiHash className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                                                <Input
                                                    id={field.name}
                                                    placeholder="e.g. DHK-001"
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    className="h-11 rounded-xl border-border bg-background pl-10 text-sm font-medium tracking-wide shadow-none transition-all placeholder:font-normal placeholder:tracking-normal placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                                                    autoComplete="off"
                                                />
                                            </div>

                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Description */}
                            <form.Field name="description">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <Label
                                                htmlFor={field.name}
                                                className="mb-2 block text-sm font-semibold text-card-foreground"
                                            >
                                                Description <span className="text-destructive">*</span>
                                            </Label>

                                            <div className="group relative">
                                                <FiFileText className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                                                <Input
                                                    id={field.name}
                                                    placeholder="Short description of this zone"
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    className="h-11 rounded-xl border-border bg-background pl-10 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                                                    autoComplete="off"
                                                />
                                            </div>

                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Zone Image */}
                            <form.Field name="zoneImage">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <Label
                                                htmlFor={field.name}
                                                className="mb-2 block text-sm font-semibold text-card-foreground"
                                            >
                                                Zone Image
                                                <span className="text-destructive">*</span>
                                            </Label>

                                            <Input
                                                ref={fileInputRef}
                                                id={field.name}
                                                type="file"
                                                accept="image/*"
                                                name={field.name}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];

                                                    if (!file) return;

                                                    if (imagePreview) {
                                                        URL.revokeObjectURL(imagePreview);
                                                    }

                                                    field.handleChange(file);

                                                    const objectUrl = URL.createObjectURL(file);

                                                    setImagePreview(objectUrl);
                                                }}
                                                aria-invalid={isInvalid}
                                                className="h-11 cursor-pointer rounded-xl border-border bg-background text-sm shadow-none transition-all file:mr-3 file:h-7 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                                            />

                                            {/* Image Preview */}
                                            {imagePreview && (
                                                <div className="relative mt-3 overflow-hidden rounded-xl border border-border">
                                                    <Image
                                                        src={imagePreview}
                                                        alt="Zone image preview"
                                                        width={600}
                                                        height={240}
                                                        unoptimized
                                                        className="h-40 w-full object-cover"
                                                    />

                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        aria-label="Remove image"
                                                        className="absolute right-2 top-2 size-8 cursor-pointer rounded-lg shadow-md"
                                                        onClick={() => {
                                                            URL.revokeObjectURL(imagePreview);

                                                            setImagePreview(null);

                                                            field.handleChange(null);

                                                            if (fileInputRef.current) {
                                                                fileInputRef.current.value = "";
                                                            }
                                                        }}
                                                    >
                                                        <FiX className="size-4" />
                                                    </Button>
                                                </div>
                                            )}

                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        </div>
                    </FieldGroup>
                </div>

                {/* Footer */}
                <div className="relative border-t border-border bg-muted/30 px-6 py-5 sm:px-8">
                    <p className="mb-3 text-xs text-muted-foreground">
                        Make sure the zone information is accurate before submitting.
                    </p>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="h-11 w-full cursor-pointer rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending && <Spinner />}
                        {isPending ? "Adding Zone..." : "Add Zone"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default AddSubstationForm;