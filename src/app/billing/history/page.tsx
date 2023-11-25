// DashboardPage.js
"use client";

import Header from "@/app/components/dashboard/header";
import Sidebar from "@/app/components/dashboard/sidebar";
import BillingForm from "../../components/billing/billingForm";
import HistoryBody from "@/app/components/billing/historyBody";
import { DataTable } from "@/app/components/billing/data-table";
import { columns } from "@/app/components/billing/columns";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "1",
    amount: 150.0,
    status: "success",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    amount: 200.0,
    status: "pending",
    email: "jane.doe@example.com",
  },
  {
    id: "3",
    amount: 75.5,
    status: "failed",
    email: "alice@example.com",
  },
  {
    id: "4",
    amount: 300.0,
    status: "processing",
    email: "bob@example.com",
  },
  {
    id: "5",
    amount: 450.25,
    status: "success",
    email: "carol@example.com",
  },
  {
    id: "6",
    amount: 450.25,
    status: "success",
    email: "carol@example.com",
  },
  {
    id: "7",
    amount: 450.25,
    status: "success",
    email: "carol@example.com",
  },
  {
    id: "8",
    amount: 450.25,
    status: "success",
    email: "carol@example.com",
  },
  {
    id: "9",
    amount: 450.25,
    status: "success",
    email: "carol@example.com",
  },
  {
    id: "10",
    amount: 450.25,
    status: "success",
    email: "carol@example.com",
  },
  {
    id: "11",
    amount: 450.25,
    status: "success",
    email: "carol@example.com",
  },
  // Add more entries as needed
];

export default function DashboardPage() {
  return (
    <div className=" flex ">
      <Sidebar />

      <div className="w-full">
        <Header />
        <HistoryBody />
        <div className="container  mx-auto py-10">
          <DataTable columns={columns} data={payments} />
        </div>
      </div>
    </div>
  );
}
