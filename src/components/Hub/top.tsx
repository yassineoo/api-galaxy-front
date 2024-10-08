"use client";

import CollectionCard from "../HubXs/collectionCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCollectionList } from "@/hooks/Endpoint collections/EndpointsCollection.queries";
import useAuth from "@/hooks/useAuth";
import { useAuthSession } from "../auth-provider";

export interface ApiCollection {
  ID: number;
  Name: string;
  Description: string;
  ImagePath: string;
  Apis: any[];
}

export default function TopCollection() {
  // const { data: session, status } = useSession();
  const { session } = useAuthSession();

  const { data: auth, isSuccess } = useAuth();

  const ColllectionList = useCollectionList();
  if (ColllectionList.isSuccess) {
    console.log({ data: ColllectionList.data });
  }
  return (
    <div className="bg-gradient-to-r   from-blue-300  to-mainColor">
      <h1 className="text-white text-center text-2xl md:text-4xl font-bold py-6">
        Top Collection
      </h1>

      {ColllectionList.isLoading && <p>Loading .. </p>}
      {ColllectionList.isError && <p>Error .. </p>}
      {ColllectionList.isSuccess && (
        <div className="flex p-4 gap-4 md:w-5/6 m-auto  flex-wrap">
          <CarouselSize data={ColllectionList.data} />
        </div>
      )}
    </div>
  );
}

export function CarouselSize({ data }: { data: ApiCollection[] }) {
  console.log("data", data);

  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full  "
    >
      <CarouselContent>
        {data.map((item, index: number) => (
          <CarouselItem className="basis-1/5 h-full flex " key={index}>
            <CollectionCard
              key={index}
              id={item.ID}
              imagePath={item.ImagePath}
              cardTitle={item.Name}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
