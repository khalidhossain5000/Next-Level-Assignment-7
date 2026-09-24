import { addSubstation, getSubstation } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddSubstation(){
    return useMutation({
        mutationFn:addSubstation
    })
}

export function useGetSubstation(){
    return useQuery({
        queryKey:["get-substation"],
        queryFn:getSubstation
    })
}