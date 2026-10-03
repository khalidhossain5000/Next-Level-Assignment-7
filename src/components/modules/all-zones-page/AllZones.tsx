"use client";

import { ArrowRight, CalendarClock, Zap } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import FilterSidebar from "@/components/layout/shared/filter-search-sidebar/FilterSearchSidebar";
import ZoneSkeleton from "@/components/loader/skleton-loading/others/zone-card-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useGetAllZone } from "@/hooks";
import Link from "next/link";
import useDebounce from "@/hooks/debounce.hook";
import { PaginationUi } from "@/components/layout/shared/pagination-ui/PaginationUi";

type Substation = {
  id: string;
  name: string;
  capacity: string;
  code: string;
  location: string;
  status: string;
};

type Zone = {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
  zoneImageUrl: string;
  createdAt: string;
  updatedAt: string;
  substations: Substation[];
};

const AllZones = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isPending } = useGetAllZone({
    searchTerm: debouncedSearch || undefined,
    sortOrder,
    page,
    limit,
  });

  if (isPending) return <ZoneSkeleton />;

  const zones = data?.data as Zone[];
  console.log(data, "full zone response");
  return (
    <section className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
      {/* Filter Sidebar */}
      <div className="w-full lg:sticky lg:top-6 lg:w-72 lg:shrink-0">
        <FilterSidebar
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
          onSortOrderChange={() => {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
            setPage(1);
          }}
          onReset={() => {
            setSearchTerm("");
            setSortOrder("asc");
            setPage(1);
          }}
        />
      </div>

      {/* Zone Cards and pagination */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        {zones.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-border bg-card text-sm text-muted-foreground">
            No zones found
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {zones.map((zone) => {
              const count = zone.substations.length;
              const isActive = zone.status === "ACTIVE";

              return (
                <Card
                  key={zone.id}
                  className="group h-full gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-sm ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Image */}
                  <div className="relative h-44 w-full shrink-0 overflow-hidden bg-muted">
                    <Image
                      src={zone.zoneImageUrl}
                      alt={zone.name}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                    {/* Zone Code */}
                    <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold tracking-wide text-foreground backdrop-blur-md">
                      {zone.code}
                    </span>

                    {/* Status */}
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                      <span
                        className={`size-1.5 rounded-full ${
                          isActive ? "bg-emerald-500" : "bg-destructive"
                        }`}
                      />
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* Content */}
                  <CardContent className="flex flex-1 flex-col gap-4 px-5 pb-4 pt-5">
                    <div className="flex flex-col gap-1.5">
                      <CardTitle className="line-clamp-1 text-base font-semibold tracking-tight text-foreground">
                        {zone.name}
                      </CardTitle>

                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {zone.description.slice(0, 50)}...
                      </p>
                    </div>

                    {/* Substations */}
                    <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Zap
                          className={`size-4 ${
                            count > 0 ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-semibold text-foreground">
                          {count}
                        </span>
                        <span>
                          {count === 1 ? "Substation" : "Substations"}
                        </span>
                      </p>

                      {count > 0 ? (
                        <ul className="flex flex-col gap-1.5">
                          {zone.substations.slice(0, 2).map((sub) => (
                            <li
                              key={sub.id}
                              className="flex items-center justify-between gap-3 rounded-lg bg-muted px-3 py-2 text-xs"
                            >
                              <span className="truncate font-medium text-foreground">
                                {sub.name}
                              </span>
                              <span className="shrink-0 text-muted-foreground">
                                {sub.capacity}
                              </span>
                            </li>
                          ))}

                          {count > 2 && (
                            <li className="px-1 text-xs font-medium text-primary dark:text-chart-3">
                              +{count - 2} more
                            </li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          No substations yet
                        </p>
                      )}
                    </div>
                  </CardContent>

                  {/* Action */}
                  <CardFooter className="flex-col items-stretch gap-3 border-0 bg-transparent px-5 pb-5 pt-0">
                    <Link href={`/zones/${zone.id}`}>
                      <Button className="group/button h-10 w-full cursor-pointer gap-2 rounded-xl bg-primary font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90">
                        View Details
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
        {zones?.length > 0 && (
          <div className="w-full min-w-0">
            <PaginationUi
              currentPage={data?.meta?.page ?? page}
              itemsPerPage={data?.meta?.limit ?? limit}
              totalItems={data?.meta?.total ?? 0}
              totalPages={data?.meta?.totalPages ?? 1}
              onPageChange={setPage}
              onItemsPerPageChange={(value) => {
                setLimit(value);
                setPage(1);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AllZones;
