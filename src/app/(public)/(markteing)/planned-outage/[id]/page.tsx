

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log(id,"details id")
    return (
        <section>   
                  
        </section>
    );
};

export default page;