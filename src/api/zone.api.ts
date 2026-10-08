import apiClient from "@/lib/apiClient";
import type { IAddZonePayload, IZoneQueryParams } from "@/types";


export function addZone(payload: IAddZonePayload) {
    const formData = new FormData()
    formData.append("data", JSON.stringify(payload.data))
    formData.append("zoneImage", payload.zoneImage)

    return apiClient("/zone", {
        method: "POST",
        body: formData
    })
}


export function getAllZone(params: IZoneQueryParams = {}) {
 
    return apiClient("/zone", { query: params })
}

export function getZoneDetails(id:string){
    return apiClient(`/zone/${id}`)
}