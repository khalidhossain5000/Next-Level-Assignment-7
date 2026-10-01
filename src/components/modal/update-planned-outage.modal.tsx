"use client";

import {
  FiActivity,
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiEdit3,
  FiFileText,
  FiGrid,
  FiTool,
} from "react-icons/fi";

import { useGetArea } from "@/hooks";

import { useForm } from "@tanstack/react-form";

import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface IProps {
  id: string;
  title: string;
  description: string;
  reason: string;
}

const UpdatePlannedOutageModal = ({
  id,
  title,
  description,
  reason,
}: IProps) => {
  const { data, isPending: areaPending } = useGetArea();

  const areas = data?.data ?? [];

  const form = useForm({
    defaultValues: {
      title,
      reason,
      description,
      startTime: "",
      endTime: "",
      areaId: "",
    },

    onSubmit: async ({ value }) => {
      console.log(value, "update planned outage value");

      // Update function will be added here later.
    },
  });

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            size="sm"
            className="h-9 cursor-pointer gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            title="Update Planned Outage"
          >
            <FiEdit3 className="size-3.5" />
            Update
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto gap-0 rounded-2xl p-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="w-full"
        >
          {/* Header */}
          <div className="relative overflow-hidden border-b border-border px-6 py-6 sm:px-8">
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent blur-3xl" />

            <div className="relative">
              <DialogHeader>
                <DialogTitle className="font-manrope text-xl font-bold tracking-tight text-card-foreground">
                  Update Planned Outage
                </DialogTitle>

                <DialogDescription className="mt-1 text-sm leading-6 text-muted-foreground">
                  Update the planned power interruption information for this
                  area.
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          {/* Form Body */}
          <div className="relative p-6 sm:p-8">
            <FieldGroup>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Title */}
                <form.Field name="title">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} className="sm:col-span-2">
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
                          Start Time <span className="text-destructive">*</span>
                        </Label>

                        <div className="group relative">
                          <FiClock className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                          <Input
                            id={field.name}
                            type="datetime-local"
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
                          End Time <span className="text-destructive">*</span>
                        </Label>

                        <div className="group relative">
                          <FiCalendar className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                          <Input
                            id={field.name}
                            type="datetime-local"
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
                          Reason <span className="text-destructive">*</span>
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

                {/* Description */}
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
              updating.
            </p>

            <Button
              type="submit"
              disabled={areaPending}
              className="h-11 w-full cursor-pointer rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Update Planned Outage
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlannedOutageModal;
