"use client"

import { useGetMyOutages } from "@/hooks";

const UpdateMyOutageForm = () => {
 const { data: myOutages, isPending } = useGetMyOutages();
 console.log(myOutages,'myoutages')
    return (
        <div>
            
        </div>
    );
};

export default UpdateMyOutageForm;