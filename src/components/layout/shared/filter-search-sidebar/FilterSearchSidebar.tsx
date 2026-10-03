"use client";

import { ArrowDown, ArrowUp, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type SortOption = {
  label: string;
  value: string;
};

type FilterSidebarProps = {
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";

  sortOptions: SortOption[];

  onSearchChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSortOrderChange: () => void;
  onReset: () => void;
};

const FilterSidebar = ({
  searchTerm,
  sortBy,
  sortOrder,
  sortOptions,
  onSearchChange,
  onSortByChange,
  onSortOrderChange,
  onReset,
}: FilterSidebarProps) => {
  return (
    <aside className="w-full shrink-0 rounded-2xl border border-border bg-card p-5 shadow-sm lg:w-72">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Filters</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Refine your results
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="gap-1.5 text-muted-foreground hover:bg-[#f9a300]/10 hover:text-[#f9a300] cursor-pointer"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label
            htmlFor="filter-search"
            className="text-sm font-medium text-foreground"
          >
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="filter-search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search..."
              className="h-10 border-border bg-background pl-9 focus-visible:border-[#f9a300] focus-visible:ring-[#f9a300]/20"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Sort By</Label>

          <Select
            value={sortBy}
            onValueChange={(value) => {
              if (value !== null) {
                onSortByChange(value);
              }
            }}
          >
            <SelectTrigger className="h-10 border-border bg-background focus:ring-[#f9a300]/20">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>

            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Sort Order
          </Label>

          <Button
            type="button"
            variant="outline"
            onClick={onSortOrderChange}
            className="h-10 w-full justify-between border-border bg-background font-normal hover:border-[#f9a300] hover:bg-[#f9a300]/5"
          >
            <span className="flex items-center gap-2">
              {sortOrder === "asc" ? (
                <ArrowUp className="size-4 text-[#f9a300]" />
              ) : (
                <ArrowDown className="size-4 text-[#009689]" />
              )}

              <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
            </span>

            <span className="text-xs text-muted-foreground">
              {sortOrder === "asc" ? "A → Z" : "Z → A"}
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
