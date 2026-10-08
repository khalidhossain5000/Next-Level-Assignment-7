import { addZone, getAllZone, getZoneDetails } from "@/api";
import type { IZoneQueryParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddZone() {
      const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addZone,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-zone"] })
    }
  
    })
}

export function useGetAllZone(params: IZoneQueryParams = {}) {
    return useQuery({
        queryKey: ["all-zone", params],
        queryFn: () => getAllZone(params)
    })
}


export function useGetZoneDetails(id:string){
    return useQuery({
        queryKey:["zone-details",id],
        queryFn:()=>getZoneDetails(id)
    })
}