import { addZone, getAllZone } from "@/api";
import type { IZoneQueryParams } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddZone() {
    return useMutation({
        mutationFn: addZone
    })
}

export function useGetAllZone(params: IZoneQueryParams = {}) {
    return useQuery({
        queryKey: ["all-zone", params],
        queryFn: () => getAllZone(params)
    })
}