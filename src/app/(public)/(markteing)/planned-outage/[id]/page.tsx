import AuthGuard from "@/components/auth/auth-guard";
import PlannedOutageDetails from "@/components/modules/planned-outage/planned-outage-details";

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