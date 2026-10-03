import apiClient from "@/lib/apiClient";
import type { ILoadSheddingPayload } from "@/types";

export function createLoadShedding(payload:ILoadSheddingPayload){
    return apiClient("/load-shedding",{
        method:"POST",
        body:payload
    })
}



export interface ILoadSheddingQuery {
    page?:number;
    limit?:number;
    searchTerm?:string;
}

export function getLoadSheddingSchedule( params: ILoadSheddingQuery) {
    console.log(params,"params from load shedding get")
  return apiClient(`/load-shedding`,{
    query:params
  });
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