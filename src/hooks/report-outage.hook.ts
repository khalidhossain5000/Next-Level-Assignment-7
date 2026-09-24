import { reportOutage } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useReportOutage(){
    return useMutation({
        mutationFn:reportOutage
    })
}

