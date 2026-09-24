import AddFeederForm from "@/components/form/add-feeder-form";
import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";

const AddFeederPage = () => {
    return (
         <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="Add Distribution Infrastracture Feeder" />

            <div className="mt-6">
                <AddFeederForm />
            </div>
        </section>
    );
};

export default AddFeederPage;