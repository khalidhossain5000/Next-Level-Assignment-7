//get customer analytics

import apiClient from "@/lib/apiClient";


export function getCustomerAnalytics(){
    return apiClient("/analytics/customer-analytics")
}