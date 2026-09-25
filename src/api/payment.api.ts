import apiClient from "@/lib/apiClient";

export function makePayment(outageReportId:string){
    return apiClient("/payment/create",{
        method:"POST",
        body:{outageReportId}
    })
}


export function getPayments(){
    return apiClient("/payment")
}