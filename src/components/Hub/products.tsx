"use client";
import Image from "next/image";
import LeftBarButton from "../HubXs/leftBarButton";
import ProductCard from "../HubXs/productCard";
import { useApiList } from "@/hooks/apis/api.queries";
import { useEffect, useState } from "react";
import PaginationManual from "../dashboard/billing/paginationManual";

const buttons = [
  {
    iconPath: "/assets/hub_assets/layers.svg",
    buttonText: "Sports",
    option: true,
  },
  {
    iconPath: "/assets/hub_assets/dollar-sign.svg",
    buttonText: "Low price",
    option: true,
  },
  {
    iconPath: "/assets/hub_assets/credit-card.svg",
    buttonText: "Price range",
    option: true,
  },
  {
    iconPath: "/assets/hub_assets/user.svg",
    buttonText: "Creators",
    option: true,
  },
  {
    iconPath: "/assets/hub_assets/camera.svg",
    buttonText: "Photography",
    option: true,
  },
];

export default function ProductsHub() {
  const [page, setPage] = useState(1);

  const apiList = useApiList({
    page,
    limit: 12,
  });

  useEffect(() => {
    console.log(apiList.error);
  }, [apiList.isError]);
  useEffect(() => {
    console.log(apiList.data);
  }, [apiList.data]);

  return (
    <>
      <div className="bg-white py-10  text-black flex">
        <div className="ml-4 flex flex-col gap-2">
          {buttons.map((button, index) => (
            <LeftBarButton
              key={index}
              iconPath={button.iconPath}
              buttonText={button.buttonText}
              option={button.option}
            />
          ))}
        </div>
        <div className="relative left-8">
          <h1 className="text-black text-title text-xl md:text-3xl font-bold">
            Discover more APIs
          </h1>

          <div className="flex flex-wrap gap-2 p-2">
            {apiList.isLoading && <p>Loading ...</p>}
            {apiList.isError && <p>apiList.Error</p>}

            {apiList.isSuccess &&
              apiList?.data?.data?.apis?.map((card: any, index: any) => (
                <ProductCard
                  id={card.ID}
                  key={index}
                  averageRating={321}
                  latency={12}
                  availability={42}
                  imagePath={card.ImagePath}
                  cardTitle={card.Name}
                  cardDescription={card.Description}
                />
              ))}
          </div>
          <PaginationManual
            currentPage={page}
            totalPages={apiList?.data?.data?.meta?.totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}
