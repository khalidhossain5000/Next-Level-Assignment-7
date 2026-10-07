"use client";

import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCreditCard,
  FiFileText,
} from "react-icons/fi";
import { useGetPaymentRecords } from "@/hooks";
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
import { Button } from "@/components/ui/button";
import MyOutagesSkleton from "@/components/loader/skleton-loading/dashboard/my-outages.skleton";
import { IMeta, IPaymentRecord } from "@/types";
import { getPaymentsClassName } from "@/lib/utils";
import EmptyText from "@/components/layout/shared/empty-text/EmptyText";




const formatDate = (date: string | null) => {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const formatAmount = (amount: string) => {
  return `৳${Number(amount).toLocaleString("en-BD")}`;
};

const PaymentRecords = () => {
  const [page, setPage] = useState(1);

  const { data, isPending } = useGetPaymentRecords(page);

  const records: IPaymentRecord[] = data?.data?.data ?? [];
  const meta: IMeta | undefined = data?.data?.meta;

  const headClass =
    "h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground";

  if (isPending) {
    return (
      <MyOutagesSkleton/>
    );
  }

  if (records.length === 0) {
    return (
    <EmptyText title=" No Payment Records Found" description="No priority restoration payments have been made yet."/>
    );
  }
 
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Desktop */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table className="border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="border-0">
                  <TableHead className={`${headClass} pl-6`}>
                    Transaction
                  </TableHead>

                  <TableHead className={headClass}>Customer</TableHead>

                  <TableHead className={headClass}>Outage</TableHead>

                  <TableHead className={headClass}>Amount</TableHead>

                  <TableHead className={headClass}>Provider</TableHead>

                  <TableHead className={headClass}>Status</TableHead>

                  <TableHead className={`${headClass} pr-6`}>Paid At</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {records.map((payment, index) => {
                  const cellBorder =
                    index !== records.length - 1
                      ? "border-b border-border"
                      : "";

                  return (
                    <TableRow
                      key={payment.id}
                      className="group border-0 transition-colors hover:bg-muted/30"
                    >
                      {/* Transaction */}
                      <TableCell className={`pl-6 ${cellBorder}`}>
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <FiCreditCard className="size-4" />
                          </div>

                          <p className="max-w-44 truncate font-mono text-xs font-medium text-card-foreground">
                            {payment.transactionId}
                          </p>
                        </div>
                      </TableCell>

                      {/* Customer */}
                      <TableCell className={cellBorder}>
                        <div className="max-w-40">
                          <p className="truncate font-medium text-card-foreground">
                            {payment.customer?.name ?? "N/A"}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {payment.customer?.email ?? "N/A"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Outage */}
                      <TableCell className={cellBorder}>
                        <div className="flex items-center gap-1.5">
                          <FiFileText className="size-3.5 shrink-0 text-muted-foreground" />

                          <div className="max-w-36">
                            <p className="truncate text-sm text-card-foreground">
                              {payment.outage?.cause ?? "N/A"}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              #{payment.outage?.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Amount */}
                      <TableCell
                        className={`whitespace-nowrap font-semibold text-card-foreground ${cellBorder}`}
                      >
                        {formatAmount(payment.amount)}
                      </TableCell>

                      {/* Provider */}
                      <TableCell
                        className={`whitespace-nowrap text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {payment.provider}
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

                      {/* Paid At */}
                      <TableCell
                        className={`whitespace-nowrap pr-6 text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {formatDate(payment.paidAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 xl:hidden">
        {records.map((payment) => (
          <Card
            key={payment.id}
            className="rounded-2xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            <CardContent className="space-y-3 px-4 py-3.5 sm:px-5">
              {/* Transaction + Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FiCreditCard className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs font-semibold text-card-foreground">
                      {payment.transactionId}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {payment.provider}
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={`shrink-0 text-[10px] ${getPaymentsClassName(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </Badge>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between border-t border-border pt-2.5">
                <span className="text-xs text-muted-foreground">Amount</span>

                <span className="font-manrope text-lg font-bold text-primary">
                  {formatAmount(payment.amount)}
                </span>
              </div>

              {/* Customer + Outage */}
              <div className="space-y-1.5 border-t border-border pt-2.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">Customer</span>

                  <span className="truncate font-medium text-card-foreground">
                    {payment.customer?.name ?? "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">Outage</span>

                  <span className="truncate text-card-foreground">
                    {payment.outage?.cause ?? "N/A"} · #
                    {payment.outage?.id.slice(0, 8)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">Paid At</span>

                  <span className="text-right text-card-foreground">
                    {formatDate(payment.paidAt)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Page {meta.page} of {meta.totalPages} · {meta.total} total records
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8 rounded-lg"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              <FiChevronLeft className="size-4" />
            </Button>

            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  type="button"
                  variant={pageNumber === page ? "default" : "outline"}
                  size="icon"
                  className="size-8 rounded-lg text-xs font-medium"
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            )}

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8 rounded-lg"
              disabled={page >= meta.totalPages}
              onClick={() =>
                setPage((prev) => Math.min(meta.totalPages, prev + 1))
              }
            >
              <FiChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PaymentRecords;
