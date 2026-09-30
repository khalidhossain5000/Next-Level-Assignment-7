"use client"
import { useUpdatePlannedOutage } from '@/hooks';

const UpdatePlannedOutageModal = () => {
      const { mutate: updatePlannedOutage, isPending: updatePending } =
    useUpdatePlannedOutage();
    return (
        <div>
            
        </div>
    );
};

export default UpdatePlannedOutageModal;