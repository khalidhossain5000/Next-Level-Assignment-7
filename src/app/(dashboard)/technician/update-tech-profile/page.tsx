import UpdateTechnicianProfileForm from '@/components/form/update-tech-profile-form';
import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';
import MyTechProfileDetails from '@/components/layout/dashboard/technician/my-tech-profile-details/MyTechProfileDetails';


const page = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader
                title="Update Technician Profile"
                description="Update your professional information, expertise, experience, and other profile details."
            />

            <div className="mt-6">
                <MyTechProfileDetails/>
            </div>
        </section>
    );
};

export default page;