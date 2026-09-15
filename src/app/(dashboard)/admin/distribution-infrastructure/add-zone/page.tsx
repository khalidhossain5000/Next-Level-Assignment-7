import AddZoneForm from "@/components/form/add-zone-form";
import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";

const AddZonePage = () => {
  return (
    <section className="space-y-6 p-4 md:p-6">
      <DashboardHeader title="Add Distribution Infrastracture Zone" />

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Zone Information
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details to register a new distribution zone
        </p>

        <div className="mt-6">
          <AddZoneForm />
        </div>
      </div>
    </section>
  );
};

export default AddZonePage;