"use client"

import { useGetTechnicianAnalytics } from "@/hooks";

const TechnicianAnalyticsReport = () => {
      const { data, isPending } = useGetTechnicianAnalytics() 
    return (
        <div>
            
        </div>
    );
};

export default TechnicianAnalyticsReport;