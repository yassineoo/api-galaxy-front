"use client";
import { SkeletonTable } from "@/components/admin/apis/apis/apiSkeleton";
import { CollectionTable } from "@/components/admin/apis/collections/collections-table";
import { CollectionColumns } from "@/components/admin/apis/collections/collectionsColumns";
import CreateEndpointsCollectionForm from "@/components/admin/apis/collections/endpointGroupCreateModal";
import { ApiTable } from "@/components/dashboard/apiTable/api-table";
import { columns } from "@/components/dashboard/apiTable/apiColumns";
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
import { useApiList } from "@/hooks/apis/api.queries";
import { useState } from "react";

// import { useSession } from "next-auth/react";
import { useAuthSession } from "@/components/auth-provider";
import Header from "@/components/dashboard/headerAdmin";

export default function DefinitionTab() {
  const [page, setPage] = useState(1);
  const { session, isAuthenticated } = useAuthSession();

  const ApiList = useApiList(
    {
      page,
      limit: 8,
      search: "",
      filter: 0,
    },
    session?.userId ?? 1,
    session?.token ?? "",
    0
  );

  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full h-full overflow-scroll ">
      <div className="flex justify-start items-start gap-4 w-full ">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-start gap-4">
              <Image src="/icons/add-api.svg" alt="" width={20} height={20} />
              <CardTitle className="text-2xl">Apis</CardTitle>
            </div>
            <CardDescription>Manage the Apis</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Search value="" setValue={() => {}} />

            <Tabs defaultValue="Apis">
              <TabsList className="w-[200px] border-none bg-transparent">
                <TabsTrigger value="Apis">Apis</TabsTrigger>
              </TabsList>
              <TabsContent value="Apis">
                {ApiList.isLoading && (
                  <SkeletonTable name={"Api List"} columns={columns} />
                )}
                {ApiList.isSuccess && (
                  <ApiTable columns={columns} data={ApiList.data} />
                )}
                {ApiList.isError && (
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
                  totalPages={ApiList?.data?.meta?.totalPages}
                  onPageChange={setPage}
                />
              </TabsContent>
              <TabsContent value="Collection">
                <PaginationManual
                  currentPage={page}
                  totalPages={ApiList?.data?.meta?.totalPages}
                  onPageChange={setPage}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
