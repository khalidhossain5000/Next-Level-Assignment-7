import PageHeader from "@/components/layout/shared/page-header/PageHeader";

import PlannedOutages from "@/components/modules/planned-outage/PlannedOutages";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
  "Planned Outages",
  "Review scheduled maintenance, affected areas, outage reasons, and expected restoration times.",
);

const page = () => {
  return (
    
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8">
        <PageHeader
          badgeText="PowerPulse Maintenance Updates"
          title={
            <>
              Planned <span className="text-primary">Outages</span>
            </>
          }
          description="Track scheduled maintenance and upgrade work across the network. Check affected areas, outage reasons, and expected start and restoration times in advance."
        />

        <div className="mt-8">
          <PlannedOutages />
        </div>
      </div>
    </section>
  );
};

export default page;
