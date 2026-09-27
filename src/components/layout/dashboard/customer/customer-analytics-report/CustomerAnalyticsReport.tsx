"use client"

import { useGetCustomerAnalytics } from "@/hooks";

const CustomerAnalyticsReport = () => {
    const {data,isPending}=useGetCustomerAnalytics()
    console.log(data,"customer analytics")
    return (
        <div>
            
        </div>
    );
};

export default CustomerAnalyticsReport;