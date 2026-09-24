import { addArea, getArea } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddArea(){
    return useMutation({
        mutationFn:addArea
    })
}




export function useGetArea(){
    return useQuery({
        queryKey:["all-areas"],
        queryFn:getArea
    })
}