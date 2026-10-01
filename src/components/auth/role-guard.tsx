"use client"

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLoading from "./auth-loading";

const RoleGuard = () => {
    const router = useRouter()
    const { data, isPending, isError } = useGetMe()
    const user = data?.data ?? []
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

        </div>
    );
};

export default RoleGuard;