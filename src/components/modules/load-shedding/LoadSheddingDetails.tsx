"use client"

import { useGetLoadSheddingDetails } from "@/hooks";

const LoadSheddingDetails = ({id}:{id:string}) => {
    const {data,isPending} = useGetLoadSheddingDetails(id);
    console.log(data,"this is data")
    return (
        <div>
            
        </div>
    );
};

export default LoadSheddingDetails;