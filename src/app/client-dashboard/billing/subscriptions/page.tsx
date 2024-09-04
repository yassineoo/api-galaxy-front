"use client";

import { useAuthSession } from "@/components/auth-provider";
import BillingForm from "@/components/dashboard/billing/billingForm";
import { BreadcrumbWithCustomSeparator } from "@/components/dashboard/breadcrumb";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useGetUserSubscriptions } from "@/hooks/EndpointsPayment/endpoints.queries";

const TableSubscriptions = function () {
  const {session} = useAuthSession();
  const userId = session?.userId;

  console.log("the userId is: ", userId?.toString());
  // Use the hook to fetch subscriptions for the user (client)
  const { data: subscriptions, isLoading } = useGetUserSubscriptions(userId?.toString() || "");
  console.log("subscriptions", subscriptions);


  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>User Subscriptions</CardTitle>
        <CardDescription>List of all subscriptions for the user.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subscription ID</TableHead>
              <TableHead>Plan Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading subscriptions...</TableCell>
              </TableRow>
            ) : !subscriptions || subscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No subscriptions found.</TableCell>
              </TableRow>
            ) : (
              subscriptions.map((subscription: any) => (
                <TableRow key={subscription.id}>
                  <TableCell>{subscription.id}</TableCell>
                  <TableCell>{subscription.planName}</TableCell>
                  <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{subscription.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full ">
      <div className=" w-full ml-4 mt-4 mb-4">
        <BreadcrumbWithCustomSeparator />
      </div>
      <TableSubscriptions />
    </div>
  );
}
