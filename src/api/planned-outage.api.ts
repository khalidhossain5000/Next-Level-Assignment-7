import apiClient from "@/lib/apiClient";
import type { IPlannedOutagePayload, IUpdatePayload } from "@/types";

export function addPlannedOutage(payload:IPlannedOutagePayload){
    return apiClient("/planned-outage",{
        method:"POST",
        body:payload
    })
}

export function getPlannedOutage(page: number = 1, limit: number = 10) {
  return apiClient(`/planned-outage?page=${page}&limit=${limit}`);
}






export function updatePlannedOutage(payload:IUpdatePayload,id:string){
    return apiClient(`/planned-outage/${id}`,{
        method:"PATCH",
        body:payload
    })
}