import { createLoadShedding } from "@/api/load-shedding.api";
import { useMutation } from "@tanstack/react-query";

export function useAddLoadShedding(){
    return useMutation({
        mutationFn:createLoadShedding
    })
}


