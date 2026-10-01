"use client"

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

const AuthGuard = ({children}:{children: React.ReactNode}) => {
    const {data,isPending,isError} = useGetMe()
    const user=data?.data ?? []
    const router=useRouter()
    console.log(data,'user data')
    useEffect(()=>{
        if(isError || !user){
            router.replace('/login')
        }
    },[isError,user,router])
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthGuard;