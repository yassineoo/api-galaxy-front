import { CollectionTable } from "@/components/admin/apis/collections/collections-table";
import { CollectionColumns } from "@/components/admin/apis/collections/collectionsColumns";
import CreateEndpointsCollectionForm from "@/components/admin/apis/collections/endpointGroupCreateModal";
import { columns } from "@/components/dashboard/apiTable/apiColumns";
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

export default function DefinitionTab({ api }: any) {
  const ApiList = useApiList(api.ID);

  const CollectionList = useCollectionList(api.ID);
  return (
    <div className="flex justify-start items-start gap-4 w-full ">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-start gap-4">
            <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
            <CardTitle className="text-2xl">Endpoints</CardTitle>
          </div>
          <CardDescription>Define your api Endpoints</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Search />
          <div className="flex gap-4 justify-end items-center">
            <CreateEndpointsCollectionForm />
          </div>

          <Tabs defaultValue="Endpoints">
            <TabsList className="w-[200px] border-none bg-transparent">
              <TabsTrigger value="Endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="Groups">Groups</TabsTrigger>
            </TabsList>
            <TabsContent value="Endpoints">
              {ApiList.isLoading && CollectionList.isLoading && (
                <p>Loading...</p>
              )}
              {ApiList.isSuccess && CollectionList.isSuccess && (
                <CollectionTable columns={columns} data={ApiList.data} />
              )}
            </TabsContent>
            <TabsContent value="Groups">
              {CollectionList.isLoading && CollectionList.isLoading && (
                <p>Loading...</p>
              )}
              {CollectionList.isSuccess && CollectionList.isSuccess && (
                <CollectionTable
                  columns={CollectionColumns}
                  data={CollectionList.data}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
