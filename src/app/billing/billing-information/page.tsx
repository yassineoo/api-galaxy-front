// DashboardPage.js
"use client";

import BillingForm from "@/components/billing/billingForm";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardPage() {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <Sidebar />

      <div className="w-full">
        <Header />
        <BillingForm />
      </div>
    </div>
  );
}
