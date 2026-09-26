import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';
import AssignedOutages from '@/components/layout/dashboard/technician/assigned-outages/AssignedOutages';

const AssignedTechnicianPage = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="My Assogmed Outages" description="Track and manage the power outages you have reported."/>
           <div className="py-6">
            <AssignedOutages/>
           </div>
        </section>
    );
};

export default AssignedTechnicianPage;