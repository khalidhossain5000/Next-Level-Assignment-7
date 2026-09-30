import { addPlannedOutage, getPlannedOutage, updatePlannedOutage } from "@/api/planned-outage.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddPlannedOutage() {
  return useMutation({
    mutationFn: addPlannedOutage
  })
}
export function useGetPlannedOutage(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ["planned-outage", page, limit],
    queryFn: () => getPlannedOutage(page, limit),
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