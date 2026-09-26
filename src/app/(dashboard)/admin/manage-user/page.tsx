import ManageUsers from "@/components/layout/dashboard/admin/manage-users/ManageUsers";
import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";

const AdminManageUser = () => {
    return (
           <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="Manage Users" description="View, search, and manage all registered user accounts."/>
           <div className="py-6">
             <ManageUsers />
           </div>
        </section>
    );
};

export default AdminManageUser;