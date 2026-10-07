import { assignTechnician, deleteMyOutage, getAllOutages, getCurrentTechnicainOutage, getMyOutages, getOutagesStats, reportOutage, updateMyOutage, updateOutageStatus } from "@/api";
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



export function useGetMyOutages() {
    return useQuery({
        queryKey: ["my-outages"],
        queryFn: getMyOutages
    })
}

export function useGetOutageStats() {
    return useQuery({
        queryKey: ["outage-stats"],
        queryFn: getOutagesStats
    })
}


export function useGetAllOutages() {
    return useQuery({
        queryKey: ["all-outages"],
        queryFn: getAllOutages
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
    return useMutation({
        mutationFn: assignTechnician
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