"use client";
import { SkeletonTable } from "@/components/admin/apis/apis/apiSkeleton";
import { CollectionTable } from "@/components/admin/apis/collections/collections-table";
import { CollectionColumns } from "@/components/admin/apis/collections/collectionsColumns";
import CreateEndpointsCollectionForm from "@/components/admin/apis/collections/endpointGroupCreateModal";
import { ApiTable } from "@/components/dashboard/apiTable/api-table";
import { columns } from "@/components/dashboard/apiTable/apiColumns";
import PaginationManual from "@/components/dashboard/billing/paginationManual";
import Image from "next/image";
import Header from "@/components/dashboard/header";
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
import { useApiListForAdmin } from "@/hooks/apis/api.queries";
import { useState } from "react";
// import { useSession } from "next-auth/react";
import { useAuthSession } from "@/components/auth-provider";

export default function DefinitionTab() {
  const [page, setPage] = useState(1);
  const adminId = 1;
  const ApiList = useApiListForAdmin({ page, limit: 8, search: "", adminId });
  const {session,isAuthenticated} = useAuthSession()
  const CollectionList = useCollectionList({ authToken: session?.token ?? "" });
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full h-full overflow-scroll ">
      <Header />

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
            <Search />
            <div className="flex gap-4 justify-end items-center">
              <CreateEndpointsCollectionForm />
            </div>

            <Tabs defaultValue="Apis">
              <TabsList className="w-[200px] border-none bg-transparent">
                <TabsTrigger value="Apis">Apis</TabsTrigger>
                <TabsTrigger value="Collection">Collection</TabsTrigger>
              </TabsList>
              <TabsContent value="Apis">
                {ApiList.isLoading && (
                  <SkeletonTable name={"Api List"} columns={columns} />
                )}
                {ApiList.isSuccess && (
                  <ApiTable columns={columns} data={ApiList.data} />
                )}
                <PaginationManual
                  currentPage={page}
                  totalPages={ApiList?.data?.meta?.totalPages}
                  onPageChange={setPage}
                />
              </TabsContent>
              <TabsContent value="Collection">
                {CollectionList.isLoading && (
                  <SkeletonTable
                    name={"Collection List"}
                    columns={CollectionColumns}
                  />
                )}
                {CollectionList.isSuccess && (
                  <CollectionTable
                    columns={CollectionColumns}
                    data={CollectionList.data}
                  />
                )}
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
