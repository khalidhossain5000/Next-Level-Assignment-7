"use client";

import { FiCreditCard } from "react-icons/fi";

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
import PaymentHistorySkeleton from "@/components/loader/skleton-loading/dashboard/payment-history.skeleton";
import type { IPaymentRecord } from "@/types";
import { getPaymentsClassName } from "@/lib/utils";
import EmptyText from "@/components/layout/shared/empty-text/EmptyText";



const PaymentHistory = () => {
  const { data, isPending } = useGetPayments();

  const payments: IPaymentRecord[] = data?.data ?? [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const formatAmount = (amount: string) => {
    return `৳${Number(amount).toLocaleString("en-BD")}`;
  };

  const formatProvider = (provider: string) => {
    return provider.replaceAll("_", " ");
  };

 
  if (isPending) return <PaymentHistorySkeleton/>

  if (payments.length === 0) {
    return (
      <EmptyText title="No Payments Found" description="You have not made any payments yet."/>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table className="border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="font-inter hover:bg-transparent">
                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 pl-6 font-semibold text-foreground">
                    Transaction
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground">
                    Related Outage
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground">
                    Provider
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground">
                    Amount
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground">
                    Status
                  </TableHead>

                  <TableHead className="h-12 whitespace-nowrap border-b border-border bg-muted/40 pr-6 text-right font-semibold text-foreground">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payments.map((payment, index) => {
                  const cellBorder =
                    index !== payments.length - 1
                      ? "border-b border-border"
                      : "";

                  return (
                    <TableRow
                      key={payment.id}
                      className="group border-0 transition-colors hover:bg-muted/30"
                    >
                      {/* Transaction */}
                      <TableCell className={`pl-6 ${cellBorder}`}>
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
                      <TableCell className={cellBorder}>
                        <p className="max-w-44 truncate font-medium text-card-foreground">
                          {payment.outage?.cause ?? "N/A"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {payment.outage?.priority ?? "N/A"} priority
                        </p>
                      </TableCell>

                      {/* Provider */}
                      <TableCell
                        className={`whitespace-nowrap text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {formatProvider(payment.provider)}
                      </TableCell>

                      {/* Amount */}
                      <TableCell
                        className={`whitespace-nowrap font-semibold text-card-foreground ${cellBorder}`}
                      >
                        {formatAmount(payment.amount)}
                      </TableCell>

                      {/* Status */}
                      <TableCell className={cellBorder}>
                        <Badge
                          variant="outline"
                          className={getPaymentsClassName(payment.status)}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>

                      {/* Date */}
                      <TableCell
                        className={`whitespace-nowrap pr-6 text-right text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {formatDate(payment.paidAt ?? payment.createdAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
            {/* Tablet layout (sm and up, below xl) */}
            <CardContent className="hidden px-4 py-3 sm:block sm:px-5 sm:py-3.5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Transaction + Outage */}
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                      {payment.transactionId}
                    </p>

                    <span className="hidden shrink-0 text-xs text-muted-foreground md:inline">
                      #{payment.id.slice(0, 8)}
                    </span>

                    <Badge
                      variant="outline"
                      className={`shrink-0 text-[10px] font-semibold ${getPaymentsClassName(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </Badge>
                  </div>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {payment.outage?.cause ?? "N/A"}
                    <span className="hidden md:inline">
                      {" "}
                      &middot; {formatProvider(payment.provider)}
                    </span>
                  </p>
                </div>

                {/* Date */}
                <div className="hidden shrink-0 lg:block">
                  <p className="text-[11px] text-muted-foreground">Paid</p>

                  <p className="text-xs font-medium text-card-foreground">
                    {formatDate(payment.paidAt ?? payment.createdAt)}
                  </p>
                </div>

                {/* Amount */}
                <div className="shrink-0 text-right">
                  <p className="text-[11px] text-muted-foreground">Amount</p>

                  <p className="text-base font-semibold text-card-foreground">
                    {formatAmount(payment.amount)}
                  </p>
                </div>
              </div>
            </CardContent>

            {/* Mobile layout (below sm) */}
            <CardContent className="px-4 py-3 sm:hidden">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-card-foreground">
                      {payment.transactionId}
                    </p>

                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      #{payment.id.slice(0, 8)}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {payment.outage?.cause ?? "N/A"}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={`shrink-0 whitespace-nowrap text-[10px] font-semibold ${getPaymentsClassName(
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