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
  { label: "Cause", className: "pl-6" },
  { label: "Area", className: "" },
  { label: "Priority", className: "" },
  { label: "Status", className: "" },
  { label: "Reported At", className: "" },
  { label: "Actions", className: "pr-6 text-right" },
] as const;

const rows = Array.from({ length: ROW_COUNT }, (_, i) => `row-${i}`);

const MyOutagesSkleton = () => {
  return (
    <div
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-busy="true"
      aria-live="polite"
    >

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
                    <TableRow key={rowKey} className="border-0 hover:bg-transparent">
                      {/* Cause */}
                      <TableCell className={`pl-6 ${cellBorder}`}>
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="mt-2 h-3 w-16" />
                      </TableCell>

                      {/* Area */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-2 h-3 w-14" />
                      </TableCell>

                      {/* Priority */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </TableCell>

                      {/* Status */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </TableCell>

                      {/* Reported At */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>

                      {/* Actions */}
                      <TableCell className={`pr-6 ${cellBorder}`}>
                        <div className="flex items-center justify-end gap-1.5">
                          <Skeleton className="h-9 w-28 rounded-lg" />
                          <Skeleton className="size-9 rounded-lg" />
                          <Skeleton className="size-9 rounded-lg" />
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

    
      <div className="space-y-3 xl:hidden">
        {rows.map((rowKey) => (
          <Card
            key={rowKey}
            className="rounded-xl border-border bg-card shadow-sm"
          >
          
            <CardContent className="hidden px-4 py-3 sm:block sm:px-5 sm:py-3.5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Cause + Area */}
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="hidden h-3 w-14 md:block" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>

                  <Skeleton className="mt-2 h-3 w-32" />
                </div>

                {/* Priority */}
                <Skeleton className="hidden h-6 w-16 rounded-full md:block" />

                {/* Reported */}
                <div className="hidden shrink-0 lg:block">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="mt-1.5 h-3.5 w-28" />
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  <Skeleton className="h-9 w-28 rounded-lg" />
                  <Skeleton className="size-9 rounded-lg" />
                  <Skeleton className="size-9 rounded-lg" />
                </div>
              </div>
            </CardContent>


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
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Skeleton className="size-8 rounded-lg" />
                  <Skeleton className="size-8 rounded-lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOutagesSkleton;