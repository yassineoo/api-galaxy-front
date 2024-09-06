// DashboardPage.js

import BillingForm from "@/components/dashboard/billing/billingForm";
import Header from "@/components/dashboard/header";

export default function DashboardPage() {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      {/* <Sidebar activeItem="Billing" /> */}

      <div className="w-full h-full overflow-x-hidden">
        <Header type="provider" />
        <BillingForm />
      </div>
    </div>
  );
}
