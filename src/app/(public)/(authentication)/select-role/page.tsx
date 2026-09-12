import Link from "next/link";
import { HiOutlineWrenchScrewdriver, HiOutlineUserGroup, HiOutlineArrowRight } from "react-icons/hi2";

const roleOptions = [
    {
        id: "1",
        title: "Register as a Customer",
        description: "Post your problem, compare offers, and hire a verified technician near you.",
        cta: "Continue as Customer",
        icon: HiOutlineUserGroup,
        href: "/CUSTOMER/register",
    },
    {
        id: "2",
        title: "Register as a Technician",
        description: "Create your professional profile, get verified, and start receiving job requests.",
        cta: "Continue as Technician",
        icon: HiOutlineWrenchScrewdriver,
        href: "/TECHNICIAN/register",
    },
];

const SelectUserRolePage = () => {
    return (
        <section className="min-h-svh flex items-center justify-center bg-background px-4 sm:px-6 py-12">
            <div className="w-full max-w-4xl">
                {/* title */}
                <div className="text-center mb-10 lg:mb-14">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary font-inter mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Get started in seconds
                    </span>

                    <h1 className="font-manrope text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                        <span className="text-foreground">Join us as the </span>
                        <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                            right fit
                        </span>
                        <span className="text-foreground"> for you</span>
                    </h1>

                    <p className="mt-3 text-sm lg:text-base text-muted-foreground font-inter max-w-md mx-auto">
                        Select how you want to use the platform. You can create your account in the next step.
                    </p>
                </div>

                {/* role cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                    {roleOptions.map((role) => {
                        const Icon = role.icon;
                        return (
                            <Link
                                key={role.id}
                                href={role.href}
                                className="group relative flex flex-col items-start rounded-3xl border border-border bg-card p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                            >
                                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary transition-colors duration-300">
                                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                                </div>

                                <h3 className="mt-5 text-base lg:text-lg font-semibold text-card-foreground font-inter">
                                    {role.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground font-inter leading-relaxed">
                                    {role.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                                    <span>{role.cta}</span>
                                    <HiOutlineArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SelectUserRolePage;