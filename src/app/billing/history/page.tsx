// DashboardPage.js
"use client";

import Header from "@/app/components/dashboard/header";
import Sidebar from "@/app/components/dashboard/sidebar";
import BillingForm from "../../components/billing/billingForm";
import HistoryBody from "@/app/components/billing/historyBody";

export default function DashboardPage() {
  return (
    <div className="bg-dashboardBg flex ">
      <Sidebar />

      <div className="w-full">
        <Header />
        <HistoryBody />
      </div>
    </div>
  );
}
