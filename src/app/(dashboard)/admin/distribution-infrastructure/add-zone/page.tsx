import AddZoneForm from "@/components/form/add-zone-form";
import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";

const AddZonePage = () => {
    return (
        <section>
            <DashboardHeader title  = "Add Distribution Infrastracture Zone"/>
            <AddZoneForm/>
        </section>
    );
};

export default AddZonePage;