"use client";

import { FiEdit3 } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-manrope text-lg font-bold">
            Update Planned Outage
          </DialogTitle>

          <DialogDescription>
            Planned outage update form will be added here soon.
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">Form coming soon...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlannedOutageModal;
