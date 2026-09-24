import AddLoadSheddingScheduleForm from '@/components/form/add-load-shedding-form';
import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';

const AddLoadsheddingschedulePage = () => {
    return (
       <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="Add Load Shedding Schdeule" />

            <div className="mt-6">
             <AddLoadSheddingScheduleForm/>
            </div>
        </section>
    );
};

export default AddLoadsheddingschedulePage;