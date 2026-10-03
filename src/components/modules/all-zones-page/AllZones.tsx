"use client"

import { useGetAllZone } from "@/hooks";
import { useState } from "react";

const AllZones = () => {
      const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const { data, isPending } = useGetAllZone()
    console.log(data, "this is data zone ")

    return (
        <section>
            {/* filter sidebar */}
            <div>
            </div>

            {/* zone card */}
            <div>
            </div>
        </section>
    );
};

export default AllZones;