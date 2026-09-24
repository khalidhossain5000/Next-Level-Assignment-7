import apiClient from "@/lib/apiClient";
import type { IPlannedOutagePayload } from "@/types";

export function addPlannedOutage(payload:IPlannedOutagePayload){
    return apiClient("/planned-outage",{
        method:"POST",
        body:payload
    })
}


