import { addArea, getArea } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddArea(){
      const queryClient = useQueryClient()
    return useMutation({
        mutationFn:addArea,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-areas"] })
    }
  
    })
}




export function useGetArea(){
    return useQuery({
        queryKey:["all-areas"],
        queryFn:getArea
    })
}