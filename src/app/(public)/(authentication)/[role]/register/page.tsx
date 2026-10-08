import Logo from "@/assets/svg/Logo";
import RegisterForm from "@/components/form/register-form";
import { type TUserRole, USER_ROLES } from "@/types";
import Image from "next/image";
import { Suspense } from "react";
import { createPageMetadata } from "@/lib/seo-metadata";

import { notFound } from "next/navigation";

interface RegisterPageProps {
    params: Promise<{
        role: string;
    }>;
}

export async function generateMetadata({ params }: RegisterPageProps) {
    const { role } = await params;
    const roleName = role.toLowerCase();
    const formattedRole = roleName.charAt(0).toUpperCase() + roleName.slice(1);

    return createPageMetadata(
        `${formattedRole} Registration`,
        `Create a Power Pulse ${roleName} account to access power schedules and service tools.`,
        { noIndex: true },
    );
}

const RegisterPage = async ({ params }: RegisterPageProps) => {
    const { role } = await params
    if (!USER_ROLES.includes(role as TUserRole)) {
        notFound();
    }
    return (
        <section className="grid min-h-svh bg-background lg:grid-cols-[minmax(440px,0.92fr)_1.08fr]">
            <div className="relative flex min-h-svh flex-col px-6 py-7 sm:px-10 lg:px-14 xl:px-20">
                <div className="flex items-center">
                    <Logo />
                </div>
                <main className="flex flex-1 items-center justify-center py-12">
                    <div className="w-full max-w-md">
                        <div className="mb-8 space-y-2">
                           
                            <h1 className="font-manrope text-3xl font-bold sm:text-4xl">
                                Create your account.
                            </h1>
                            <p className="text-sm leading-6 text-muted-foreground">
                                Get started with power updates tailored to your community.
                            </p>
                        </div>
                        <Suspense fallback={null}>
                            <RegisterForm role={role as TUserRole} />
                        </Suspense>
                    </div>
                </main>
                <p className="text-center text-xs text-muted-foreground lg:text-left">
                    Powering a more informed community.
                </p>
            </div>
            <div className="relative hidden overflow-hidden bg-muted lg:block">
                <Image
                    src="/images/auth/register-img.jpg"
                    alt=""
                    fill
                    priority
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.45] dark:grayscale"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-12 xl:p-16">
                    <p className="max-w-lg font-manrope text-3xl font-semibold leading-tight text-white xl:text-4xl">
                        Stay connected to the power in your community.
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
                        Follow local schedules, outages, and updates from one place.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;