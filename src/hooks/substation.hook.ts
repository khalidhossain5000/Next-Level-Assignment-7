import { addSubstation } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useAddSubstation(){
    return useMutation({
        mutationFn:addSubstation
    })
}