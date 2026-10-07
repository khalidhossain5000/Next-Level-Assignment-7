"use client"

import { useGetMe } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import AuthLoading from "./auth-loading";
import { buildLoginUrl } from "@/lib/redirect";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { data, isPending, isError } = useGetMe()
    const user = data?.data
    const router = useRouter()
    const pathname = usePathname();
  
    
    useEffect(() => {
        if (isPending) {
            return
        }
        if (isError || !user) {
            router.replace(buildLoginUrl(pathname))
        }
    }, [isError, user, router, isPending,pathname])

    if (isPending || !user) return <AuthLoading />

    return (
        <div>
            {children}
        </div>
    );
};

export default AuthGuard;