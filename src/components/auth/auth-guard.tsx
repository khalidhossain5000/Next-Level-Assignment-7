"use client"

import { useGetMe } from "@/hooks";

const AuthGuard = () => {
    const {data,isPending} = useGetMe()
    return (
        <div>
            
        </div>
    );
};

export default AuthGuard;