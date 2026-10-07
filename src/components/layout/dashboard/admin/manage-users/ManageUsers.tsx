/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import { toast } from "sonner";
import {
  FiCreditCard,
  FiFileText,
  FiLock,
  FiUnlock,
  FiUsers,
} from "react-icons/fi";

import { useGetAllUsers, useUpdateUserStatus } from "@/hooks";

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
import { Button } from "@/components/ui/button";

import MyOutagesSkleton from "@/components/loader/skleton-loading/dashboard/my-outages.skleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IUser, UserStatus } from "@/types";
import { getRoleClassName, getStatusClassName } from "@/lib/admin.libs";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-BD", {
    dateStyle: "medium",
  });
};

const headClass =
  "h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground";

const ManageUsers = () => {
  const { data: users, isPending } = useGetAllUsers();

  const {
    mutate: updateUserStatus,
    isPending: updating,
    variables,
  } = useUpdateUserStatus();

  const allUsers: IUser[] = Array.isArray(users) ? users : users?.data ?? [];

  const handleToggleStatus = (userId: string, currentStatus: UserStatus) => {
    const newStatus: UserStatus = currentStatus === "ACTIVE" ? "BAN" : "ACTIVE";

    updateUserStatus(
      { userId, status: newStatus },
      {
        onSuccess: () => {
          toast.success(
            newStatus === "BAN"
              ? "User banned successfully."
              : "User unbanned successfully."
          );
        },
        onError: (error: any) => {
          toast.error(
            error?.data?.message ||
              error?.message ||
              "Failed to update user status."
          );
        },
      }
    );
  };

  const renderAction = (user: IUser, compact = false) => {
    if (user.role === "ADMIN") {
      return (
        <span className="text-xs text-muted-foreground">
          {compact ? "No actions" : "—"}
        </span>
      );
    }

    const isThisRowPending = updating && (variables as any)?.userId === user.id;

    if (user.status === "ACTIVE") {
      return (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isThisRowPending}
          onClick={() => handleToggleStatus(user.id, user.status)}
          className={`cursor-pointer gap-1.5 rounded-lg border-red-200 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30 ${
            compact ? "h-8" : "h-9"
          }`}
        >
          <FiLock className="size-3.5" />

          {updating ? "Banning....." : "Ban"}
        </Button>
      );
    }

    return (
      <Button
        type="button"
        size="sm"
        disabled={isThisRowPending}
        onClick={() => handleToggleStatus(user.id, user.status)}
        className={`cursor-pointer gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 ${
          compact ? "h-8" : "h-9"
        }`}
      >
        <FiUnlock className="size-3.5" />

        {updating ? "UnBanning....." : "Unban"}
      </Button>
    );
  };

  if (isPending) {
    return <MyOutagesSkleton />;
  }

  if (allUsers.length === 0) {
    return (
      <div className="mx-auto flex min-h-72 w-full max-w-6xl items-center justify-center rounded-2xl border border-border bg-card px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiUsers className="size-5" />
          </div>

          <h3 className="font-manrope text-base font-semibold text-card-foreground">
            No Users Found
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            No registered user accounts yet.
          </p>
        </div>
      </div>
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
                  <TableHead className={`${headClass} pl-6`}>User</TableHead>
                  <TableHead className={headClass}>Role</TableHead>
                  <TableHead className={headClass}>Outages</TableHead>
                  <TableHead className={headClass}>Payments</TableHead>
                  <TableHead className={headClass}>Joined</TableHead>
                  <TableHead className={headClass}>Status</TableHead>
                  <TableHead className={`${headClass} pr-6 text-right`}>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allUsers.map((user, index) => {
                  const cellBorder =
                    index !== allUsers.length - 1
                      ? "border-b border-border"
                      : "";

                  return (
                    <TableRow
                      key={user.id}
                      className="group border-0 transition-colors hover:bg-muted/30"
                    >
                      {/* User */}
                      <TableCell className={`pl-6 ${cellBorder}`}>
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            <Avatar className="relative size-9 border border-background shadow-lg ring-1 ring-border">
                              <AvatarImage
                                src={user?.profileImage as string}
                                alt={user?.name}
                                className="object-cover"
                              />

                              <AvatarFallback className="text-2xl font-semibold uppercase">
                                {user?.name?.slice(0, 2) || "U"}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="min-w-0 max-w-52">
                            <p className="truncate font-semibold text-card-foreground">
                              {user.name}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Role */}
                      <TableCell className={cellBorder}>
                        <Badge
                          variant="outline"
                          className={getRoleClassName(user.role)}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>

                      {/* Outages */}
                      <TableCell className={cellBorder}>
                        <div className="flex items-center gap-1.5 text-sm text-card-foreground">
                          <FiFileText className="size-3.5 text-muted-foreground" />
                          {user.reportedOutages?.length ?? 0}
                        </div>
                      </TableCell>

                      {/* Payments */}
                      <TableCell className={cellBorder}>
                        <div className="flex items-center gap-1.5 text-sm text-card-foreground">
                          <FiCreditCard className="size-3.5 text-muted-foreground" />
                          {user.payments?.length ?? 0}
                        </div>
                      </TableCell>

                      {/* Joined */}
                      <TableCell
                        className={`whitespace-nowrap text-sm text-muted-foreground ${cellBorder}`}
                      >
                        {formatDate(user.createdAt)}
                      </TableCell>

                      {/* Status */}
                      <TableCell className={cellBorder}>
                        <Badge
                          variant="outline"
                          className={getStatusClassName(user.status)}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className={`pr-6 ${cellBorder}`}>
                        <div className="flex items-center justify-end gap-1.5">
                          {renderAction(user)}
                        </div>
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
        {allUsers.map((user) => (
          <Card
            key={user.id}
            className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
          >
            {/* sm and up */}
            <CardContent className="hidden px-4 py-3 sm:block sm:px-5 sm:py-3.5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* User */}
                <div className="flex min-w-0 flex-1 items-center gap-2.5 pr-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                        {user.name}
                      </p>

                      <Badge
                        variant="outline"
                        className={`shrink-0 text-[10px] font-semibold ${getStatusClassName(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </Badge>
                    </div>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Role */}
                <Badge
                  variant="outline"
                  className={`hidden shrink-0 md:inline-flex ${getRoleClassName(
                    user.role
                  )}`}
                >
                  {user.role}
                </Badge>

                {/* Outages + Payments */}
                <div className="hidden shrink-0 items-center gap-4 text-xs text-muted-foreground md:flex">
                  <div className="flex items-center gap-1">
                    <FiFileText className="size-3.5" />
                    <span>{user.reportedOutages?.length ?? 0}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <FiCreditCard className="size-3.5" />
                    <span>{user.payments?.length ?? 0}</span>
                  </div>
                </div>

                {/* Joined */}
                <div className="hidden shrink-0 lg:block">
                  <p className="text-[11px] text-muted-foreground">Joined</p>

                  <p className="text-xs font-medium text-card-foreground">
                    {formatDate(user.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  {renderAction(user)}
                </div>
              </div>
            </CardContent>

            {/* below sm */}
            <CardContent className="px-4 py-3 sm:hidden">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-card-foreground">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={`shrink-0 whitespace-nowrap text-[10px] font-semibold ${getStatusClassName(
                    user.status
                  )}`}
                >
                  {user.status}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${getRoleClassName(user.role)}`}
                  >
                    {user.role}
                  </Badge>

                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <FiFileText className="size-3" />
                    {user.reportedOutages?.length ?? 0}
                  </span>

                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <FiCreditCard className="size-3" />
                    {user.payments?.length ?? 0}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {renderAction(user, true)}
                </div>
              </div>

              <p className="mt-2 text-[11px] text-muted-foreground">
                Joined {formatDate(user.createdAt)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ManageUsers;
