"use client";

import { FiEdit3 } from "react-icons/fi";
import { useGetArea } from "@/hooks";
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
  id?: string;
  title?: string;
  currentAreaId?: string;
  currentAreaName?: string;
}

const UpdateLoadSheddingModal = ({ id, title, currentAreaId }: IProps) => {
  const { data, isPending: areaPending } = useGetArea();

  const areas = data?.data ?? [];

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            size="sm"
            className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          />
        }
      >
        <FiEdit3 className="size-4" />
        Update
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-manrope">
            Update Load Shedding
          </DialogTitle>

          <DialogDescription>
            Update the load shedding schedule details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
          <div className="text-center">
            <p className="font-manrope text-sm font-semibold text-card-foreground">
              Coming Soon
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Load shedding update form will be available here.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLoadSheddingModal;
