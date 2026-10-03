import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const placeholders = ["first", "second", "third"];

const ZoneDetailsSkeleton = () => (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 lg:px-8">
        <Skeleton className="mb-5 h-5 w-24 rounded" />
        <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 lg:grid-cols-[1.15fr_0.85fr]">
            <Skeleton className="aspect-[4/3] min-h-64 w-full rounded-none sm:aspect-[16/10] lg:aspect-auto lg:min-h-[410px]" />
            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                <Skeleton className="h-7 w-32 rounded-full" />
                <Skeleton className="mt-5 h-10 w-2/3 max-w-sm" />
                <Skeleton className="mt-3 h-4 w-full max-w-md" />
                <Skeleton className="mt-2 h-4 w-3/4 max-w-sm" />
                <div className="mt-7 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                    {placeholders.slice(0, 2).map((placeholder) => (
                        <div key={placeholder} className="flex items-center gap-3">
                            <Skeleton className="size-9 rounded-lg" />
                            <div className="space-y-2"><Skeleton className="h-3 w-16" /><Skeleton className="h-4 w-28" /></div>
                        </div>
                    ))}
                </div>
                <Skeleton className="mt-5 h-8 w-full border-t border-border pt-4" />
            </div>
        </div>

        <div className="mt-10 flex items-end justify-between border-b border-border pb-4">
            <div className="space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-8 w-40" /></div>
            <Skeleton className="hidden h-4 w-36 sm:block" />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {placeholders.map((placeholder) => (
                <Card key={placeholder} className="rounded-lg">
                    <CardContent className="p-5">
                        <div className="flex items-start gap-3"><Skeleton className="size-10 shrink-0 rounded-lg" /><div className="space-y-2"><Skeleton className="h-4 w-40" /><Skeleton className="h-3 w-24" /></div></div>
                        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4"><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3"><Skeleton className="h-8" /><Skeleton className="h-8" /></div>
                        <Skeleton className="mt-3 h-6 w-full border-t border-border pt-3" />
                    </CardContent>
                </Card>
            ))}
        </div>
    </section>
);

export default ZoneDetailsSkeleton;