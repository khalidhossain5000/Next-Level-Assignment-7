"use client";

import Link from "next/link";
import { FiAlertCircle, FiZap } from "react-icons/fi";

import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface PriorityInfoModalProps {
  outageId: string;
}

const PriorityInfoModal = ({ outageId }: PriorityInfoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            size="sm"
            className="h-9 gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer"
            title="Pay for Priority Restoration"
          >
            <FiZap className="size-3.5" />
            Priority Restore
          </Button>
        }
      />

      <DialogContent className="max-w-sm gap-0 overflow-hidden rounded-2xl p-0">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-primary/10 to-transparent px-6 pb-5 pt-7">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiZap className="size-6" />
          </div>

          <DialogHeader className="items-center text-center">
            <DialogTitle className="font-manrope text-lg font-bold text-card-foreground">
              Priority Restoration
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Get faster response for this outage with a one-time priority
              fee.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          {/* Price Card */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3.5">
            <div>
              <p className="text-xs text-muted-foreground">One-time fee</p>
              <p className="font-manrope text-2xl font-bold text-card-foreground flex items-center gap-.5">
                <FaBangladeshiTakaSign/>1299
              </p>
            </div>

            <Badge
              variant="outline"
              className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
            >
              Priority
            </Badge>
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 rounded-xl bg-muted/40 px-3.5 py-3 text-xs text-muted-foreground">
            <FiAlertCircle className="mt-0.5 size-3.5 shrink-0" />
            <p>
              This payment is charged only once per outage and moves your
              request higher in the restoration queue.
            </p>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2 border-t border-border px-6 py-4 sm:gap-2">
          <DialogClose
            render={
              <Button type="button" variant="outline" className="flex-1 rounded-lg">
                Cancel
              </Button>
            }
          />

          <Button
            type="button"
            nativeButton={false}
            className="flex-1 gap-1.5 rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            render={
              <Link href={`/payment?outageId=${outageId}&type=priority`} />
            }
          >
            <FiZap className="size-3.5" />
            Pay Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PriorityInfoModal;