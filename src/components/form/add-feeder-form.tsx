"use client"

import { useGetSubstation } from "@/hooks";

const AddFeederForm = () => {
    const {data:substationData,isPending}=useGetSubstation()
    console.log(substationData,'data');
    return (
        <div>
            
        </div>
    );
};

export default AddFeederForm;