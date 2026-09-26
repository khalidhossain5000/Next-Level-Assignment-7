import { createLoadShedding, getLoadSheddingSchedule } from "@/api/load-shedding.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddLoadShedding(){
    return useMutation({
        mutationFn:createLoadShedding
    })
}



export function useGetLoadSheddingSchedule(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ["load-shedding-schedule", page, limit],
    queryFn: () => getLoadSheddingSchedule(page, limit),
  });
}