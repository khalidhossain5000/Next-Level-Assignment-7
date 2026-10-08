"use client";

import { useState } from "react";
import { FiAlertTriangle, FiTrash2 } from "react-icons/fi";

import { useDeleteMyOutage } from "@/hooks";

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

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { toast } from "sonner";

interface DeleteMyOutageConfirmModalProps {
  outageId: string;
}

const DeleteMyOutageConfirmModal = ({
  outageId,
}: DeleteMyOutageConfirmModalProps) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteOutage, isPending } = useDeleteMyOutage();

  const handleDelete = () => {
    deleteOutage(outageId, {
      onSuccess: (res) => {
        setOpen(false);
   
        toast.success(res.message || "Outage Deleted Successfully");
      },

      onError: (err) => {
        const message =
          (err as any)?.data?.message ||
          err.message ||
          "Failed when deleting outage";

        toast.error(message || "Something went wrong when deleting outage");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 cursor-pointer rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
            title="Delete outage"
            aria-label="Delete outage"
          >
            <FiTrash2 className="size-4" />
          </Button>
        }
      />

      <DialogContent className="mx-2 md:mx-0 max-w-sm gap-0 overflow-hidden rounded-2xl p-0">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 bg-linear-to-b from-destructive/10 to-transparent px-6 pb-5 pt-7">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <FiAlertTriangle className="size-6" />
          </div>

          <DialogHeader className="items-center text-center">
            <DialogTitle className="font-manrope text-lg font-bold text-card-foreground">
              Delete Outage Report?
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              This action cannot be undone. The outage report will be
              permanently removed.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2 border-t border-border px-6 py-4 sm:gap-2">
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                className="flex-1 cursor-pointer rounded-lg py-2"
              >
                Cancel
              </Button>
            }
          />

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 cursor-pointer gap-1.5 rounded-lg font-semibold py-2"
          >
            {isPending ? <Spinner /> : <FiTrash2 className="size-3.5" />}
            {isPending ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMyOutageConfirmModal;