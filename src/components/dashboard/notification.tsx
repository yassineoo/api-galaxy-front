"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useAuthSession } from "../auth-provider";
import { useNotifList } from "@/hooks/admin/reviews.query";
import React from "react";
import { formatDistanceToNow } from "date-fns";

export default function Notifications() {
  const { session } = useAuthSession();
  const { data, error, isLoading, isSuccess, refetch } = useNotifList(
    Number(session?.userId) || 1,
    session?.token || ""
  );
  console.log("data", data);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <BellIcon className="size-6" />
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[360px] p-0 z-50">
        <Card className="shadow-lg border-0">
          <CardHeader className="border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <CardTitle>Notifications</CardTitle>
              <Button onClick={handleRefresh} variant="ghost" size="icon">
                <CalendarCheckIcon className="h-4 w-4" />
                <span className="sr-only">Refresh notifications</span>
              </Button>
            </div>
            {isLoading ? (
              <CardDescription>Loading notifications...</CardDescription>
            ) : error ? (
              <CardDescription>Error loading notifications</CardDescription>
            ) : (
              <CardDescription>
                {data?.length > 0
                  ? `You have ${data.length} new notifications`
                  : "No new notifications"}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="py-4">
            {isSuccess && data?.length > 0 ? (
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {data.map((notification: any) => (
                  <div key={notification.id} className="flex items-start gap-4">
                    <div className="flex p-2  items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <BellIcon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {/* Display the dynamic time difference */}
                        {formatDistanceToNow(
                          new Date(notification.created_at),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground w-full h-10 grid place-content-center">
                No Notifications
              </p>
            )}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CalendarCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function TruckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}
