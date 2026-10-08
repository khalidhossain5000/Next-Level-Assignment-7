import { assignTechnician, deleteMyOutage, getAllOutages, getCurrentTechnicainOutage, getMyOutages, getOutagesStats, reportOutage, updateMyOutage, updateOutageStatus } from "@/api";
import type { IQueryParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useReportOutage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: reportOutage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-outages"] });
        },
    })
}



export function useGetMyOutages(params: IQueryParams = {}) {
    return useQuery({
        queryKey: ["my-outages", params],
        queryFn: () => getMyOutages(params)
    })
}

export function useGetOutageStats() {
    return useQuery({
        queryKey: ["outage-stats"],
        queryFn: getOutagesStats
    })
}


export function useGetAllOutages(params: IQueryParams = {}) {
    return useQuery({
        queryKey: ["all-outages", params],
        queryFn: () => getAllOutages(params)
    })
}


//for admiin

export function useUpdateStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateOutageStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assigned-outages"] });
            queryClient.invalidateQueries({ queryKey: ["all-outages"] });
        },
    })
}


export function useAssignTechnician() {
      const queryClient = useQueryClient()
    return useMutation({
        mutationFn: assignTechnician,
         onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technican"] })
    }
    })
}



export function useGetTechnicanAssignedOutages() {
    return useQuery({
        queryKey: ["assigned-outages"],
        queryFn: getCurrentTechnicainOutage
    })
}


export function useUpdateOutage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateMyOutage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-outages"] });
        },
    });
}



export function useDeleteMyOutage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMyOutage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-outages"] });
        },
    });
}