import AddAreaForm from "@/components/form/add-area-form";
import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";

const AddAreaPage = () => {
    return (
         <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader title="Add Distribution Infrastracture Area" />

            <div className="mt-6">
                <AddAreaForm />
            </div>
        </section>
    );
};

export default AddAreaPage;