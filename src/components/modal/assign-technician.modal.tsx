"use client"

import { useGetAllTechnician } from "@/hooks";

const AssignTechnicianModal = () => {
    const {data:technician,isPending}=useGetAllTechnician()
    return (
        <div>
            
        </div>
    );
};

export default AssignTechnicianModal;