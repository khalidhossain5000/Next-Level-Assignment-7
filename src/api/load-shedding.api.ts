import apiClient from "@/lib/apiClient";
import type { ILoadSheddingPayload, ILoadSheddingQuery, IUpdateLoadSheddingPayload } from "@/types";

export function createLoadShedding(payload:ILoadSheddingPayload){
    return apiClient("/load-shedding",{
        method:"POST",
        body:payload
    })
}





export function getLoadSheddingSchedule( params: ILoadSheddingQuery) {
    
  return apiClient(`/load-shedding`,{
    query:params
  });
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


export function getLoadSheddingDetails(id:string){
    return apiClient(`/load-shedding/${id}`)
}