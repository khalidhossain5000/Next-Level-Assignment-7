import { addSubstation } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useAddZone(){
    return useMutation({
        mutationFn:addSubstation
    })
}