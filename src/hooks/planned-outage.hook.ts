import { addPlannedOutage } from "@/api/planned-outage.api";
import { useMutation } from "@tanstack/react-query";

export function useAddPlannedOutage(){
    return useMutation({
        mutationFn:addPlannedOutage
    })
}

