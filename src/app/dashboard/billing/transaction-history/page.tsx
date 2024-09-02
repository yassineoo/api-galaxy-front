// DashboardPage.js
"use client";

import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

import HistoryBody from "@/components/dashboard/billing/historyBody";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useGetCustomerTransactionHistory } from "@/hooks/EndpointsPayment/endpoints.queries";
import { useSession } from "next-auth/react";





const TransactionTable =  function () {
  const { data: session, status } = useSession();
  const userId = session?.userId;

  const transactionData = useGetCustomerTransactionHistory(userId?.toString()||"")

 
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
