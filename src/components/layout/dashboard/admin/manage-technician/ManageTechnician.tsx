"use client"

import { useGetAllTechnician } from "@/hooks";



const ManageTechnician = () => {
      const { data: technician, isPending: technicianPending } =
        useGetAllTechnician();
    return (
        <div>
            
        </div>
    );
};

export default ManageTechnician;