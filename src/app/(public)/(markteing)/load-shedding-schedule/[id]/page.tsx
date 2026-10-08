import LoadSheddingDetails from "@/components/modules/load-shedding/LoadSheddingDetails";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
    "Load-Shedding Schedule Details",
    "View the timing, status, and affected area for a load-shedding schedule.",
);

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log(id,"details id")
    return (
        <section>   
            <LoadSheddingDetails id={id} />         
        </section>
    );
};

export default page;