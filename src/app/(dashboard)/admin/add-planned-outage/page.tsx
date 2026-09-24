import PlannedOutageForm from '@/components/form/add-planned-outage-form';
import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';


const AddPlannedOutagePage = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="Add Planned Outage" />

            <div className="mt-6">
                <PlannedOutageForm />
            </div>
        </section>
    );
};

export default AddPlannedOutagePage;