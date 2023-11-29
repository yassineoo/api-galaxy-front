// DashboardPage.js
"use client";

import Header from "@/app/components/dashboard/header";
import Sidebar from "@/app/components/dashboard/sidebar";

import HistoryBody from "@/app/components/billing/historyBody";

export default function DashboardPage() {
  return (
    <div className=" flex ">
      <Sidebar />

      <div className="w-full">
        <Header />
        <HistoryBody />
      </div>
    </div>
  );
}
