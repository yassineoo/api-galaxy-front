// DashboardPage.js
"use client";

import BillingForm from "@/components/dashboard/billing/billingForm";
import { BreadcrumbWithCustomSeparator } from "@/components/dashboard/breadcrumb";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

const TableSubscribers = function () {
  const subscribers = [
    {
      id: 1001,
      name: "John Doe",
      email: "john@example.com",
      subscriptionDate: "2022-03-15",
      status: "Active"
    },
    {
      id: 1002,
      name: "Jane Smith",
      email: "jane@example.com",
      subscriptionDate: "2021-08-22",
      status: "Inactive"
    },
    {
      id: 1003,
      name: "Michael Johnson",
      email: "michael@example.com",
      subscriptionDate: "2023-01-01",
      status: "Active"
    },
    {
      id: 1004,
      name: "Emily Davis",
      email: "emily@example.com",
      subscriptionDate: "2022-11-30",
      status: "Canceled"
    },
    {
      id: 1005,
      name: "David Wilson",
      email: "david@example.com",
      subscriptionDate: "2023-04-10",
      status: "Active"
    }
  ];

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>API Subscribers</CardTitle>
        <CardDescription>List of all API subscribers.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subscriber ID</TableHead>
              <TableHead>Subscriber Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Subscription Date</TableHead>
              <TableHead>Subscription Status</TableHead>
              <TableHead>Subscription Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.id}</TableCell>
                <TableCell>{subscriber.name}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{subscriber.subscriptionDate}</TableCell>
                <TableCell>{subscriber.status}</TableCell>
                <TableCell>premium </TableCell>

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
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full ">
      <Header />
      <div className=" w-full ml-4 mt-4 mb-4">
        <BreadcrumbWithCustomSeparator/>
      </div>
      <TableSubscribers />
    </div>
  );
}
