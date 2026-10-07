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

export function getOutagesStats(){
    return apiClient("/outage/counts")
}

export interface IUpdateStatus{
    id:string;
    status:string
}
export function updateOutageStatus(payload:IUpdateStatus){
    
    return apiClient(`/outage/${payload.id}/status`,{
        method:"PATCH",
        body: {
            status:payload.status
        }
        
    })
}


//assign technician /api/v1/outage/898951b4-bc7d-4b70-a234-7a7454c11907/assign-technician
export interface IAssignTechnician{
    outageId:string;
    technicianId:string
}
export function assignTechnician(payload:IAssignTechnician){
 return apiClient(`/outage/${payload.outageId}/assign-technician`,{
        method:"PATCH",
         body: {
      technicianId: payload.technicianId,
    },
        
    })
}












//get current technican assinged

export function getCurrentTechnicainOutage(){
    return apiClient("/outage/my-assigned-outages")
}



//update outage


export interface IUpdateOutagePayload {
    outageId: string;
    data: IReportOutagePayload;
}

export function updateMyOutage(payload: IUpdateOutagePayload) {
    return apiClient(`/outage/${payload.outageId}`, {
        method: "PATCH",
        body: payload.data,
    });
}




//delete my outage

export function deleteMyOutage(outageId:string){
    return apiClient(`/outage/${outageId}`,{
        method:"DELETE"
    })
}