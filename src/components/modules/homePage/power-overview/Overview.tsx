"use client"

import HomeCardSkeleton from "@/components/loader/skleton-loading/others/home-card.skeleton";
import { useGetAllZone, useGetLoadSheddingSchedule, useGetPlannedOutage, useGetTechnicianCount } from "@/hooks";

const Overview = () => {
    //here i will show zone count,loadshedding count,planned outage count,technican count
    const {data:zone,isPending:zonePending}=useGetAllZone()
    const {data:loadShedding,isPending:loadSheddingPending}=useGetLoadSheddingSchedule()
    const {data:plannedOutage,isPending:plannedOutagePending}=useGetPlannedOutage()
    const {data:technicianCount,isPending:technicianCountPending}=useGetTechnicianCount()

    if(zonePending || loadSheddingPending || plannedOutagePending || technicianCountPending) return <HomeCardSkeleton/>
    const zoneCount=zone?.data?.length || 0
    const loadSheddingCount=loadShedding?.data?.length || 0
    const plannedOutageCount=plannedOutage?.data?.length || 0
    const technicianCountValue=technicianCount?.data || 0

    console.log(zoneCount,loadSheddingCount,plannedOutageCount,technicianCountValue,"this is overview data")
    return (
        <div>
            
        </div>
    );
};

export default Overview;