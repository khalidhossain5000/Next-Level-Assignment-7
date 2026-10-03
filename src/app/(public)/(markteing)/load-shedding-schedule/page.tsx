import PageHeader from "@/components/layout/shared/page-header/PageHeader";

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
          description="Stay informed about planned power outages across the network. Check upcoming load shedding times, affected zones, and expected restoration details in one place."
        />

        <div className="mt-8">
         
        </div>
      </div>
    </section>
  );
};

export default page;