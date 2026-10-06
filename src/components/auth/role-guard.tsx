"use client"

import { useGetMe } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLoading from "./auth-loading";
import type { TUserRole } from "@/types";
import { buildLoginUrl } from "@/lib/redirect";

interface IProps {
    children: React.ReactNode;
    roles: TUserRole[];
}

const RoleGuard = ({ children, roles }: IProps) => {
    const router = useRouter();
    const { data, isPending, isError } = useGetMe();
    const user = data?.data;
    const pathname=usePathname()
    const isAuthorized = !!user && roles.includes(user.role);

    useEffect(() => {
        if (isPending) return;

      
        if (isError || !user) {
           router.replace(buildLoginUrl(pathname));
            return;
        }

     
        if (!isAuthorized) {
            router.replace("/unauthorized"); 
        }
    }, [isPending, isError, user, isAuthorized, router,pathname]);

    
    if (isPending) return <AuthLoading />;
    if (!isAuthorized) return <AuthLoading />;

    return <>{children}</>;
};

export default RoleGuard;