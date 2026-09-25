"use client";

import { FiCreditCard, FiZap } from "react-icons/fi";

import { useGetPayments } from "@/hooks";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

interface IPayment {
  id: string;
  amount: string;
  provider: string;
  transactionId: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  paidAt: string | null;
  createdAt: string;
  outage: {
    id: string;
    cause: string;
    priority: string;
  };
}

const PaymentHistory = () => {
  const { data, isPending } = useGetPayments();

  const payments: IPayment[] = data?.data ?? [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const formatAmount = (amount: string) => {
    return `৳${Number(amount).toLocaleString("en-BD")}`;
  };

  const getStatusClassName = (status: string) => {
    switch (status) {
      case "PENDING":
        return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";

      case "COMPLETED":
        return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";

      case "FAILED":
        return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";

      case "REFUNDED":
        return "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300";

      default:
        return "border-border bg-muted text-muted-foreground";
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="mx-auto flex min-h-72 w-full max-w-6xl items-center justify-center rounded-2xl border border-border bg-card px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiCreditCard className="size-5" />
          </div>

          <h3 className="font-manrope text-base font-semibold text-card-foreground">
            No Payments Found
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            You have not made any payments yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="h-12 whitespace-nowrap pl-6">
                    Transaction
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap">
                    Related Outage
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap">
                    Provider
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap">
                    Amount
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap">
                    Status
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap pr-6">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Transaction */}
                    <TableCell className="pl-6">
                      <div className="max-w-52">
                        <p className="truncate font-semibold text-card-foreground">
                          {payment.transactionId}
                        </p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          #{payment.id.slice(0, 8)}
                        </p>
                      </div>
                    </TableCell>

                    {/* Related Outage */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FiZap className="size-4" />
                        </div>

                        <p className="max-w-44 truncate font-medium text-card-foreground">
                          {payment.outage?.cause ?? "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Provider */}
                    <TableCell className="text-sm text-muted-foreground">
                      {payment.provider.replace("_", " ")}
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="font-semibold text-card-foreground">
                      {formatAmount(payment.amount)}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusClassName(payment.status)}
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="whitespace-nowrap pr-6 text-sm text-muted-foreground">
                      {formatDate(payment.paidAt ?? payment.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="space-y-3 xl:hidden">
        {payments.map((payment) => (
          <Card
            key={payment.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            <CardContent className="px-4 py-3.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-card-foreground">
                      {payment.transactionId}
                    </p>
                  </div>

                  <div className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <FiZap className="size-3.5 shrink-0" />

                    <span className="truncate">
                      {payment.outage?.cause ?? "N/A"}
                    </span>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={`shrink-0 whitespace-nowrap text-[10px] font-semibold ${getStatusClassName(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2.5">
                <span className="text-sm font-semibold text-card-foreground">
                  {formatAmount(payment.amount)}
                </span>

                <span className="text-[11px] text-muted-foreground">
                  {formatDate(payment.paidAt ?? payment.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
