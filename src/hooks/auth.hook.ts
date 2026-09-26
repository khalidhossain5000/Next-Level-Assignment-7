import { approveTechnicanProfile, getAllTechnician, getMe, googleLogin, registerUser, resendOtp, userLogin, userLogout, verifyUserEmail } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin(){
    return useMutation({
        mutationFn:userLogin
    })
}


export function useGoogleLogin(){
    return useMutation({
        mutationFn:googleLogin
    })
}



export function useRegisterUser(){
    return useMutation({
        mutationFn:registerUser
    })
}


export function useLogout(){
    return useMutation({
        mutationFn:userLogout
    })
}


export function useVerifyEmail(){
    return useMutation({
        mutationFn:verifyUserEmail
    })
}


export function useResendOtp(){
    return useMutation({
        mutationFn:resendOtp
    })
}



export function useGetMe(){
    return useQuery({
        queryKey:["user"],
        queryFn:getMe,
        retry:false
    })
}


export function useGetAllTechnician(){
      return useQuery({
        queryKey:["technican"],
        queryFn:getAllTechnician,
        retry:false
    })
}



export function useApproveTechnician(){
    return useMutation({
        mutationFn:approveTechnicanProfile
    })
}



