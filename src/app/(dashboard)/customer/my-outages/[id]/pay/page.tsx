import DashboardHeader from "@/components/layout/dashboard/common/DashboardHeader/DashboardHeader";
import MakePayment from "@/components/layout/dashboard/customer/payment/MakePayment";

interface PriorityOutagePaymentPageProps {
  params: Promise<{ id: string }>;
}

const PriorityOutagePaymentPage = async ({
  params,
}: PriorityOutagePaymentPageProps) => {
  const { id } = await params;


  return (
    <section>
      <DashboardHeader
        title="Priority Restoration Payment"
        description="Complete the one-time priority fee to move your outage report higher in the restoration queue."
      />
      <div>
        <MakePayment outageReportId={id}/>
      </div>
    </section>
  );
};

export default PriorityOutagePaymentPage;