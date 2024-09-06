// DashboardPage.js
"use client";

import BillingForm from "@/components/dashboard/billing/billingForm";

export default function DashboardPage() {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">

      <div className="w-full h-full overflow-scroll">
        <BillingForm />
      </div>
    </div>
  );
}
