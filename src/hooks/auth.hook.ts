import { getMe, googleLogin, registerUser, userLogin, userLogout } from "@/api";
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


export function verifyEmail()

export function useGetMe(){
    return useQuery({
        queryKey:["user"],
        queryFn:getMe,
        retry:false
    })
}