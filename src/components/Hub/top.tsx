"use client";

import CollectionCard from "../HubXs/collectionCard";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const items = [
  {
    ImagePath: "/assets/hub_assets/translate.svg",
    Title: "Best translation API",
  },
  {
    ImagePath: "/assets/hub_assets/movie.svg",
    Title: "Top Movie API",
  },
  {
    ImagePath: "/assets/hub_assets/chat.svg",
    Title: "Top Sms API",
  },
  {
    ImagePath: "/assets/hub_assets/hosting.svg",
    Title: "Top Proxies API",
  },
  {
    ImagePath: "/assets/hub_assets/location.svg",
    Title: "Top location API",
  },
  {
    ImagePath: "/assets/hub_assets/movie.svg",
    Title: "Top Movie API",
  },
  {
    ImagePath: "/assets/hub_assets/movie.svg",
    Title: "Top Movie API",
  },
  {
    ImagePath: "/assets/hub_assets/movie.svg",
    Title: "Top Movie API",
  },
];

export default function TopCollection() {
  return (
    <div className="bg-mainColor">
      <h1 className="text-white text-center text-2xl md:text-4xl font-bold py-6">
        Top Collection
      </h1>

      <div className="flex p-4 gap-4 md:w-5/6 m-auto  flex-wrap">
        <CarouselSize />
      </div>
    </div>
  );
}

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full "
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem className="basis-1/5">
            <CollectionCard
              key={index}
              imagePath={item.ImagePath}
              cardTitle={item.Title}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
