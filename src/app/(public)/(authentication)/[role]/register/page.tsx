import { type TUserRole, USER_ROLES } from "@/types";
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
        <section>
            <h2>This is register page here</h2>
        </section>
    );
};

export default RegisterPage;