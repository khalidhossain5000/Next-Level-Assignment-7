import Logo from "@/assets/svg/Logo";
import VerifyAccountForm from "@/components/form/verify-account-form";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
    "Verify Your Account",
    "Verify your Power Pulse account to complete registration.",
    { noIndex: true },
);

const VerifyAccountPage = async ({ searchParams }: { searchParams: Promise<{ email: string }> }) => {
    const { email } = await searchParams;

    return (
        <section className="min-h-dvh flex items-center justify-center bg-background px-4 sm:px-6 py-12">
            <div className="w-full max-w-xl mx-auto">
                {/* logo */}
                <div className="flex justify-center mb-8">
                    <Logo />
                </div>

                {/* card */}
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                    {/* heading */}
                    <div className="flex flex-col items-center gap-2 text-center mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-1">
                            <HiOutlineEnvelope className="w-6 h-6 text-primary" />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight font-manrope text-card-foreground">
                            Verify your account
                        </h1>
                        <p className="text-balance text-sm text-muted-foreground font-inter">
                            We&apos;ve sent a verification code to{" "}
                            <span className="font-medium text-foreground">{email}</span>
                        </p>
                    </div>

                    {/* form */}
                    <VerifyAccountForm email={email}/>
                </div>
            </div>
        </section>
    );
};

export default VerifyAccountPage;