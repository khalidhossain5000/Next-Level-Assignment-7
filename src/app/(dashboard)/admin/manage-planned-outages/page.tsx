import ManagePlannedOutage from '@/components/layout/dashboard/admin/manage-planned-outage/ManagePlannedOutage';
import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';

const ManagePlannedOutagePage = () => {
    return (
       <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="Manage Planned Outages" description="Schedule, view, and manage upcoming planned maintenance outages."/>
           <div className="py-6">
          <ManagePlannedOutage/>
           </div>
        </section>
    );
};

export default ManagePlannedOutagePage;