/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import {
  Card
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
interface IProps {
  length:number
}
const HomeCardSkeleton = ({length}:IProps) => {
  return (
    <section className="max-w-7xl mx-auto">
     

      {/* cards skeleton */}
      <div className="min-w-0 ">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length }).map((_, index) => (
            <Card key={index} className="gap-0 overflow-hidden py-0">
              <Skeleton className="aspect-video w-full rounded-none" />

              <div className="gap-2 px-4 pb-0 pt-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>

              <div className="px-4 pb-0 pt-3">
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              <div className="p-4">
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCardSkeleton;
