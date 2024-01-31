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
import CreateEndpointsGroupForm from "./endpointGroupCreateModal";

export default function DefinitionTab({ api }: any) {
  const EndpointsList = useApiEndpointsList(api.id);
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
          <CreateEndpointsGroupForm apiId={api.id} />
          {EndpointsList.isLoading && <p>Loading...</p>}
          {EndpointsList.isSuccess && (
            <EndpointsTable
              columns={Endpointscolumns}
              data={EndpointsList.data.map((endpoint: any) => {
                console.log(endpoint.Group);
                console.log("endpoint kkoko ===============", {
                  ...endpoint,
                  apiId: api.id,
                  GroupName: endpoint.Group?.Group,
                  GroupId: endpoint.Group?.Group,
                });

                const obj = {
                  ...endpoint,
                  apiId: api.id,
                  GroupName: endpoint.Group?.Group,
                  GroupId: endpoint.Group?.Group,
                };
                delete obj.Group;

                return obj;
              })}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
