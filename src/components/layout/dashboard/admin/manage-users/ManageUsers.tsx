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
import { Spinner } from "@/components/ui/spinner";
import { IUser, UserStatus } from "@/types";



const getRoleClassName = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300";
    case "TECHNICIAN":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300";
  }
};

const getStatusClassName = (status: string) => {
  if (status === "ACTIVE") {
    return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";
  }
  return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-BD", {
    dateStyle: "medium",
  });
};

const ManageUsers = () => {
  const { data: users, isPending } = useGetAllUsers();

  const {
    mutate: updateUserStatus,
    isPending: updating,
    variables,
  } = useUpdateUserStatus();

  const allUsers: IUser[] = Array.isArray(users) ? users : (users?.data ?? []);

  const handleToggleStatus = (userId: string, currentStatus: UserStatus) => {
    const newStatus: UserStatus =
      currentStatus === "ACTIVE" ? "BAN" : "ACTIVE";

    updateUserStatus(
      { userId, status: newStatus },
      {
        onSuccess: () => {
          toast.success(
            newStatus === "BAN"
              ? "User banned successfully."
              : "User unbanned successfully.",
          );
        },
        onError: (error: any) => {
          toast.error(
            error?.data?.message ||
              error?.message ||
              "Failed to update user status.",
          );
        },
      },
    );
  };

  if (isPending) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
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
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-card-foreground">
            All Users
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage account status across all roles.
          </p>
        </div>

        <Badge
          variant="outline"
          className="w-fit rounded-full px-3 py-1 text-xs font-medium"
        >
          {allUsers.length} {allUsers.length === 1 ? "User" : "Users"}
        </Badge>
      </div>

      {/* =====================================================
          XL AND ABOVE → TABLE VIEW
      ====================================================== */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="h-12 whitespace-nowrap pl-6">
                    User
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Role
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Outages
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Payments
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Joined
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap">
                    Status
                  </TableHead>
                  <TableHead className="h-12 whitespace-nowrap pr-6 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allUsers.map((user) => {
                  const isActive = user.status === "ACTIVE";
                  const isThisRowPending =
                    updating && (variables as any)?.userId === user.id;

                  return (
                    <TableRow
                      key={user.id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      {/* User */}
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {user.name.charAt(0).toUpperCase()}
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
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getRoleClassName(user.role)}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>

                      {/* Outages */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-card-foreground">
                          <FiFileText className="size-3.5 text-muted-foreground" />
                          {user.reportedOutages?.length ?? 0}
                        </div>
                      </TableCell>

                      {/* Payments */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-card-foreground">
                          <FiCreditCard className="size-3.5 text-muted-foreground" />
                          {user.payments?.length ?? 0}
                        </div>
                      </TableCell>

                      {/* Joined */}
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusClassName(user.status)}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="pr-6">
                        <div className="flex items-center justify-end">
                          {user.role === "ADMIN" ? (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          ) : isActive ? (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={isThisRowPending}
                              onClick={() =>
                                handleToggleStatus(user.id, user.status)
                              }
                              className="h-9 gap-1.5 rounded-lg border-red-200 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                            >
                              <FiLock className="size-3.5" />
                              Ban
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              size="sm"
                              disabled={isThisRowPending}
                              onClick={() =>
                                handleToggleStatus(user.id, user.status)
                              }
                              className="h-9 gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                            >
                              <FiUnlock className="size-3.5" />
                              Unban
                            </Button>
                          )}
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

      {/* =====================================================
          BELOW XL → CARD VIEW
      ====================================================== */}
      <div className="space-y-3 xl:hidden">
        {allUsers.map((user) => {
          const isActive = user.status === "ACTIVE";
          const isThisRowPending =
            updating && (variables as any)?.userId === user.id;

          return (
            <Card
              key={user.id}
              className="rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-muted/20"
            >
              <CardContent className="space-y-3 px-4 py-3.5 sm:px-5">
                {/* Top: Name + Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
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
                    className={`shrink-0 text-[10px] ${getStatusClassName(
                      user.status,
                    )}`}
                  >
                    {user.status}
                  </Badge>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-2.5 text-xs">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${getRoleClassName(user.role)}`}
                  >
                    {user.role}
                  </Badge>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <FiFileText className="size-3.5" />
                    <span>{user.reportedOutages?.length ?? 0} outages</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <FiCreditCard className="size-3.5" />
                    <span>{user.payments?.length ?? 0} payments</span>
                  </div>

                  <span className="ml-auto text-muted-foreground">
                    Joined {formatDate(user.createdAt)}
                  </span>
                </div>

                {/* Action */}
                <div className="flex items-center justify-end border-t border-border pt-2.5">
                  {user.role === "ADMIN" ? (
                    <span className="text-xs text-muted-foreground">
                      No actions available
                    </span>
                  ) : isActive ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isThisRowPending}
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      className="h-8 gap-1.5 rounded-lg border-red-200 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                    >
                      <FiLock className="size-3.5" />
                      Ban User
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      disabled={isThisRowPending}
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      className="h-8 gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                    >
                      <FiUnlock className="size-3.5" />
                      Unban User
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ManageUsers;