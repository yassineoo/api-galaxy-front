// pages/billing.js or components/BillingForm.js
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Label } from "recharts";
import { DemoPaymentMethod } from "./paymentForm";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Barchart } from "./barchart";
import RightCircle from "./rightCircle";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const HistoryBody = () => {
  const payments: Payment[] = [
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

  // const [page, setPage] = React.useState("paymentMethode");

  return (
    <div className="flex  w-full flex-col  items-center -z-20 justify-start   min-h-screen bg-gray-100 dark:bg-transparent">
      <div className=" w-full ml-4 mt-4">
        <h1 className="text-xl font-bold">Billing History</h1>
      </div>
      <div className="w-full p-8 flex justify-around items-center">
        <Barchart />
        <RightCircle />
      </div>

      <div className="container  mx-auto py-10">
        <DataTable columns={columns} data={payments} />
      </div>
    </div>
  );
};
export default HistoryBody;
