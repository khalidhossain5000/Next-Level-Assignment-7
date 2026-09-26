import ManageUsers from "@/components/layout/dashboard/admin/manage-users/ManageUsers";
import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";

const AdminManageUser = () => {
    return (
           <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="My Outages" description="Track and manage the power outages you have reported."/>
           <div className="py-6">
             <ManageUsers />
           </div>
        </section>
    );
};

export default AdminManageUser;