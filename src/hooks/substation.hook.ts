import { addSubstation, getSubstation } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddSubstation(){
      const queryClient = useQueryClient()
    return useMutation({
        mutationFn:addSubstation,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-substation"] })
    }
  
    })
}

export function useGetSubstation(){
    return useQuery({
        queryKey:["get-substation"],
        queryFn:getSubstation
    })
}