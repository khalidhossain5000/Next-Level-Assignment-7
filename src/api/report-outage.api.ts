import apiClient from "@/lib/apiClient";
import type { IReportOutagePayload } from "@/types";

export function reportOutage(payload:IReportOutagePayload){
    return apiClient("/outage",{
        method:"POST",
        body:payload
    })
}


export function getMyOutages(){
    return apiClient("/outage/my-outage")
}

//for admin 

export function getAllOutages(){
    return apiClient("/outage")
}