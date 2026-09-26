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
import { Spinner } from "@/components/ui/spinner";

interface IPaymentCustomer {
  id: string;
  name: string;
  email: string;
}

interface IPaymentOutage {
  id: string;
  cause: string;
  priority: "NORMAL" | "HIGH";
  status: string;
}

interface IPaymentRecord {
  id: string;
  amount: string;
  provider: string;
  transactionId: string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED";
  paidAt: string | null;
  createdAt: string;
  customer: IPaymentCustomer;
  outage: IPaymentOutage;
}

interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const getStatusClassName = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";
    case "FAILED":
    case "CANCELLED":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

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

  if (isPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="mx-auto flex min-h-72 w-full max-w-6xl items-center justify-center rounded-2xl border border-border bg-card px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiCreditCard className="size-5" />
          </div>
          <h3 className="font-manrope text-base font-semibold text-card-foreground">
            No Payment Records Found
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No priority restoration payments have been made yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-card-foreground">
            Payment Records
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            All priority restoration payments and transaction history.
          </p>
        </div>

        <Badge
          variant="outline"
          className="w-fit rounded-full px-3 py-1 text-xs font-medium"
        >
          {meta?.total ?? records.length}{" "}
          {(meta?.total ?? records.length) === 1 ? "Payment" : "Payments"}
        </Badge>
      </div>

      {/* =====================================================
          XL AND ABOVE → TABLE VIEW
      ====================================================== */}
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
                    Customer
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Outage
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Amount
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Provider
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Status
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap pr-6">
                    Paid At
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {records.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* Transaction */}
                    <TableCell className="pl-6">
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
                    <TableCell>
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
                    <TableCell>
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
                    <TableCell className="whitespace-nowrap font-semibold text-card-foreground">
                      {formatAmount(payment.amount)}
                    </TableCell>

                    {/* Provider */}
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {payment.provider}
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

                    {/* Paid At */}
                    <TableCell className="whitespace-nowrap pr-6 text-sm text-muted-foreground">
                      {formatDate(payment.paidAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* =====================================================
          BELOW XL → CARD VIEW
      ====================================================== */}
      <div className="space-y-3 xl:hidden">
        {records.map((payment) => (
          <Card
            key={payment.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            <CardContent className="space-y-3 px-4 py-3.5 sm:px-5">
              {/* Top: Transaction + Status */}
              <div className="flex items-start justify-between gap-2">
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
                  className={`shrink-0 text-[10px] ${getStatusClassName(
                    payment.status,
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
                  <span className="text-card-foreground">
                    {formatDate(payment.paidAt)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* =====================================================
          PAGINATION
      ====================================================== */}
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
              ),
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