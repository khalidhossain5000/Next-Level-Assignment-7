
import { createLoadShedding, getLoadSheddingDetails, getLoadSheddingSchedule, updateLoadShedding } from "@/api";
import type { ILoadSheddingQuery } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddLoadShedding() {
  return useMutation({
    mutationFn: createLoadShedding
  })
}



export function useGetLoadSheddingSchedule(params: ILoadSheddingQuery = {}) {
  return useQuery({
    queryKey: ["load-shedding-schedule", params],
    queryFn: () => getLoadSheddingSchedule(params),
  });
}


export function useGetLoadSheddingDetails(id: string) {
  return useQuery({
    queryKey: ["load-shedding-details", id],
    queryFn: () => getLoadSheddingDetails(id)
  })
}



export function useUpdateLoadShedding() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateLoadShedding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["load-shedding-schedule"] })
    }
  })
}