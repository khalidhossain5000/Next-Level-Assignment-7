import apiClient from "@/lib/apiClient";
import type { IAddSubstationPayload } from "@/types";

export function addSubstation(payload:IAddSubstationPayload){
    return apiClient(payload,{
        method:"POST",
        body:payload
    })
}