"use client"

import { useGetMe } from "@/hooks";

const AuthGuard = ({children}:{children: React.ReactNode}) => {
    const {data,isPending} = useGetMe()
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthGuard;