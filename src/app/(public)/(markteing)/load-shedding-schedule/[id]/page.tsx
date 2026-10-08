import type LoadSheddingDetails from "@/components/modules/load-shedding/LoadSheddingDetails";
import { createPageMetadata } from "@/lib/seo-metadata";
import AuthGuard from "@/components/auth/auth-guard";

export const metadata = createPageMetadata(
    "Load-Shedding Schedule Details",
    "View the timing, status, and affected area for a load-shedding schedule.",
);

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
  
    return (
        <AuthGuard>
        <section>   
            
            <LoadSheddingDetails id={id} />         
        </section>
         </AuthGuard>
    );
};

export default page;