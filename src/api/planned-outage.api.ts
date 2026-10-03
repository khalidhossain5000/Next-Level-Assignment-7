import apiClient from "@/lib/apiClient";
import type { IPlannedOutagePayload, IQueryParams, IUpdatePayload } from "@/types";

export function addPlannedOutage(payload:IPlannedOutagePayload){
    return apiClient("/planned-outage",{
        method:"POST",
        body:payload
    })
}

export function getPlannedOutage(params: IQueryParams = {}) {
   return apiClient("/planned-outage", { query: params })
}






export function updatePlannedOutage(payload:IUpdatePayload){
    return apiClient(`/planned-outage/${payload.id}`,{
        method:"PATCH",
        body:{
            title:payload.title,
            reason:payload.reason,
            description:payload.description
        }
    })
}