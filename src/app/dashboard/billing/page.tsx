// DashboardPage.js
"use client";

import BillingForm from "@/components/dashboard/billing/billingForm";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardPage() {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <Sidebar activeItem="Billing" />

      <div className="w-full h-full overflow-scroll">
        <Header />
        <BillingForm />
      </div>
    </div>
  );
}