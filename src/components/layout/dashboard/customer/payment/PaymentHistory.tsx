"use client"

import { useGetPayments } from "@/hooks";

const PaymentHistory = () => {
    const {data,isPending} = useGetPayments()
    console.log(data,"this is paymets data")
    return (
        <div>
            
        </div>
    );
};

export default PaymentHistory;