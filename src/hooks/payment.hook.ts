import { makePayment } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useMakePayment(){
    return useMutation({
        mutationFn:makePayment
    })
}