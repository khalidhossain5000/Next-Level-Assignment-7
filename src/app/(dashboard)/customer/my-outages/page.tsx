import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";
import MyOutages from "@/components/layout/dashboard/customer/outages/MyOutages";

const MyReportedOutagesPage = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="My Outages" description="Track and manage the power outages you have reported."/>
           <div className="py-6">
             <MyOutages />
           </div>
        </section>
    );
};

export default MyReportedOutagesPage;