import { addFeeder, getFeeder } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddFeeder(){
      const queryClient = useQueryClient()
    return useMutation({
        mutationFn:addFeeder,
         onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-feeder"] })
    }
    })
}


export function useGetFeeder(){
    return useQuery({
        queryKey:["all-feeder"],
        queryFn:getFeeder
    })
}