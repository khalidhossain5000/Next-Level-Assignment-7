import AuthGuard from "@/components/auth/auth-guard";
import PlannedOutageDetails from "@/components/modules/planned-outage/planned-outage-details";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
    "Planned Outage Details",
    "View the timing, reason, and affected area for a planned power outage.",
);

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log(id,"details id")
    return (
        <AuthGuard>
        <section>   
            <PlannedOutageDetails id={id} />         
        </section>
        </AuthGuard>
    );
};

export default page;