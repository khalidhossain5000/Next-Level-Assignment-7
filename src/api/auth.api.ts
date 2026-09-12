import apiClient from "@/lib/apiClient";
import type { ILoginPayload } from "@/types";

export function userLogin(payload:ILoginPayload){
    
    return apiClient("/auth/login",{
        method:"POST",
        body:payload
    })
}

export function googleLogin(payload: { idToken: string }){
    return apiClient("/auth/google-login",{
        method:"POST",
        body:payload
    })
}

export function getMe(){
    return apiClient("/auth/get-me")
}