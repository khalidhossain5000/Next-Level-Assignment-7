import { addFeeder } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useAddFeeder(){
    return useMutation({
        mutationFn:addFeeder
    })
}