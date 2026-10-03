import PageHeader from "@/components/layout/shared/page-header/PageHeader";
import LoadSheddingSchedules from "@/components/modules/load-shedding/LoadSheddingSchedule";

const page = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8">
        <PageHeader
          badgeText="PowerPulse Load Management"
          title={
            <>
              Load Shedding <span className="text-primary">Schedule</span>
            </>
          }
         description="Stay informed about load shedding across the network. Check zone-wise schedules, time slots, and the areas affected by supply shortages in one place."
        />

        <div className="mt-8">
         <LoadSheddingSchedules/>
        </div>
      </div>
    </section>
  );
};

export default page;