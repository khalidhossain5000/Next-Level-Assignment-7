"use client"

import { useGetMe } from "@/hooks";

const MyTechProfileDetails = () => {
    const { data, isPending } = useGetMe()
    console.log(data, "me data")
    return (
        <div>

        </div>
    );
};

export default MyTechProfileDetails;