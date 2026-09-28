"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import UpdateTechnicianProfileForm from "../form/update-tech-profile-form";

const UpdateTechProfileModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            className="h-10 gap-2 rounded-lg px-4 font-medium shadow-sm"
          >
            <Pencil className="size-4" />
            Update profile
          </Button>
        }
      />

      <DialogContent className="max-w-6xl gap-0 overflow-hidden rounded-2xl p-0">
        <DialogHeader className="relative border-b border-border px-6 py-5 sm:px-8 sm:py-6">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-linear-to-br from-primary/25 via-primary/10 to-transparent blur-3xl" />

          <div className="relative">
            <DialogTitle className="font-manrope text-xl font-bold tracking-tight text-foreground">
              Update Technician Profile
            </DialogTitle>

            <DialogDescription className="mt-1 text-sm leading-6 text-muted-foreground">
              Update your expertise, experience, professional bio and resume.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6">
          <UpdateTechnicianProfileForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTechProfileModal;
