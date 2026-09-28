import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ROW_COUNT = 5;

const TABLE_HEADERS = [
  { label: "Transaction", className: "pl-6" },
  { label: "Related Outage", className: "" },
  { label: "Provider", className: "" },
  { label: "Amount", className: "" },
  { label: "Status", className: "" },
  { label: "Date", className: "pr-6 text-right" },
] as const;

const rows = Array.from({ length: ROW_COUNT }, (_, i) => `row-${i}`);

const PaymentHistorySkeleton = () => {
  return (
    <div
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-busy="true"
      aria-live="polite"
    >
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table className="border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {TABLE_HEADERS.map((header) => (
                    <TableHead
                      key={header.label}
                      className={`h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground ${header.className}`}
                    >
                      {header.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((rowKey, index) => {
                  const cellBorder =
                    index !== rows.length - 1 ? "border-b border-border" : "";

                  return (
                    <TableRow
                      key={rowKey}
                      className="border-0 hover:bg-transparent"
                    >
                      {/* Transaction */}
                      <TableCell className={`pl-6 ${cellBorder}`}>
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="mt-2 h-3 w-16" />
                      </TableCell>

                      {/* Related Outage */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="mt-2 h-3 w-24" />
                      </TableCell>

                      {/* Provider */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>

                      {/* Amount */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>

                      {/* Status */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </TableCell>

                      {/* Date */}
                      <TableCell className={`pr-6 ${cellBorder}`}>
                        <div className="flex justify-end">
                          <Skeleton className="h-4 w-32" />
                        </div>
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
        {rows.map((rowKey) => (
          <Card
            key={rowKey}
            className="rounded-xl border-border bg-card shadow-sm"
          >
            {/* Tablet layout (sm and up, below xl) */}
            <CardContent className="hidden px-4 py-3 sm:block sm:px-5 sm:py-3.5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Transaction + Outage */}
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="hidden h-3 w-14 md:block" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>

                  <Skeleton className="mt-2 h-3 w-32" />
                </div>

                {/* Date */}
                <div className="hidden shrink-0 lg:block">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="mt-1.5 h-3.5 w-28" />
                </div>

                {/* Amount */}
                <div className="flex shrink-0 flex-col items-end">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="mt-1.5 h-5 w-16" />
                </div>
              </div>
            </CardContent>

            {/* Mobile layout (below sm) */}
            <CardContent className="px-4 py-3 sm:hidden">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-12" />
                  </div>

                  <Skeleton className="mt-2 h-3 w-24" />
                </div>

                <Skeleton className="h-5 w-20 rounded-full" />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2.5">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistorySkeleton;