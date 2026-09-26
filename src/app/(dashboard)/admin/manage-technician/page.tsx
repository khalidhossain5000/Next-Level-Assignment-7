import ManageTechnician from '@/components/layout/dashboard/admin/manage-technician/ManageTechnician';
import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';

const ManageTechnicianPage = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader
                title="Manage Technicians"
                description="View technician profiles, availability, and their assigned outages."
            />

            <div className="mt-6">
            <ManageTechnician/>
            </div>
        </section>
    );
};

export default ManageTechnicianPage;