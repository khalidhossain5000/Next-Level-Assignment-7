/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const headClass = "h-12 border-b border-border bg-muted/40";

const AssignedOutagesSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table className="border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className={`${headClass} pl-6`}>
                    <Skeleton className="h-4 w-12" />
                  </TableHead>
                  <TableHead className={headClass}>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead className={headClass}>
                    <Skeleton className="h-4 w-10" />
                  </TableHead>
                  <TableHead className={headClass}>
                    <Skeleton className="h-4 w-14" />
                  </TableHead>
                  <TableHead className={headClass}>
                    <Skeleton className="h-4 w-12" />
                  </TableHead>
                  <TableHead className={headClass}>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead className={`${headClass} pr-6`}>
                    <Skeleton className="ml-auto h-4 w-14" />
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => {
                  const cellBorder = index !== 4 ? "border-b border-border" : "";

                  return (
                    <TableRow key={index} className="border-0">
                      {/* Cause */}
                      <TableCell className={`pl-6 ${cellBorder}`}>
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="mt-2 h-3 w-16" />
                      </TableCell>

                      {/* Customer */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-2 h-3 w-36" />
                      </TableCell>

                      {/* Area */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="mt-2 h-3 w-12" />
                      </TableCell>

                      {/* Priority */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </TableCell>

                      {/* Status */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </TableCell>

                      {/* Reported At */}
                      <TableCell className={cellBorder}>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>

                      {/* Actions */}
                      <TableCell className={`pr-6 ${cellBorder}`}>
                        <div className="flex justify-end">
                          <Skeleton className="h-8 w-35 rounded-lg" />
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

      {/* Mobile */}
      <div className="space-y-3 xl:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="rounded-xl border-border bg-card shadow-sm"
          >
            {/* sm and up */}
            <CardContent className="hidden px-4 py-3 sm:block sm:px-5 sm:py-3.5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="hidden h-3 w-14 md:block" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-56 max-w-full" />
                </div>

                <Skeleton className="hidden h-5 w-16 rounded-full md:block" />

                <div className="hidden space-y-1.5 lg:block">
                  <Skeleton className="h-2.5 w-12" />
                  <Skeleton className="h-3 w-28" />
                </div>

                <Skeleton className="h-8 w-35 rounded-lg" />
              </div>
            </CardContent>

            {/* below sm */}
            <CardContent className="px-4 py-3 sm:hidden">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-2.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-35 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignedOutagesSkeleton;