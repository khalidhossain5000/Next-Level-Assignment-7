/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Profile header */}
      <div className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:p-8">
        <Skeleton className="size-28 shrink-0 rounded-full" />

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-56" />

          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Read-only info */}
      <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-36" />
          </div>
        ))}
      </div>

      <Separator />

      {/* Name field */}
      <div className="space-y-2 p-6 sm:p-8">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      {/* Footer */}
      <div className="flex justify-end border-t border-border bg-muted/30 px-6 py-4 sm:px-8">
        <Skeleton className="h-11 w-40 rounded-xl" />
      </div>
    </div>
  );
};

export default SettingsSkeleton;