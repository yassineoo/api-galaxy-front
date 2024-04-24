"use client";
import Image from "next/image";
import LeftBarButton from "../HubXs/leftBarButton";
import ProductCard from "../HubXs/productCard";
import { useApiList } from "@/hooks/apis/api.queries";
import { useEffect, useState } from "react";
import PaginationManual from "../dashboard/billing/paginationManual";
import { useApiCategoryList } from "@/hooks/apisCategory/apiCategory.queries";
import { Search } from "../shared/search";

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
  const [fliter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const apiList = useApiList({
    page,
    limit: 12,
    fliter,
    search,
  });
  const ApiCategoryList = useApiCategoryList();

  return (
    <>
      <div className="bg-white py-10  text-black flex">
        <div className="ml-4 flex flex-col gap-2">
          {ApiCategoryList.isLoading && <p>Loading ...</p>}
          {ApiCategoryList.isError && <p>ApiCategoryList.Error</p>}
          {ApiCategoryList.isSuccess && (
            <CategoryList categories={ApiCategoryList?.data} />
          )}
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

const CategoryList = ({ categories }: any) => {
  console.log("categories", categories);

  return (
    <div>
      {categories?.data?.map((category: any, index: any) => (
        <LeftBarButton
          key={index}
          iconPath={buttons[index].iconPath}
          buttonText={category.CategoryName}
          option={buttons[index].option}
        />
      ))}
    </div>
  );
};
