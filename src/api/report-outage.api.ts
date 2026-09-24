import apiClient from "@/lib/apiClient";
import type { IPlannedOutagePayload } from "@/types";

export function reportOutage(payload:IPlannedOutagePayload){
    return apiClient("/outage",{
        method:"POST",
        body:payload
    })
}


