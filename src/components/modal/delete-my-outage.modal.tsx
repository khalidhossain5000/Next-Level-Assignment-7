"use client"

import { useDeleteMyOutage } from "@/hooks";

const DeleteMyOutageConfirmModal = () => {
    const {mutate,isPending}=useDeleteMyOutage()
    return (
        <div>
            
        </div>
    );
};

export default DeleteMyOutageConfirmModal;