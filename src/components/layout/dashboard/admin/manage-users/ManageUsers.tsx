"use client"

import { useGetAllUsers } from "@/hooks";


const ManageUsers = () => {
    const {data:users,isPending} = useGetAllUsers()

    console.log(users,'all users data')
    return (
        <div>
            
        </div>
    );
};

export default ManageUsers;