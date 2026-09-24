import apiClient from "@/lib/apiClient";
import type { ILoadSheddingPayload } from "@/types";

export function createLoadShedding(payload:ILoadSheddingPayload){
    return apiClient("/load-shedding",{
        method:"POST",
        body:payload
    })
}
