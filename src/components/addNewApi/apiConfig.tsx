"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenralApiInfoTab from "./genralTab/generalTab";
import DefinitionTab from "./defnintionTab/definitionTab";
import AddEndpointsForm from "./defnintionTab/endpoints/endpointsForm";
import DocsTab from "./docs/docsTab";
import MonetizationTab from "./monitazation/monetizationTab";
import { useApiPlanList } from "@/hooks/plans/plans.queries";
import VersionSeloctor from "./genralTab/versionSelector";

export function ApiConfigTabs({ api }: any) {
  console.log(api);
  const apiPlans = useApiPlanList(api.ID);

  return (
    <Tabs defaultValue="General">
      <TabsList className="grid  grid-cols-7 w-2/3  ml-8 my-2">
        <TabsTrigger value="General">General</TabsTrigger>
        <TabsTrigger value="Definitions">Definitions</TabsTrigger>
        <TabsTrigger value="Documentaion">Documentaion</TabsTrigger>

        <TabsTrigger value="Security">Security</TabsTrigger>
        <TabsTrigger value="Monetization">Monetization</TabsTrigger>
        <VersionSeloctor />
      </TabsList>
      <TabsContent
        value="General"
        className="w-full  flex flex-col justify-center items-start px-8 "
      >
        <GenralApiInfoTab api={api} />
      </TabsContent>
      <TabsContent
        value="Definitions"
        className="w-full  flex flex-col justify-center items-start px-8 "
      >
        <DefinitionTab api={api} />
      </TabsContent>
      <TabsContent
        value="Documentaion"
        className="w-full  flex flex-col justify-center items-start px-8 "
      >
        <DocsTab api={api} />
      </TabsContent>
      <TabsContent
        value="Endpoints"
        className="w-full  flex flex-col justify-center items-start px-8 "
      >
        <AddEndpointsForm api={api} />
      </TabsContent>
      <TabsContent
        value="Monetization"
        className="w-full  flex flex-col justify-center items-start px-8 "
      >
        {apiPlans.isLoading && <div>Loading...</div>}
        {apiPlans.isSuccess && (
          <MonetizationTab
            api={api}
            apiPlans={apiPlans.data}
            edit={apiPlans.data.Plans.length !== 0 ? true : false}
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
