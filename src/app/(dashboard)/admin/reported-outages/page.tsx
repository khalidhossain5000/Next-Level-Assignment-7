import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";

const AllReportedOutagesPage = () => {
    return (
       <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader
                title="All Reported Outages"
                description="View and manage all power outages reported by customers."
            />

            <div className="mt-6">
             
            </div>
        </section>
    );
};

export default AllReportedOutagesPage;