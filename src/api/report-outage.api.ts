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


//update status
// 1/outage/898951b4-bc7d-4b70-a234-7a7454c11907/status
export interface IUpdateStatus{
    id:string;
    status:string
}
export function updateOutageStatus(payload:IUpdateStatus){
    return apiClient(`/outage/${payload.id}/status`,{
        method:"PATCH",
        body: payload.status
        
    })
}


//assign technician /api/v1/outage/898951b4-bc7d-4b70-a234-7a7454c11907/assign-technician
export interface IAssignTechnician{
    id:string;
    technicianId:string
}
export function assignTechnician(payload:IAssignTechnician){
 return apiClient(`/outage/${payload.id}/assign-technician`,{
        method:"PATCH",
        body: payload.technicianId
        
    })
}