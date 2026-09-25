"use client"

import { useGetAllOutages } from "@/hooks";

const AllReportedOutages = () => {
    const {data,isPending} = useGetAllOutages()
    console.log(data,"data rp reported outages all")
    return (
        <div>
            
        </div>
    );
};

export default AllReportedOutages;