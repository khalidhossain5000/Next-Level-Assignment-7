"use client";

import { FiFileText, FiShield, FiZap } from "react-icons/fi";

import { useMakePayment } from "@/hooks";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PRIORITY_FEE = 1299;

const MakePayment = ({ outageReportId }: { outageReportId: string }) => {
  const { mutate: makePayment, isPending } = useMakePayment();

  const handlePay = () => {
   const res= makePayment(outageReportId);
   console.log(res,'res payment')
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="overflow-hidden rounded-2xl border-border shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-primary/10 to-transparent px-6 pb-6 pt-8">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiZap className="size-7" />
          </div>

          <div className="text-center">
            <h3 className="font-manrope text-lg font-bold text-card-foreground">
              Priority Restoration Fee
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              One-time payment to prioritize your outage report
            </p>
          </div>
        </div>

        <CardContent className="space-y-5 px-6 pb-6">
          {/* Report Info */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FiFileText className="size-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Outage Report ID</p>
                <p className="font-mono text-sm font-semibold text-card-foreground">
                  #{outageReportId.slice(0, 8)}
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
            >
              Priority
            </Badge>
          </div>

          {/* Billing Breakdown */}
          <div className="space-y-2.5 rounded-xl border border-border px-4 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-card-foreground">
                ৳{PRIORITY_FEE.toLocaleString("en-BD")}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Service Fee</span>
              <span className="font-medium text-card-foreground">৳0</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-manrope text-sm font-semibold text-card-foreground">
                Total
              </span>
              <span className="font-manrope text-xl font-bold text-primary">
                ৳{PRIORITY_FEE.toLocaleString("en-BD")}
              </span>
            </div>
          </div>

          {/* Trust note */}
          <div className="flex items-start gap-2 rounded-xl bg-muted/40 px-3.5 py-3 text-xs text-muted-foreground">
            <FiShield className="mt-0.5 size-3.5 shrink-0" />
            <p>
              This is a one-time, secure payment. Your restoration request
              will move up the queue immediately after confirmation.
            </p>
          </div>

          {/* Pay Button */}
          <Button
            type="button"
            disabled={isPending}
            onClick={handlePay}
            className="h-11 w-full gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer"
          >
            <FiZap className="size-4" />
            {isPending
              ? "Processing..."
              : `Pay ৳${PRIORITY_FEE.toLocaleString("en-BD")} Now`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MakePayment;