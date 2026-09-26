import ManageLoadShedding from '@/components/layout/dashboard/admin/manage-load-shedding/ManageLoadShedding';
import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';

const ManageLoadSheddingPage = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="Manage Load Shedding" description="Schedule, view, and manage load shedding across feeders and areas." />
            <div className="py-6">
                <ManageLoadShedding />
            </div>
        </section>
    );
};

export default ManageLoadSheddingPage;