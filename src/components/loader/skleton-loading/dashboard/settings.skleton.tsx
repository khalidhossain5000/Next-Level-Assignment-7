/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsSkeleton = () => {
  return (
    <section className="relative">
      {/* gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 size-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -right-32 top-1/3 size-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        {/* left side profile */}
        <Card className="relative h-fit self-start overflow-hidden border-border/60 bg-card/70 shadow-sm backdrop-blur-xl lg:col-span-1">
          <CardContent className="relative space-y-5 pt-8 pb-6">
            <div className="flex flex-col items-center gap-4 text-center">
              {/* avatar */}
              <Skeleton className="size-28 rounded-full" />

              {/* role, status, verified badges */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Skeleton className="h-5 w-16 rounded-sm" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>

              {/* member since, last updated */}
              <div className="grid w-full gap-3 sm:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3"
                  >
                    <Skeleton className="size-9 shrink-0 rounded-md" />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* right side info */}
        <Card className="relative overflow-hidden border-border/60 bg-card/70 shadow-sm backdrop-blur-xl lg:col-span-2">
          <div className="relative flex flex-col gap-6">
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </CardHeader>

            <CardContent className="space-y-6">
              {/* full name, email */}
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-11 w-full rounded-lg" />
                  </div>
                ))}
              </div>

              <Separator />

              {/* account details */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3"
                    >
                      <Skeleton className="size-9 shrink-0 rounded-md" />
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="justify-end border-t border-border/60 pt-6">
              <Skeleton className="h-9 w-full sm:w-32" />
            </CardFooter>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SettingsSkeleton;
