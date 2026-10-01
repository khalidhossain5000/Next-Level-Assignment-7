import apiClient from "@/lib/apiClient";
import type { ILoadSheddingPayload } from "@/types";

export function createLoadShedding(payload:ILoadSheddingPayload){
    return apiClient("/load-shedding",{
        method:"POST",
        body:payload
    })
}





export function getLoadSheddingSchedule(page: number = 1, limit: number = 10) {
  return apiClient(`/load-shedding?page=${page}&limit=${limit}`);
}


export interface IUpdateLoadSheddingPayload {
    id:string;
    title?:string;
    areaId?:string
}

export function updateLoadShedding(payload:IUpdateLoadSheddingPayload){
    return apiClient(`/load-shedding/${payload.id}`,{
        method:"PATCH",
        body:{
            title:payload.title,
            areaId:payload.areaId
        }
    })
}