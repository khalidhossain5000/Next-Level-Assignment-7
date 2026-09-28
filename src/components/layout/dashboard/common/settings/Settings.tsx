"use client"

import { useGetMe, useUpdateUserProfile } from "@/hooks";

const Settings = () => {
    const {data,isPending}=useGetMe()
    const {mutate,isPending:updatting}=useUpdateUserProfile()
    console.log(data,"me data")
    return (
        <div>
            
        </div>
    );
};

export default Settings;