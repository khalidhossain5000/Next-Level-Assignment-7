import { addPlannedOutage, getPlannedOutage, updatePlannedOutage } from "@/api/planned-outage.api";
import { IQueryParams } from "@/types";
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