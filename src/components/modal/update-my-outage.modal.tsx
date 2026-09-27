"use client"

import { useGetMyOutages } from "@/hooks";

const UpdateMyOutageModal = () => {
     const { data: myOutages, isPending } = useGetMyOutages();
 console.log(myOutages,'myoutages')
    return (
        <div>
            
        </div>
    );
};

export default UpdateMyOutageModal;