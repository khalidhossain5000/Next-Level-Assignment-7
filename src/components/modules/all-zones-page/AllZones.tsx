"use client"

import FilterSidebar from "@/components/layout/shared/filter-search-sidebar/FilterSearchSidebar";
import { useGetAllZone } from "@/hooks";
import { useState } from "react";
const sortOptions = [
    {
        label: "Created At",
        value: "createdAt",
    },
    {
        label: "Updated At",
        value: "updatedAt",
    },
]
const AllZones = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [sortBy, setSortBy] = useState("createdAt");

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const { data, isPending } = useGetAllZone()
    console.log(data, "this is data zone ")

    return (
        <section className="flex w-full flex-col gap-6 lg:flex-row">
            {/* filter sidebar */}
            <div className="max-w-md">
                <FilterSidebar
                    searchTerm={searchTerm}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    sortOptions={sortOptions}
                    onSearchChange={setSearchTerm}
                    onSortByChange={setSortBy}
                    onSortOrderChange={() =>
                        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                    }
                    onReset={() => {
                        setSearchTerm("");
                        setSortBy("createdAt");
                        setSortOrder("asc");
                    }}
                />
            </div>

            {/* zone card */}
            <div>
            </div>
        </section>
    );
};

export default AllZones;