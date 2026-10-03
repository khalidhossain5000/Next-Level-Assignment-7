"use client"

import { useGetZoneDetails } from "@/hooks";

interface IProps {
    id:string
}
const ZoneDetails = ({id}:IProps) => {
    const {data,isPending}=useGetZoneDetails(id)
    console.log(data,"CUrrent zone data")
    return (
        <div>
            
        </div>
    );
};

export default ZoneDetails;