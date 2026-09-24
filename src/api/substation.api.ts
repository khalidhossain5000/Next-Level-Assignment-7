import apiClient from "@/lib/apiClient";
import type { IAddSubstationPayload } from "@/types";

export function addSubstation(payload:IAddSubstationPayload){
    return apiClient("/substation",{
        method:"POST",
        body:payload
    })
}

export function getSubstation(){
    return apiClient("/substation")
}