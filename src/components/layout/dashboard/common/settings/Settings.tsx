"use client"


import { useGetMe, useUpdateUserProfile } from "@/hooks";

const Settings = () => {
    const {data,isPending}=useGetMe()

    const {mutate,isPending:isUpdating}=useUpdateUserProfile()

    console.log(data,"get me all data is here data")
    return (
        <div>
            
        </div>
    );
};

export default Settings;