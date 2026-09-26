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



export function useGetPaymentRecords(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ["payment-record", page, limit],
    queryFn: () => getAllPaymentRecords(page, limit),
  });
}