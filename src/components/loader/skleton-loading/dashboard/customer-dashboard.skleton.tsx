/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const STAT_CARD_COUNT = 4;
const LEGEND_ITEM_COUNT = 3;

const CustomerDashboardHomeSkletonLoading = () => {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: STAT_CARD_COUNT }, (_, i) => (
          <Card
            key={`stat-skeleton-${i}`}
            className="relative overflow-hidden rounded-lg border-border py-0"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-linear-to-br from-primary/25 via-primary/10 to-transparent blur-2xl" />

            <CardHeader className="relative gap-3 p-5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="size-8 rounded-lg" />
              </div>

              <Skeleton className="h-8 w-20" />
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Chart Card */}
      <Card className="relative overflow-hidden border-border">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-linear-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />

        <CardHeader className="relative gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3.5 w-72 max-w-full" />
        </CardHeader>

        <CardContent className="relative">
          <div className="flex items-center justify-center py-6">
            <div className="relative">
              <Skeleton className="size-52 rounded-full" />

              {/* Donut hole */}
              <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card" />
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Array.from({ length: LEGEND_ITEM_COUNT }, (_, i) => (
              <div
                key={`legend-skeleton-${i}`}
                className="flex items-center gap-2"
              >
                <Skeleton className="size-2.5 rounded-sm" />
                <Skeleton className="h-3.5 w-16" />
              </div>
            ))}
          </div>

          {/* Total text */}
          <div className="mt-4 flex justify-center">
            <Skeleton className="h-3.5 w-40" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboardHomeSkletonLoading;