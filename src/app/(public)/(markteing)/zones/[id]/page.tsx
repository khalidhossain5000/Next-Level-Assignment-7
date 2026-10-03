import ZoneDetails from "@/components/modules/zone-details/ZoneDetails";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <section>
            <ZoneDetails id={id} />
        </section>
    );
};

export default page;