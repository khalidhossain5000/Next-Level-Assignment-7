"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { Upload, FileText, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UpdateTechProfile = () => {
    const form = useForm({
        defaultValues: {
            expertise: "",
            experienceYears: "",
            bio: "",
            resume: null as File | null,
        },
    });

    return (
        <div className="max-w-3xl">
            <form className="space-y-6">
                {/* Professional Expertise */}
                <div className="rounded-xl border bg-card p-5 shadow-sm md:p-6">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold">
                            Professional Information
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Tell customers about your technical expertise and
                            professional experience.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Expertise */}
                        <form.Field name="expertise">
                            {(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>
                                        Areas of Expertise
                                    </Label>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        placeholder="e.g. Feeder Repair, Transformer Repair"
                                    />

                                    <p className="text-xs text-muted-foreground">
                                        Add up to 5 areas, separated by commas.
                                    </p>
                                </div>
                            )}
                        </form.Field>

                        {/* Experience */}
                        <form.Field name="experienceYears">
                            {(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>
                                        Years of Experience
                                    </Label>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        min={0}
                                        max={50}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        placeholder="e.g. 5"
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Bio */}
                        <form.Field name="bio">
                            {(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>
                                        Professional Bio
                                    </Label>

                                    <Textarea
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        placeholder="Briefly describe your experience, expertise, and the type of electrical work you specialize in..."
                                        className="min-h-32 resize-none"
                                    />

                                    <p className="text-xs text-muted-foreground">
                                        Keep your bio clear and professional.
                                    </p>
                                </div>
                            )}
                        </form.Field>
                    </div>
                </div>

                {/* Resume */}
                <div className="rounded-xl border bg-card p-5 shadow-sm md:p-6">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold">
                            Resume / CV
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Upload your resume so customers and administrators
                            can review your professional background.
                        </p>
                    </div>

                    <form.Field name="resume">
                        {(field) => (
                            <div className="space-y-3">
                                <Label>Upload Resume</Label>

                                <label
                                    htmlFor="resume"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/40"
                                >
                                    <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
                                        <Upload className="size-5 text-primary" />
                                    </div>

                                    <p className="text-sm font-medium">
                                        Click to upload your resume
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        PDF, PNG, JPG or JPEG · Maximum 5 MB
                                    </p>

                                    <Input
                                        id="resume"
                                        type="file"
                                        accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] ?? null;
                                            field.handleChange(file);
                                        }}
                                    />
                                </label>

                                {field.state.value && (
                                    <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                                                <FileText className="size-4 text-primary" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">
                                                    {field.state.value.name}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {(
                                                        field.state.value
                                                            .size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(2)}{" "}
                                                    MB
                                                </p>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="shrink-0"
                                            onClick={() =>
                                                field.handleChange(null)
                                            }
                                        >
                                            <X className="size-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>

                    <Button type="submit">
                        Update Profile
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTechProfile;