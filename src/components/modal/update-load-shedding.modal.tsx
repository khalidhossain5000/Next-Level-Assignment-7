"use client";

import { FiEdit3, FiFileText, FiGrid, FiChevronDown } from "react-icons/fi";
import { useForm } from "@tanstack/react-form";
import { useGetArea } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IProps {
  id?: string;
  title?: string;
  currentAreaId?: string;
  currentAreaName?: string;
}

const UpdateLoadSheddingModal = ({ id, title, currentAreaId }: IProps) => {
  const { data, isPending: areaPending } = useGetArea();

  const areas = data?.data ?? [];

  const form = useForm({
    defaultValues: {
      title: title ?? "",
      areaId: currentAreaId ?? "",
    },

    onSubmit: async ({ value }) => {
      console.log(
        {
          id,
          title: value.title,
          areaId: value.areaId,
        },
        "update load shedding value"
      );
    },
  });

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            size="sm"
            className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
          />
        }
      >
        <FiEdit3 className="size-4" />
        Update
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-manrope text-lg font-bold">
            Update Load Shedding
          </DialogTitle>

          <DialogDescription>
            Update the load shedding title and assigned area.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-2"
        >
          <FieldGroup>
            <div className="space-y-5">
              {/* Title */}
              <form.Field name="title">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <Label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-card-foreground"
                      >
                        Schedule Title{" "}
                        <span className="text-destructive">*</span>
                      </Label>

                      <div className="group relative">
                        <FiFileText className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="e.g. Sylhet Sadar Scheduled Load Shedding"
                          autoComplete="off"
                          className="h-11 rounded-xl border-border bg-background pl-10 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 dark:bg-background"
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
                        Assign Area <span className="text-destructive">*</span>
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
            </div>
          </FieldGroup>

          {/* Footer */}
          <div className="mt-6 border-t border-border bg-muted/30 -mx-6 -mb-6 px-6 py-5 sm:-mx-6">
            <p className="mb-3 text-xs text-muted-foreground">
              Update the schedule information carefully before saving.
            </p>

            <Button
              type="submit"
              disabled={areaPending}
              className="h-11 w-full cursor-pointer rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {areaPending && <Spinner />}
              {areaPending ? "Loading Areas..." : "Update Load Shedding"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLoadSheddingModal;
