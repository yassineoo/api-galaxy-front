// DashboardPage.js
"use client";

import BillingForm from "@/app/components/billing/billingForm";
import Header from "@/app/components/dashboard/header";
import Sidebar from "@/app/components/dashboard/sidebar";

export default function DashboardPage() {
  return (
    <div className="bg-dashboardBg flex ">
      <Sidebar />

      <div className="w-full">
        <Header />
        <BillingForm />
      </div>
    </div>
  );
}
