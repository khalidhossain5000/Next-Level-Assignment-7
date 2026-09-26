"use client"

import { useGetPaymentRecords } from "@/hooks";

const PaymentRecords = () => {
    const {data,isPending}=useGetPaymentRecords()
    return (
        <div>
            
        </div>
    );
};

export default PaymentRecords;