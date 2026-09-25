import { getMyOutages, reportOutage } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useReportOutage(){
    return useMutation({
        mutationFn:reportOutage
    })
}



export function useGetMyOutages(){
    return useQuery({
        queryKey:["my-outages"],
        queryFn:getMyOutages
    })
}