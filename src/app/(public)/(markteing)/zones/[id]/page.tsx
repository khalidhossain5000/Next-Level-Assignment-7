import ZoneDetails from "@/components/modules/zone-details/ZoneDetails";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
    "Power Zone Details",
    "View a power zone's service area, electricity status, and connected substations.",
);

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <section>
            <ZoneDetails id={id} />
        </section>
    );
};

export default page;