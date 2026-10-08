"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UrlListStateUpdate = {
  page?: number;
  limit?: number;
  searchTerm?: string | null;
  sortOrder?: "asc" | "desc" | null;
};

type NavigationMode = "push" | "replace";

const parsePositiveInteger = (value: string | null, fallback: number) => {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
};

export function useUrlListState(defaultLimit = 10) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parsePositiveInteger(searchParams.get("page"), 1);
  const limit = parsePositiveInteger(searchParams.get("limit"), defaultLimit);
  const searchTerm =
    searchParams.get("search") ?? searchParams.get("searchTerm") ?? "";
  const requestedSortOrder = searchParams.get("sortOrder");
  const sortOrder: "asc" | "desc" =
    requestedSortOrder === "desc" ? "desc" : "asc";

  const updateQuery = (
    updates: UrlListStateUpdate,
    mode: NavigationMode = "replace",
  ) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (updates.page !== undefined) {
      if (updates.page <= 1) nextParams.delete("page");
      else nextParams.set("page", String(updates.page));
    }

    if (updates.limit !== undefined) {
      if (updates.limit === defaultLimit) nextParams.delete("limit");
      else nextParams.set("limit", String(updates.limit));
    }

    if (updates.searchTerm !== undefined) {
      nextParams.delete("searchTerm");
      if (updates.searchTerm) nextParams.set("search", updates.searchTerm);
      else nextParams.delete("search");
    }

    if (updates.sortOrder !== undefined) {
      if (!updates.sortOrder || updates.sortOrder === "asc") {
        nextParams.delete("sortOrder");
      } else {
        nextParams.set("sortOrder", updates.sortOrder);
      }
    }

    const query = nextParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    if (mode === "push") router.push(href, { scroll: false });
    else router.replace(href, { scroll: false });
  };

  return { page, limit, searchTerm, sortOrder, updateQuery };
}