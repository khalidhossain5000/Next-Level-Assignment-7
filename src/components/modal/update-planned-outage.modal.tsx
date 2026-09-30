"use client"

import { useGetPlannedOutage, useUpdatePlannedOutage } from "@/hooks";

const UpdatePlannedOutageModal = () => {
    const{data,isPending:plannedOutagePending}=useGetPlannedOutage()
    const {mutate,isPending}=useUpdatePlannedOutage()
    return (
        <div>
            
        </div>
    );
};

export default UpdatePlannedOutageModal;