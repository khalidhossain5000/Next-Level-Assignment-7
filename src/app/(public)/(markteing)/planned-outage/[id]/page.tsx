import PlannedOutageDetails from "@/components/modules/planned-outage/planned-outage-details";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log(id,"details id")
    return (
        <section>   
            <PlannedOutageDetails id={id} />         
        </section>
    );
};

export default page;