// DashboardPage.js
"use client";

import Header from "@/components/dashboard/header";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useGetSubscribersForProvider } from "@/hooks/EndpointsPayment/endpoints.queries";
import { useSession } from "next-auth/react";

const TableSubscribers = function () {
  const { data: session, status } = useSession();
  const userId = session?.userId;

  // Use the hook to fetch subscribers for the provider
  const { data: subscribers, isLoading } = useGetSubscribersForProvider(
    userId?.toString() || ""
  );

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
            {isLoading ? (
              <p>Loading subscribers...</p>
            ) : !subscribers || subscribers.length === 0 ? (
              <p>No subscribers found.</p>
            ) : (
              subscribers.map((subscriber: any) => (
                <TableRow key={subscriber.id}>
                  <TableCell>{subscriber.id}</TableCell>
                  <TableCell>{subscriber.name}</TableCell>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>{subscriber.subscriptionDate}</TableCell>
                  <TableCell>{subscriber.status}</TableCell>
                  <TableCell>premium</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full ">
      <Header />

      <TableSubscribers />
    </div>
  );
}
