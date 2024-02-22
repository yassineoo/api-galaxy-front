// DashboardPage.js
"use client";

import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

import HistoryBody from "@/components/dashboard/billing/historyBody";

export default function DashboardPage() {
  return (
    <div className=" flex w-full h-full ">
      <HistoryBody />
    </div>
  );
}
