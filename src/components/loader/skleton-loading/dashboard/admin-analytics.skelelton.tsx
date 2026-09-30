import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AdminAnalyticsSkeleton = () => {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => `stat-${i}`).map((key) => (
          <Card key={key} className="rounded-lg border-border py-0">
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

      {/* Donut Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {["outage", "user"].map((key) => (
          <Card key={key} className="border-border">
            <CardHeader className="gap-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-3 w-64 max-w-full" />
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bar Chart */}
      <Card className="border-border">
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-72 max-w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-72 w-full rounded-lg" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalyticsSkeleton;