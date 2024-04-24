"use client";
import Image from "next/image";
import LeftBarButton, { LeftBarBarSkeleton } from "../HubXs/leftBarButton";
import ProductCard from "../HubXs/productCard";
import { useApiList } from "@/hooks/apis/api.queries";
import { useEffect, useState } from "react";
import PaginationManual from "../dashboard/billing/paginationManual";
import { useApiCategoryList } from "@/hooks/apisCategory/apiCategory.queries";
import { Search } from "../shared/search";
import CardSkeleton from "../HubXs/skeleton";

const buttons = [
  {
    iconPath: "/assets/hub_assets/layers.svg",
    buttonText: "Sports",
    option: false,
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
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState("");

  const apiList = useApiList({
    page,
    limit: 12,
    filter,
    search,
  });
  const ApiCategoryList = useApiCategoryList();

  return (
    <>
      <div className="bg-white py-10  text-black flex">
        <div className="ml-4 flex flex-col gap-2">
          {ApiCategoryList.isLoading &&
            new Array(5).fill(0).map((_, index) => (
              <div key={index}>
                <LeftBarBarSkeleton />
              </div>
            ))}
          {ApiCategoryList.isError && <p>ApiCategoryList.Error</p>}
          {ApiCategoryList.isSuccess && (
            <CategoryList
              setFilter={setFilter}
              filter={filter}
              categories={ApiCategoryList?.data}
            />
          )}
        </div>
        <div className="relative left-8">
          <h1 className="text-black text-title text-xl md:text-3xl font-bold">
            Discover more APIs
          </h1>

          <div className="flex flex-wrap gap-2 p-2">
            {apiList.isLoading &&
              new Array(5).fill(0).map((_, index) => (
                <div key={index} className="">
                  <CardSkeleton />
                </div>
              ))}
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
                  liked={index % 2 === 0}
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

const CategoryList = ({ categories, filter, setFilter }: any) => {
  console.log("categories", categories);

  return (
    <div>
      {categories?.data?.map((category: any, index: any) => (
        <div key={index}>
          <LeftBarButton
            filter={filter}
            setFilter={setFilter}
            key={index}
            iconPath={buttons[index].iconPath}
            buttonText={category.CategoryName}
            option={buttons[index].option}
            index={category.ID}
          />
        </div>
      ))}
    </div>
  );
};
