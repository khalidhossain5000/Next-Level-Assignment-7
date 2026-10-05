import { addPlannedOutage, getPlannedOutage, getPlannedOutageDetails, updatePlannedOutage } from "@/api/planned-outage.api";
import type { IQueryParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddPlannedOutage() {
  return useMutation({
    mutationFn: addPlannedOutage
  })
}
export function useGetPlannedOutage(params:IQueryParams={}) {
  return useQuery({
    queryKey: ["planned-outage", params],
    queryFn: () => getPlannedOutage(params),
  });
}

export function useUpdatePlannedOutage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlannedOutage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planned-outage"] });
    },
  })
}




export function useGetPlannedOutageDetails(id:string){
    return useQuery({
        queryKey:["planned-outage-details",id],
        queryFn:()=>getPlannedOutageDetails(id)
    })
}