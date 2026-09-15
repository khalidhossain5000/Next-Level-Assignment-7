import apiClient from "@/lib/apiClient";
import type { IAddZonePayload } from "@/types";


export function addZone(payload:IAddZonePayload){
    const formData = new FormData()
    formData.append("data",JSON.stringify(payload.data))
    formData.append("zoneImage",payload.zoneImage)

    return apiClient("/zone",{
        method:"POST",
        body:formData
    })
}