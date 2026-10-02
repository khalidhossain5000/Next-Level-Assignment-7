import PageHeader from "@/components/layout/shared/page-header/PageHeader";
import AllZones from "@/components/modules/all-zones-page/AllZones";


const Page = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8">
        <PageHeader
          badgeText="PowerPulse Infrastructure"
          title={
            <>
              Explore <span className="text-primary">Power Zones</span>
            </>
          }
          description="Discover power zones across the network and stay updated on their electricity status, service areas, and available power information."
        />

        <div className="mt-8">
          <AllZones />
        </div>
      </div>
    </section>
  );
};

export default Page;
