import { getAdminAnalytics, getCustomerAnalytics, getTechnicianAnalytics } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCustomerAnalytics(){
    return useQuery({
        queryKey:["customer-analytics"],
        queryFn:getCustomerAnalytics
    })
}

export function useGetTechnicianAnalytics(){
    return useQuery({
        queryKey:["technicain-analytics"],
        queryFn:getTechnicianAnalytics
    })
}

export function useGetAdminAnalytics(){
    return useQuery({
        queryKey:["admin-analytics"],
        queryFn:getAdminAnalytics
    })
}