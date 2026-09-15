import AddZoneForm from "@/components/form/add-zone-form";
import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";

const AddZonePage = () => {
  return (
    <section className="space-y-6 p-4 md:p-6">
      <DashboardHeader title="Add Distribution Infrastracture Zone" />

    <div className="mt-6">
          <AddZoneForm />
        </div>
    </section>
  );
};

export default AddZonePage;