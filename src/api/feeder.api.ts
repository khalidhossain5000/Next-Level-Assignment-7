import apiClient from "@/lib/apiClient";

export function addFeeder(payload:any){
    return apiClient("/feeder",{
        method:"POST",
        body:payload
    })
}