// DashboardPage.js
"use client";

import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

import HistoryBody from "@/components/dashboard/billing/historyBody";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const TransactionTable =  function () {
  const transactionData = [
    { id: 'TXN-001', date: '2023-05-12 12:34', amount: '$125.00' },
    { id: 'TXN-002', date: '2023-05-10 09:45', amount: '$49.99' },
    { id: 'TXN-003', date: '2023-05-08 16:22', amount: '$75.00' },
    { id: 'TXN-004', date: '2023-05-05 11:08', amount: '$29.95' },
    { id: 'TXN-005', date: '2023-05-02 18:30', amount: '$250.00' },
  ];

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
            {transactionData.map((transaction) => (
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
