import { getPayments, makePayment } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useMakePayment(){
    return useMutation({
        mutationFn:makePayment
    })
}

export function useGetPayments(){
    return useQuery({
        queryKey:["payments"],
        queryFn:getPayments
    })
}