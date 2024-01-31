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
          {EndpointsList.isLoading && <p>Loading...</p>}
          {EndpointsList.isSuccess && (
            <EndpointsTable
              columns={Endpointscolumns}
              data={EndpointsList.data}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
