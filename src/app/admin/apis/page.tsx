"use client";
import { CollectionTable } from "@/components/admin/apis/collections/collections-table";
import { CollectionColumns } from "@/components/admin/apis/collections/collectionsColumns";
import CreateEndpointsCollectionForm from "@/components/admin/apis/collections/endpointGroupCreateModal";
import { ApiTable } from "@/components/dashboard/apiTable/api-table";
import { columns } from "@/components/dashboard/apiTable/apiColumns";
import PaginationManual from "@/components/dashboard/billing/paginationManual";
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
import { useApiList } from "@/hooks/apis/api.queries";
import { useState } from "react";

export default function DefinitionTab() {
  const [page, setPage] = useState(1);
  const ApiList = useApiList({ page, limit: 8 });

  const CollectionList = useCollectionList();
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full h-full overflow-scroll ">
      <Header />

      <div className="flex justify-start items-start gap-4 w-full ">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-start gap-4">
              <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
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
                {ApiList.isLoading && <p>Loading...</p>}
                {ApiList.isSuccess && (
                  <ApiTable columns={columns} data={ApiList.data.data.apis} />
                )}
                <PaginationManual
                  currentPage={page}
                  totalPages={ApiList?.data?.meta?.totalPages}
                  onPageChange={setPage}
                />
              </TabsContent>
              <TabsContent value="Collection">
                {CollectionList.isLoading && <p>Loading...</p>}
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
