import ReportOutageForm from '@/components/form/report-outage-form';
import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';


const ReportOutage = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="Add Planned Outage" />

            <div className="mt-6">
                <ReportOutageForm />
            </div>
        </section>
    );
};

export default ReportOutage;