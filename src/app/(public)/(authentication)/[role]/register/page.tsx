import Logo from "@/assets/svg/Logo";
import RegisterForm from "@/components/form/register-form";
import { type TUserRole, USER_ROLES } from "@/types";
import Image from "next/image";

import { notFound } from "next/navigation";

interface RegisterPageProps {
    params: Promise<{
        role: string;
    }>;
}

const RegisterPage = async ({ params }: RegisterPageProps) => {
    const { role } = await params
    if (!USER_ROLES.includes(role as TUserRole)) {
        notFound();
    }
    return (
        <section className="grid min-h-svh lg:grid-cols-2 bg-accent">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="">
                    <Logo />
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        
                        <RegisterForm role={role as TUserRole}/>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src="/images/auth/register-img.jpg"
                    alt="Image"
                    fill
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </section> 
    );
};

export default RegisterPage;