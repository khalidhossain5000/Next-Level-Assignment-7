import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";
import Settings from "@/components/layout/dashboard/common/settings/Settings";

const page = () => {
    return (
       <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader
                title="Update Your Profile"
                description="Update your professional information, expertise, experience, and other profile details."
            />

            <div className="mt-6">
                <Settings/>
            </div>
        </section>
    );
};

export default page;