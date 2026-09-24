import apiClient from "@/lib/apiClient";
import type { IAreaInterface } from "@/types";

export function addArea(payload:IAreaInterface){
    return apiClient("/area",{
        method:"POST",
        body:payload
    })
}


export function getArea(){
    return apiClient("/area")
}