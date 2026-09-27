import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';
import UpdateTechProfile from '@/components/layout/dashboard/technician/update-technician-profile/UpdateTechProfile';

const page = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader
                title="Update Technician Profile"
                description="Update your professional information, expertise, experience, and other profile details."
            />

            <div className="mt-6">
                <UpdateTechProfile/>
            </div>
        </section>
    );
};

export default page;