"use client"

import { useGetLoadSheddingSchedule } from "@/hooks";

const ManageLoadShedding = () => {
    const {data,isPending}=useGetLoadSheddingSchedule()
    console.log(data,"this load shedding")
    return (
        <div>
            
        </div>
    );
};

export default ManageLoadShedding;