"use client";

import {
  FiActivity,
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiFileText,
  FiGrid,
  FiTool,
} from "react-icons/fi";

import { useAddPlannedOutage, useGetArea } from "@/hooks";

import { useForm } from "@tanstack/react-form";

import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";

import { addPlannedOutageSchema } from "@/validation";

import { toast } from "sonner";

const getMinDateTime = () => {
  const date = new Date();
  date.setSeconds(0, 0);
  date.setMinutes(date.getMinutes() + 1);

  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 16);
};

const PlannedOutageForm = () => {
  const { data, isPending: areaPending } = useGetArea();

  const { mutate: addPlannedOutage, isPending: plannedOutagePending } =
    useAddPlannedOutage();

  const areas = data?.data ?? [];
  const minDateTime = getMinDateTime();

  const form = useForm({
    defaultValues: {
      title: "",
      reason: "",
      description: "",
      startTime: "2026-10-22T05:00",
      endTime: "2026-10-26T17:00",
      areaId: "",
    },

    validators: {
      onSubmit: addPlannedOutageSchema,
    },

    onSubmit: async ({ value }) => {


      const plannedOutageData = {
        title: value.title,
        reason: value.reason,
        description: value.description,
        startTime: new Date(value.startTime).toISOString(),
        endTime: new Date(value.endTime).toISOString(),
        areaId: value.areaId,
      };

      addPlannedOutage(plannedOutageData, {
        onSuccess: (res) => {


          form.reset();

          toast.success(
            res.message || "Planned Outage Added Successfully",
          );
        },

        onError: (err) => {
          const message =
            (err as any)?.data?.message ||
            err.message ||
            "Failed when creating planned outage";

          console.log(err, "this is planned outage error");

          toast.error(
            message || "Something went wrong when adding planned outage",
          );
        },
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
            Add Planned Outage
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Schedule a planned power interruption for a specific area.
          </p>
        </div>

        {/* Form Body */}
        <div className="relative p-6 sm:p-8">
          <FieldGroup>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Title - Full Width */}
              <form.Field name="title">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="sm:col-span-2"
                    >
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Planned Outage Title{" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiFileText className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          placeholder="e.g. Emergency Network Inspection"
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

              {/* Start Time */}
              <form.Field name="startTime">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Start Time{" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiClock className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          type="datetime-local"
                          min={minDateTime}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-11 rounded-xl border-border bg-background pl-10 text-sm shadow-none transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                        />
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* End Time */}
              <form.Field name="endTime">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        End Time{" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiCalendar className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          type="datetime-local"
                          min={
                            field.state.value > minDateTime
                              ? field.state.value
                              : minDateTime
                          }
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-11 rounded-xl border-border bg-background pl-10 text-sm shadow-none transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
                        />
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Reason */}
              <form.Field name="reason">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Reason{" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiTool className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          placeholder="e.g. Preventive maintenance"
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
                        Assign Area{" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiGrid className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <select
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          disabled={areaPending}
                          className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-border bg-background pl-10 pr-10 text-sm shadow-none transition-all focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-background"
                        >
                          <option value="" disabled>
                            {areaPending
                              ? "Loading areas..."
                              : "Select an area"}
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
                    <Field
                      data-invalid={isInvalid}
                      className="sm:col-span-2"
                    >
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Description{" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiActivity className="pointer-events-none absolute left-3.5 top-4 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Textarea
                          id={field.name}
                          placeholder="Describe the planned outage..."
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="min-h-28 rounded-xl border-border bg-background pl-10 pt-3.5 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
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
        <div className="relative border-t border-border bg-muted/30 px-6 py-5 sm:px-8">
          <p className="mb-3 text-xs text-muted-foreground">
            Make sure the planned outage information is accurate before
            submitting.
          </p>

          <Button
            type="submit"
            disabled={plannedOutagePending || areaPending}
            className="h-11 w-full cursor-pointer rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {plannedOutagePending && <Spinner />}
            {plannedOutagePending
              ? "Adding Planned Outage..."
              : "Add Planned Outage"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PlannedOutageForm;