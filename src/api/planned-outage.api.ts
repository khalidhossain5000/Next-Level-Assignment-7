import apiClient from "@/lib/apiClient";
import type { IPlannedOutagePayload } from "@/types";

export function addPlannedOutage(payload:IPlannedOutagePayload){
    return apiClient("/planned-outage",{
        method:"POST",
        body:payload
    })
}

export function getPlannedOutage(page: number = 1, limit: number = 10) {
  return apiClient(`/planned-outage?page=${page}&limit=${limit}`);
}