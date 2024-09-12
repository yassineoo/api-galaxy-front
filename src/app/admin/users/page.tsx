"use client";
import { SkeletonTable } from "@/components/admin/apis/apis/apiSkeleton";
import CreateEndpointsCollectionForm from "@/components/admin/apis/collections/endpointGroupCreateModal";
import PaginationManual from "@/components/dashboard/billing/paginationManual";
import Image from "next/image";
import { Search } from "@/components/shared/search";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCollectionList } from "@/hooks/Endpoint collections/EndpointsCollection.queries";
import { useState } from "react";

// import { useSession } from "next-auth/react";
import { useAuthSession } from "@/components/auth-provider";
import { useUsersList } from "@/hooks/admin/reviews.query";
import { UserTable } from "@/components/dashboard/usersTable/user-table";
import { userColumn } from "@/components/dashboard/usersTable/user-col";

export default function DefinitionTab() {
  const [page, setPage] = useState(1);
  const adminId = 1;
  const { session, isAuthenticated } = useAuthSession();
  const UsersList = useUsersList(
    { page, limit: 8, search: "", adminId },
    session?.token ?? ""
  );

  console.log("UsersList", UsersList.data);

  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full h-full overflow-scroll ">
      <div className="flex justify-start items-start gap-4 w-full ">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-start gap-4">
              <Image src="/icons/add-api.svg" alt="" width={20} height={20} />
              <CardTitle className="text-2xl">Users</CardTitle>
            </div>
            <CardDescription>Manage the Users</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Search value="" setValue={() => {}} />

            <Tabs defaultValue="Apis">
              <TabsContent value="Apis">
                {UsersList.isLoading && (
                  <SkeletonTable name={"Api List"} columns={userColumn} />
                )}
                {UsersList.isSuccess && (
                  <UserTable columns={userColumn} data={UsersList.data} />
                )}
                {UsersList.isError && (
                  <div className="flex flex-col items-center justify-center p-5">
                    <Image
                      src="/error.jpg"
                      alt="Error"
                      width={150}
                      height={150}
                    />
                    <p className="text-red-500 text-sm mt-2">
                      Please try again later.
                    </p>
                  </div>
                )}

                <PaginationManual
                  currentPage={page}
                  totalPages={UsersList?.data?.meta?.totalPages}
                  onPageChange={setPage}
                />
              </TabsContent>
              <TabsContent value="Collection"></TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
