import { addArea } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useAddArea(){
    return useMutation({
        mutationFn:addArea
    })
}