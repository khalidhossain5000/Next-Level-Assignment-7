import LoadSheddingDetails from "@/components/modules/load-shedding/LoadSheddingDetails";

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