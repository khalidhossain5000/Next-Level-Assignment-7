
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <section>            
        </section>
    );
};

export default page;