"use client"

import { useGetPaymentRecords } from "@/hooks";

const PaymentRecords = () => {
    const {data,isPending}=useGetPaymentRecords()
    console.log(data,"data paymetnercords")
    return (
        <div>
            
        </div>
    );
};

export default PaymentRecords;