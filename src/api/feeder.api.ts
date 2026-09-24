import apiClient from "@/lib/apiClient";
import type { IFeederInterface } from "@/types";

export function addFeeder(payload:IFeederInterface){
    return apiClient("/feeder",{
        method:"POST",
        body:payload
    })
}