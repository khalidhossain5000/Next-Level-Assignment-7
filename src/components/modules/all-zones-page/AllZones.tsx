"use client"

import { useGetAllZone } from "@/hooks";

const AllZones = () => {
    const {data,isPending}=useGetAllZone()
console.log(data,"this is data zone")
    return (
        <section>
            
        </section>
    );
};

export default AllZones;