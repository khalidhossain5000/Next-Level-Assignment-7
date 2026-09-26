import { getAllPaymentRecords, getPaymentDetails, getPayments, makePayment } from "@/api";
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

export function useGetPaymentDetails(){
      return useQuery({
        queryKey:["payment-details"],
        queryFn:()=>getPaymentDetails
    })
}



export function useGetPaymentRecords(){
    return useQuery({
        queryKey:["payment-record"],
        queryFn:getAllPaymentRecords
    })
}