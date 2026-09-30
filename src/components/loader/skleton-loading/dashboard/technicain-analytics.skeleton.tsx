/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TechnicianAnalyticsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="relative overflow-hidden rounded-lg border-border py-0"
          >
            <CardHeader className="gap-3 p-5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="size-8 rounded-lg" />
              </div>
              <Skeleton className="h-7 w-16" />
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Chart Card */}
      <Card className="relative overflow-hidden border-border">
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-72 max-w-full" />
        </CardHeader>

        <CardContent>
          <div className="mx-auto flex aspect-square max-h-72 items-center justify-center">
            <Skeleton className="size-56 rounded-full" />
          </div>

          <div className="mt-4 flex justify-center gap-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>

          <Skeleton className="mx-auto mt-4 h-3 w-40" />
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianAnalyticsSkeleton;