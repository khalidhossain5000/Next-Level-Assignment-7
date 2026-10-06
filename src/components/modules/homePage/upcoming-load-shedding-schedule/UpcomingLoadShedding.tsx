"use client";

import { useGetLoadSheddingSchedule } from "@/hooks";

const UpcomingLoadSheddingSchedule = () => {
    const {data,isPending} = useGetLoadSheddingSchedule()
    console.log(data,"load shedding")
    return (
        <div>
            
        </div>
    );
};

export default UpcomingLoadSheddingSchedule;