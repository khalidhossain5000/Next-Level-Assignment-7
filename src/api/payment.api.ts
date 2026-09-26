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




export function getPaymentDetails(id:string){
    return apiClient(`/payment/${id}`)
}


//get all payment record for admin

export function getAllPaymentRecords(){
    return apiClient("/admin/payment-record")
}