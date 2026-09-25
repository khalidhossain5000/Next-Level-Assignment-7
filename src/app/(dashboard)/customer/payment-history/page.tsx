import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';
import PaymentHistory from '@/components/layout/dashboard/customer/payment/PaymentHistory';
import React from 'react';

const PaymentHistoryPage = () => {
    return (
       <section className="space-y-6 p-4 md:p-6">
                  <DashboardHeader title="Payment History" description="View and manage your past transactions and payment records."/>
                 <div className="py-6">
                <PaymentHistory/>
                 </div>
              </section>
    );
};

export default PaymentHistoryPage;