import AddSubstationForm from '@/components/form/add-substation-form';
import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';

const AddSubstationPage = () => {
    return (
     <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="Add Distribution Infrastracture Substation" />
            <AddSubstationForm/>
        </section>
    );
};

export default AddSubstationPage;