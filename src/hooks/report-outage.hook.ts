import { assignTechnician, deleteMyOutage, getAllOutages, getCurrentTechnicainOutage, getMyOutages, reportOutage, updateMyOutage, updateOutageStatus } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useReportOutage(){
    return useMutation({
        mutationFn:reportOutage
    })
}



export function useGetMyOutages(){
    return useQuery({
        queryKey:["my-outages"],
        queryFn:getMyOutages
    })
}


export function useGetAllOutages(){
    return useQuery({
        queryKey:["all-outages"],
        queryFn:getAllOutages
    })
}


//for admiin

export function useUpdateStatus(){
    return useMutation({
        mutationFn:updateOutageStatus
    })
}


export function useAssignTechnician(){
    return useMutation({
        mutationFn:assignTechnician
    })
}



export function useGetTechnicanAssignedOutages(){
    return useQuery({
        queryKey:["assigned-outages"],
        queryFn:getCurrentTechnicainOutage
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



export function useDeleteMyOutage(){
     const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMyOutage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-outages"] });
        },
    });
}