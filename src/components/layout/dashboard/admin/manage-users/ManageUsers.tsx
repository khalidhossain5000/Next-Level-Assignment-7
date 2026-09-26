"use client"

import { useGetAllUsers } from "@/hooks";


const ManageUsers = () => {
    const {data:users,isPending} = useGetAllUsers()
    return (
        <div>
            
        </div>
    );
};

export default ManageUsers;