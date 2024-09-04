// DashboardPage.js
"use client";

import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

import HistoryBody from "@/components/dashboard/billing/historyBody";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import { useGetUserTransactionHistory } from "@/hooks/EndpointsPayment/endpoints.queries";
import { useAuthSession } from "@/components/auth-provider";

import { useSession } from "next-auth/react";





const TransactionTable =  function () {

  const {session} = useAuthSession();
  const userId = session?.userId;

  const { data: transactionData , isLoading } = useGetUserTransactionHistory(userId?.toString()||"");
  console.log("userid", userId?.toString());
  console.log("transactionData", transactionData);


 
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View your recent account transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(transactionData) && transactionData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>Client Payment</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className=" bg-dashboardBg dark:bg-transparent flex flex-col w-full ">
      <Header />
      <div className=" w-full ml-4 mt-4 mb-4">
        <BreadcrumbSeparator/>
      </div>
      <TransactionTable />
    </div>
  );
}
