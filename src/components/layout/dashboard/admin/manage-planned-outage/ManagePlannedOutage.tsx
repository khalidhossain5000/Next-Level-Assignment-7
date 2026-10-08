"use client";

import { useGetPlannedOutage } from "@/hooks";
import { PaginationUi } from "@/components/layout/shared/pagination-ui/PaginationUi";
import { useUrlListState } from "@/hooks/use-url-list-state.hook";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MyOutagesSkleton from "@/components/loader/skleton-loading/dashboard/my-outages.skleton";
import UpdatePlannedOutageModal from "@/components/modal/update-planned-outage.modal";
import { getPlannedOutageStatusClassName } from "@/lib/utils";
import type { IPlannedOutage } from "@/types";
import EmptyText from "@/components/layout/shared/empty-text/EmptyText";

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const headClass =
  "h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground";

const ManagePlannedOutage = () => {
  const { page, limit, updateQuery } = useUrlListState();

  const { data: plannedOutage, isPending } = useGetPlannedOutage({
    page,
    limit,
  });

  const outages: IPlannedOutage[] = plannedOutage?.data?.data ?? [];
  const meta = plannedOutage?.data?.meta;

  if (isPending) {
    return <MyOutagesSkleton />;
  }

  if (outages.length === 0) {
    return (
      <EmptyText title=" No Planned Outages" description="No planned maintenance outages have been scheduled yet." />
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table className="border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="hover:bg-transparent font-inter">
                  <TableHead className={`${headClass} pl-6`}>Title</TableHead>
                  <TableHead className={headClass}>Area</TableHead>
                  <TableHead className={headClass}>Reason</TableHead>
                  <TableHead className={headClass}>Start Time</TableHead>
                  <TableHead className={headClass}>End Time</TableHead>
                  <TableHead className={`${headClass} pr-6`}>Status</TableHead>
                  <TableHead className={`${headClass} pr-6`}>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {outages.map((outage, index) => {
                  const cellBorder =
                    index !== outages.length - 1
                      ? "border-b border-border"
                      : "";

                  return (
                    <TableRow
                      key={outage.id}
                      className="group border-0 transition-colors hover:bg-muted/30"
                    >
                      {/* Title */}
                      <TableCell className={`pl-6 ${cellBorder}`}>
                        <div className="max-w-52">
                          <p className="truncate font-semibold text-card-foreground">
                            {outage.title}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            #{outage.id.slice(0, 8)}
                          </p>
                        </div>
                      </TableCell>

                      {/* Area */}
                      <TableCell className={cellBorder}>
                        <p className="max-w-44 truncate font-medium text-card-foreground">
                          {outage.area?.name ?? "N/A"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {outage.area?.code ?? "N/A"}
                        </p>
                      </TableCell>

                      {/* Reason */}
                      <TableCell className={cellBorder}>
                        <div className="max-w-48 truncate text-sm text-muted-foreground">
                          {outage.reason}
                        </div>
                      </TableCell>

                      {/* Start Time */}
                      <TableCell
                        className={`whitespace-nowrap text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {formatDate(outage.startTime)}
                      </TableCell>

                      {/* End Time */}
                      <TableCell
                        className={`whitespace-nowrap text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {formatDate(outage.endTime)}
                      </TableCell>

                      {/* Status */}
                      <TableCell className={`pr-6 ${cellBorder}`}>
                        <Badge
                          variant="outline"
                          className={getPlannedOutageStatusClassName(outage.status)}
                        >
                          {outage.status.replace("_", " ")}
                        </Badge>
                      </TableCell>

                      {/* action update */}
                      <TableCell className={`pr-6 ${cellBorder}`}>
                        <UpdatePlannedOutageModal
                          id={outage.id}
                          title={outage.title}
                          description={outage.description}
                          reason={outage.reason}
                        />
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
        {outages.map((outage) => (
          <Card
            key={outage.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            {/* sm and up */}
            <CardContent className="hidden px-4 py-3 sm:block sm:px-5 sm:py-3.5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Title + Area */}
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                      {outage.title}
                    </p>

                    <span className="hidden shrink-0 text-xs text-muted-foreground md:inline">
                      #{outage.id.slice(0, 8)}
                    </span>

                    <Badge
                      variant="outline"
                      className={`shrink-0 text-[10px] font-semibold ${getPlannedOutageStatusClassName(
                        outage.status,
                      )}`}
                    >
                      {outage.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {outage.area?.name ?? "N/A"}
                    {outage.area?.code && (
                      <span className="hidden md:inline">
                        {" "}
                        &middot; {outage.area.code}
                      </span>
                    )}
                    <span className="hidden md:inline">
                      {" "}
                      &middot; {outage.reason}
                    </span>
                  </p>
                </div>

                {/* Start */}
                <div className="hidden shrink-0 md:block">
                  <p className="text-[11px] text-muted-foreground">Starts</p>

                  <p className="text-xs font-medium text-card-foreground">
                    {formatDate(outage.startTime)}
                  </p>
                </div>
                <UpdatePlannedOutageModal
                  id={outage.id}
                  title={outage.title}
                  description={outage.description}
                  reason={outage.reason}
                />
                {/* End */}
                <div className="hidden shrink-0 lg:block">
                  <p className="text-[11px] text-muted-foreground">Ends</p>

                  <p className="text-xs font-medium text-card-foreground">
                    {formatDate(outage.endTime)}
                  </p>
                </div>
              </div>
            </CardContent>

            {/* below sm */}
            <CardContent className="px-4 py-3 sm:hidden">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-card-foreground">
                    {outage.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {outage.area?.name ?? "N/A"}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={`shrink-0 whitespace-nowrap text-[10px] font-semibold ${getPlannedOutageStatusClassName(
                    outage.status,
                  )}`}
                >
                  {outage.status.replace("_", " ")}
                </Badge>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                {outage.reason}
              </p>

              <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-2.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Starts</span>
                  <span className="font-medium text-card-foreground">
                    {formatDate(outage.startTime)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ends</span>
                  <span className="font-medium text-card-foreground">
                    {formatDate(outage.endTime)}
                  </span>
                </div>
              </div>
              <UpdatePlannedOutageModal
                id={outage.id}
                title={outage.title}
                description={outage.description}
                reason={outage.reason}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {outages.length > 0 && (
        <div className="w-full min-w-0 border-t border-border/60 pt-5 sm:pt-6">
          <PaginationUi
            currentPage={meta?.page ?? page}
            itemsPerPage={meta?.limit ?? limit}
            totalItems={meta?.total ?? 0}
            totalPages={meta?.totalPages ?? 1}
            onPageChange={(value) => updateQuery({ page: value }, "push")}
            onItemsPerPageChange={(value) => {
              updateQuery({ limit: value, page: 1 });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ManagePlannedOutage;