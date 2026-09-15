import { addZone, getAllZone } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddZone(){
    return useMutation({
        mutationFn:addZone
    })
}

export function useGetAllZone(){
    return useQuery({
        queryKey:["all-zone"],
        queryFn:getAllZone
    })
}