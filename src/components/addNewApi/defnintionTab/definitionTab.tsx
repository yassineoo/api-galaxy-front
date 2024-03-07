import { use, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Search } from "../../shared/search";
import { EndpointsTable } from "./endpointsTable/endpoints-table";
import { Endpointscolumns } from "./endpointsTable/endpointsColumns";
import { useApiEndpointsList } from "@/hooks/Endpoints/Endpoints.queries";
import CreateEndpointsGroupForm from "./endpoints/endpointGroupCreateModal";
import { useEndpointsGroupList } from "@/hooks/Endpoints Group/EndpointsGroup.queries";
import AddNewEndpointDrawer from "./endpoints/addNewEndpointDrawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EndpointsGroupsTable } from "./endpointsTable/endpoints-group-table";
import { EndpointsGroupscolumns } from "./endpointsTable/endpointsGroupsColumns";
import ImportEndpointModal from "./endpoints/importModal";

export default function DefinitionTab({ api }: any) {
  const EndpointsList = useApiEndpointsList(api.ID);

  const EndpointsGroupsList = useEndpointsGroupList(api.ID);
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
            <ImportEndpointModal apiID={api.ID} />
            <AddNewEndpointDrawer Label="Add New Endpoint" apiID={api.ID} />
            <CreateEndpointsGroupForm apiId={api.ID} />
          </div>

          <Tabs defaultValue="Endpoints">
            <TabsList className="w-[200px] border-none bg-transparent">
              <TabsTrigger value="Endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="Groups">Groups</TabsTrigger>
            </TabsList>
            <TabsContent value="Endpoints">
              {EndpointsList.isLoading && EndpointsGroupsList.isLoading && (
                <p>Loading...</p>
              )}
              {EndpointsList.isSuccess && EndpointsGroupsList.isSuccess && (
                <EndpointsTable
                  groups={EndpointsGroupsList.data.map((group: any) => {
                    return { label: group.Group, value: group.ID };
                  })}
                  onUpdateEndpointGroup={() => {}}
                  columns={Endpointscolumns}
                  data={EndpointsList.data.map((endpoint: any) => {
                    const obj = {
                      ...endpoint,
                      apiId: api.ID,
                      GroupName: endpoint.Group?.Group,
                      GroupId: endpoint.Group?.Group,
                    };
                    delete obj.Group;

                    return obj;
                  })}
                />
              )}
            </TabsContent>
            <TabsContent value="Groups">
              {EndpointsGroupsList.isLoading &&
                EndpointsGroupsList.isLoading && <p>Loading...</p>}
              {EndpointsGroupsList.isSuccess &&
                EndpointsGroupsList.isSuccess && (
                  <EndpointsGroupsTable
                    columns={EndpointsGroupscolumns}
                    data={EndpointsGroupsList.data}
                  />
                )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
