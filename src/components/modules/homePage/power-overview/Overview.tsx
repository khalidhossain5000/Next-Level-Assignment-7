"use client"

import { useGetAllZone, useGetLoadSheddingSchedule, useGetPlannedOutage } from "@/hooks";

const Overview = () => {
    //here i will show zone count,loadshedding count,planned outage count,technican count
    const {data:zone,isPending:zonePending}=useGetAllZone()
    const {data:loadShedding,isPending:loadSheddingPending}=useGetLoadSheddingSchedule()
    const {data:plannedOutage,isPending:plannedOutagePending}=useGetPlannedOutage()

    return (
        <div>
            
        </div>
    );
};

export default Overview;