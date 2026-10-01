"use client"

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import AuthLoading from "./auth-loading";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { data, isPending, isError } = useGetMe()
    const user = data?.data ?? []
    const router = useRouter()
    console.log(data, 'user data')
    useEffect(() => {
        if (isPending) {
            return
        }
        if (isError || !user) {
            router.replace('/login')
        }
    }, [isError, user, router, isPending])

    if (isPending) return <AuthLoading />

    return (
        <div>
            {children}
        </div>
    );
};

export default AuthGuard;