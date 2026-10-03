"use client";

import {
    ArrowDown,
    ArrowUp,
    RotateCcw,
    Search,
    SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";



type FilterSidebarProps = {
    searchTerm: string;

    sortOrder: "asc" | "desc";



    onSearchChange: (value: string) => void;

    onSortOrderChange: () => void;
    onReset: () => void;
};

const FilterSidebar = ({
    searchTerm,
    sortOrder,
    onSearchChange,
    onSortOrderChange,
    onReset,
}: FilterSidebarProps) => {
    const isAsc = sortOrder === "asc";

    return (
        <aside className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-primary/20 bg-card p-5 shadow-lg lg:w-72">
            {/* Glow effects */}
            <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/30 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-chart-1/30 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,var(--primary),transparent)]"
            />

            <div className="relative z-10">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
                            <SlidersHorizontal className="size-4" />
                        </div>

                        <div>
                            <h2 className="text-base font-semibold leading-none text-foreground">
                                Filters
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Refine your results
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        className="cursor-pointer gap-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    >
                        <RotateCcw className="size-3.5" />
                        Reset
                    </Button>
                </div>

                <div className="space-y-5">
                    {/* Search */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="filter-search"
                            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                        >
                            Search
                        </Label>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="filter-search"
                                value={searchTerm}
                                onChange={(event) => onSearchChange(event.target.value)}
                                placeholder="Search..."
                                className="h-11 rounded-xl border-border bg-background/60 pl-9 shadow-sm transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="h-px bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />



                    {/* Sort Order  */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Sort Order
                        </Label>

                        <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-muted/50 p-1">
                            <Button
                                type="button"
                                variant="ghost"
                                aria-pressed={isAsc}
                                onClick={() => {
                                    if (!isAsc) onSortOrderChange();
                                }}
                                className={cn(
                                    "h-9 cursor-pointer gap-1.5 rounded-lg text-sm font-medium transition-all",
                                    isAsc
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary hover:text-primary-foreground"
                                        : "text-muted-foreground hover:bg-background hover:text-foreground"
                                )}
                            >
                                <ArrowUp className="size-4" />
                                Asc
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                aria-pressed={!isAsc}
                                onClick={() => {
                                    if (isAsc) onSortOrderChange();
                                }}
                                className={cn(
                                    "h-9 cursor-pointer gap-1.5 rounded-lg text-sm font-medium transition-all",
                                    !isAsc
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary hover:text-primary-foreground"
                                        : "text-muted-foreground hover:bg-background hover:text-foreground"
                                )}
                            >
                                <ArrowDown className="size-4" />
                                Desc
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;
