import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';

const page = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader
                title="Technician Dashboard Overview"
                description="Track your spending patterns and account activity at a glance."
                showDateTime
            />
            <div className="py-4">

            </div>
        </section>
    );
};

export default page;