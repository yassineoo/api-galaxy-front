"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddNewApiForm from "./addApiPopUp";
import PopupForm from "./modal";
import GenralApiInfoTab from "./generalTab";
import ProductCard from "./productCard";
import DefinitionTab from "./definitionTab";

export function ApiConfigTabs() {
  const api = {
    id: 1,
    name: "transportation api",
    apiUrl: "https://api.transportation.com",
    image: "https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg",
    keywords: "transportation, api, transportation api",
    description: "api for transportation services in the US ",
    averageRating: 4.8,
    latency: 7,
    availability: 99.99,
  };

  return (
    <Tabs defaultValue="General">
      <TabsList className="grid  grid-cols-4 w-1/2  ml-8 my-2">
        <TabsTrigger value="General">General</TabsTrigger>
        <TabsTrigger value="Definitions">Definitions</TabsTrigger>
        <TabsTrigger value="Endpoints">Endpoints</TabsTrigger>
        <TabsTrigger value="Monitizations">Monitizations</TabsTrigger>
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
        <DefinitionTab />
      </TabsContent>
      <TabsContent
        value="Endpoints"
        className="w-full  flex flex-col justify-center items-start ml-8 "
      ></TabsContent>
    </Tabs>
  );
}
