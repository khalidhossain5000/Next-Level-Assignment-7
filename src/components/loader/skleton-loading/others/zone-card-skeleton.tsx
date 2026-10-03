/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ZoneSkeleton = () => {
  return (
    <section className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
      {/* sidebar skeleton */}
      <div className="w-full rounded-2xl border border-border bg-card p-5 lg:w-72 lg:shrink-0">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>

      {/* cards skeleton */}
      <div className="min-w-0 flex-1">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="gap-0 overflow-hidden py-0">
              <Skeleton className="aspect-video w-full rounded-none" />

              <CardHeader className="gap-2 px-4 pb-0 pt-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </CardHeader>

              <CardContent className="px-4 pb-0 pt-3">
                <Skeleton className="h-10 w-full rounded-lg" />
              </CardContent>

              <CardFooter className="p-4">
                <Skeleton className="h-9 w-full rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZoneSkeleton;
