/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { FiTag, FiClock, FiFileText, FiX, FiFile } from "react-icons/fi";
import { useRef, useState } from "react";

import { useUpdateTechnicianProfile } from "@/hooks";

import { useForm } from "@tanstack/react-form";

import { Field, FieldError, FieldGroup } from "../ui/field";

import { Input } from "../ui/input";

import { Label } from "../ui/label";

import { Spinner } from "../ui/spinner";

import { Button } from "../ui/button";
import { updateTechnicianProfileSchema } from "@/validation";
import { toast } from "sonner";

const MAX_EXPERTISE = 5;

const UpdateTechnicianProfileForm = () => {
  const { mutate: updateProfile, isPending } = useUpdateTechnicianProfile();

  const [expertiseInput, setExpertiseInput] = useState("");
  const [resumeName, setResumeName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      expertise: [] as string[],
      experienceYears: 0,
      bio: "",
      resume: null as File | null,
    },
    validators: {
      onSubmit: updateTechnicianProfileSchema,
    },

    onSubmit: async ({ value }) => {
      const profileData = {
        expertise: value.expertise,
        experienceYears: value.experienceYears,
        bio: value.bio,
      };

      updateProfile(
        {
          data: profileData,
          resume: value.resume as File,
        },
        {
          onSuccess: (res) => {
            form.reset();
            console.log(res,'success res')
            setExpertiseInput("");
            setResumeName(null);

            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }

            toast.success(res.message || "Profile Updated Successfully");
          },
          onError: (err) => {
            const message =
              (err as any)?.data?.message ||
              err.message ||
              "Failed when updating technician profile";

            toast.error(
              message || "Something went wrong when updating profile"
            );
          },
        }
      );
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

        {/* Form Body */}
        <div className="relative p-4 sm:p-6 md:p-8">
          <FieldGroup>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {/* Expertise (tag input) */}
              <form.Field name="expertise">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  const tags = field.state.value;

                  const addTag = () => {
                    const trimmed = expertiseInput.trim();

                    if (!trimmed) return;
                    if (tags.includes(trimmed)) {
                      setExpertiseInput("");
                      return;
                    }
                    if (tags.length >= MAX_EXPERTISE) return;

                    field.handleChange([...tags, trimmed]);
                    setExpertiseInput("");
                  };

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Expertise <span className="text-destructive">*</span>
                        <span className="ml-1 text-xs font-normal text-muted-foreground">
                          ({tags.length}/{MAX_EXPERTISE})
                        </span>
                      </Label>

                      <div className="group relative">
                        <FiTag className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          placeholder="e.g. Feeder Repair (press Enter or ,)"
                          value={expertiseInput}
                          onChange={(e) => setExpertiseInput(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === ",") {
                              e.preventDefault();
                              addTag();
                            }
                            if (
                              e.key === "Backspace" &&
                              !expertiseInput &&
                              tags.length > 0
                            ) {
                              field.handleChange(tags.slice(0, -1));
                            }
                          }}
                          disabled={tags.length >= MAX_EXPERTISE}
                          aria-invalid={isInvalid}
                          className="h-11 w-full rounded-xl border-border bg-background pl-10 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                          autoComplete="off"
                        />
                      </div>

                      {/* Tag chips */}
                      {tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <span
                              key={`${tag}-${index}`}
                              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 py-1 pl-3 pr-1.5 text-xs font-medium text-primary"
                            >
                              {tag}
                              <button
                                type="button"
                                aria-label={`Remove ${tag}`}
                                onClick={() =>
                                  field.handleChange(
                                    tags.filter((_, i) => i !== index)
                                  )
                                }
                                className="cursor-pointer rounded-full p-0.5 transition-colors hover:bg-primary/20"
                              >
                                <FiX className="size-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Experience Years */}
              <form.Field name="experienceYears">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Experience (Years){" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiClock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          type="number"
                          min={0}
                          placeholder="e.g. 5"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          aria-invalid={isInvalid}
                          className="h-11 w-full rounded-xl border-border bg-background pl-10 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
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

              {/* Bio */}
              <form.Field name="bio">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Bio <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiFileText className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          placeholder="Short professional bio"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-11 w-full rounded-xl border-border bg-background pl-10 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
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

              {/* Resume */}
              <form.Field name="resume">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Resume (PDF) <span className="text-destructive">*</span>
                      </Label>

                      <Input
                        ref={fileInputRef}
                        id={field.name}
                        type="file"
                        accept="application/pdf"
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (!file) return;

                          field.handleChange(file);
                          setResumeName(file.name);
                        }}
                        aria-invalid={isInvalid}
                        className="h-11 w-full cursor-pointer rounded-xl border-border bg-background text-sm shadow-none transition-all file:mr-3 file:h-7 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                      />

                      {/* File preview */}
                      {resumeName && (
                        <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-border bg-muted/30 px-4 py-2.5">
                          <div className="flex min-w-0 items-center gap-2">
                            <FiFile className="size-4 shrink-0 text-primary" />
                            <span className="truncate text-sm text-card-foreground">
                              {resumeName}
                            </span>
                          </div>

                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            aria-label="Remove resume"
                            className="size-8 shrink-0 cursor-pointer rounded-lg shadow-md"
                            onClick={() => {
                              setResumeName(null);
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
        <div className="relative border-t border-border bg-muted/30 px-4 py-5 sm:px-6 md:px-8">
          <p className="mb-3 text-xs text-muted-foreground">
            Make sure your profile information is accurate before submitting.
          </p>

          <Button
            type="submit"
            disabled={isPending}
            className="h-11 w-full cursor-pointer rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending && <Spinner />}
            {isPending ? "Updating Profile..." : "Update Profile"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateTechnicianProfileForm;