"use client";

import {
  FiHash,
  FiZap,
  FiActivity,
  FiGrid,
  FiChevronDown,
} from "react-icons/fi";

import { useGetSubstation, useAddFeeder } from "@/hooks";

import { useForm } from "@tanstack/react-form";

import { Field, FieldError, FieldGroup } from "../ui/field";

import { Input } from "../ui/input";

import { Label } from "../ui/label";

import { Spinner } from "../ui/spinner";

import { Button } from "../ui/button";

import { addFeederSchema } from "@/validation";

import { toast } from "sonner";

const AddFeederForm = () => {
  // Need this because we want substation id
  const { data: substationData, isPending: substationPending } =
    useGetSubstation();

  const { mutate: addFeeder, isPending: feederPending } = useAddFeeder();

  const substations = substationData?.data ?? [];

  const form = useForm({
    defaultValues: {
      name: "Mymensingh Industrial Feeder",
      code: "FD-RNG-004",
      voltageLevel: "190 kV",
      substationId: "",
    },

    validators: {
      onSubmit: addFeederSchema,
    },

    onSubmit: async ({ value }) => {
      console.log(value, "feeder value");

      const feederData = {
        name: value.name,
        code: value.code,
        voltageLevel: value.voltageLevel,
        substationId: value.substationId,
      };

      addFeeder(feederData, {
        onSuccess: (res) => {
          console.log(res, "Feeder Added Successfully");

          form.reset();

          toast.success(res.message || "Feeder Added Successfully");
        },

        onError: (err) => {
          const message =
            (err as any)?.data?.message ||
            err.message ||
            "Failed when creating new feeder";

          console.log(err, "this is feeder error");

          toast.error(message || "Something went wrong when adding feeder");
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
            Add New Feeder
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Create a new distribution feeder and assign it to a substation.
          </p>
        </div>

        {/* Form Body */}
        <div className="relative p-6 sm:p-8">
          <FieldGroup>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Feeder Name */}
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
                        Feeder Name <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiZap className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          placeholder="e.g. Mymensingh Industrial Feeder"
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

              {/* Feeder Code */}
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
                        Feeder Code <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiHash className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          placeholder="e.g. FD-RNG-004"
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

              {/* Voltage Level */}
              <form.Field name="voltageLevel">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Voltage Level{" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiActivity className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          placeholder="e.g. 33 kV"
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

              {/* Substation Select */}
              <form.Field name="substationId">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Assign Substation{" "}
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
                          disabled={substationPending}
                          className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-border bg-background pl-10 pr-10 text-sm shadow-none transition-all focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-background"
                        >
                          <option value="" disabled>
                            {substationPending
                              ? "Loading substations..."
                              : "Select a substation"}
                          </option>

                          {substations.map((substation: any) => (
                            <option key={substation.id} value={substation.id}>
                              {substation.name} ({substation.code})
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
            </div>
          </FieldGroup>
        </div>

        {/* Footer */}
        <div className="relative border-t border-border bg-muted/30 px-6 py-5 sm:px-8">
          <p className="mb-3 text-xs text-muted-foreground">
            Make sure the feeder information is accurate before submitting.
          </p>

          <Button
            type="submit"
            disabled={feederPending || substationPending}
            className="h-11 w-full cursor-pointer rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {feederPending && <Spinner />}
            {feederPending ? "Adding Feeder..." : "Add Feeder"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddFeederForm;
