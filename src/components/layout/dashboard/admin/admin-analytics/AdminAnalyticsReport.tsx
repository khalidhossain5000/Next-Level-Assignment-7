"use client"

import { useGetCustomerAnalytics } from "@/hooks";

const AdminAnalyticsReport = () => {
    const { data, isPending } = useGetCustomerAnalytics()
    return (
        <div>
            
        </div>
    );
};

export default AdminAnalyticsReport;