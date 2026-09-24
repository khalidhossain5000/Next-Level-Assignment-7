import { addFeeder, getFeeder } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddFeeder(){
    return useMutation({
        mutationFn:addFeeder
    })
}


export function useGetFeeder(){
    return useQuery({
        queryKey:["all-areas"],
        queryFn:getFeeder
    })
}