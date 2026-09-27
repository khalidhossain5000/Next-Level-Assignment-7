"use client";

import { useState } from "react";
import {
  FiAlertTriangle,
  FiChevronDown,
  FiEdit2,
  FiFileText,
  FiGrid,
} from "react-icons/fi";

import { useGetArea, useUpdateOutage } from "@/hooks";

import { useForm } from "@tanstack/react-form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

import { updateOutageSchema } from "@/validation";
import type { IMyOutage } from "@/types";

import { toast } from "sonner";

interface UpdateOutageModalProps {
  outage: IMyOutage;
}

const UpdateOutageModal = ({ outage }: UpdateOutageModalProps) => {
  const [open, setOpen] = useState(false);

  const { data, isPending: areaPending } = useGetArea();

  const { mutate: updateOutage, isPending: updateOutagePending } =
    useUpdateOutage();

  const areas = data?.data ?? [];

  const form = useForm({
    defaultValues: {
      cause: outage.cause,
      description: outage.description,
      areaId: outage.area?.id ?? "",
    },

    validators: {
      onSubmit: updateOutageSchema,
    },

    onSubmit: async ({ value }) => {
      const outageData = {
        cause: value.cause,
        description: value.description,
        areaId: value.areaId,
      };

      updateOutage(
        { outageId: outage.id, data: outageData },
        {
          onSuccess: (res) => {
            setOpen(false);

            toast.success(res.message || "Outage Updated Successfully");
          },

          onError: (err) => {
            const message =
              (err as any)?.data?.message ||
              err.message ||
              "Failed when updating outage";

            toast.error(
              message || "Something went wrong when updating outage",
            );
          },
        },
      );
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);

        if (next) {
          form.reset({
            cause: outage.cause,
            description: outage.description,
            areaId: outage.area?.id ?? "",
          });
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="cursor-pointer size-9 cursor-pointer rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary"
            title="Edit outage"
            aria-label="Edit outage"
          >
            <FiEdit2 className="size-4" />
          </Button>
        }
      />

      <DialogContent className="max-w-4xl gap-0 overflow-hidden rounded-2xl p-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Header */}
          <DialogHeader className="relative border-b border-border px-6 py-6 sm:px-8">
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent blur-3xl" />

            <DialogTitle className="font-manrope text-xl font-bold tracking-tight text-card-foreground">
              Update Outage Report
            </DialogTitle>

            <DialogDescription className="text-sm leading-6 text-muted-foreground">
              Update the details of this reported outage.
            </DialogDescription>
          </DialogHeader>

          {/* Form Body */}
          <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
            <FieldGroup>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Cause */}
                <form.Field name="cause">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <Label
                          htmlFor={field.name}
                          className="mb-2 block text-sm font-semibold text-card-foreground"
                        >
                          Cause <span className="text-destructive">*</span>
                        </Label>

                        <div className="group relative">
                          <FiAlertTriangle className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                          <Input
                            id={field.name}
                            placeholder="e.g. Equipment Failure"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
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

                {/* Area */}
                <form.Field name="areaId">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <Label
                          htmlFor={field.name}
                          className="mb-2 block text-sm font-semibold text-card-foreground"
                        >
                          Affected Area{" "}
                          <span className="text-destructive">*</span>
                        </Label>

                        <div className="group relative">
                          <FiGrid className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                          <select
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
                            aria-invalid={isInvalid}
                            disabled={areaPending}
                            className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-border bg-background pl-10 pr-10 text-sm shadow-none transition-all focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-background"
                          >
                            <option value="" disabled>
                              {areaPending
                                ? "Loading areas..."
                                : "Select affected area"}
                            </option>

                            {areas.map((area: any) => (
                              <option key={area.id} value={area.id}>
                                {area.name} ({area.code})
                              </option>
                            ))}
                          </select>

                          <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        </div>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Description - Full Width */}
                <form.Field name="description">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} className="sm:col-span-2">
                        <Label
                          htmlFor={field.name}
                          className="mb-2 block text-sm font-semibold text-card-foreground"
                        >
                          Description{" "}
                          <span className="text-destructive">*</span>
                        </Label>

                        <div className="group relative">
                          <FiFileText className="pointer-events-none absolute left-3.5 top-4 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />

                          <Textarea
                            id={field.name}
                            placeholder="Describe the power outage..."
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
                            aria-invalid={isInvalid}
                            className="min-h-32 rounded-xl border-border bg-background pl-10 pt-3.5 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                          />
                        </div>

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
          <DialogFooter className="gap-2 border-t border-border bg-muted/30 px-6 py-4 sm:gap-2 sm:px-8">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-lg sm:flex-none"
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={updateOutagePending || areaPending}
              className="h-11 flex-1 cursor-pointer rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:px-8"
            >
              {updateOutagePending && <Spinner />}
              {updateOutagePending ? "Updating..." : "Update Outage"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOutageModal;