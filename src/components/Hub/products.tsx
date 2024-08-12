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
import { useApiHealthCheakStats } from "@/hooks/HealthCheak/apiHealthCheak.queries";

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
  const [apis, setApis] = useState([]);

  const [ids, setIds] = useState([1]);

  const apiList = useApiList({
    page,
    limit: 12,
    filter,
    search,
  });
  const ApiCategoryList = useApiCategoryList();
  //const apiHealthStats = useApiHealthCheakStats({ apiIDs: ids });

  const apiHealthStats = {
    data: [],
    isLoading: true,
    isError: false,
    isSuccess: false,
  };
  useEffect(() => {
    if (apiList.isSuccess) {
      setApis(apiList.data.data.apis);
      setIds(apiList.data.data.apis.map((api: any) => api.ID));
    }
  }, [apiList.isSuccess]);

  useEffect(() => {
    if (apiHealthStats?.isSuccess) {
      setApis((prev: any) => {
        return prev.map((api: any) => {
          const stat = apiHealthStats?.data?.find(
            (health: any) => health.ApiID === api.ID
          );
          console.log("stat", stat, apiHealthStats?.data, api.ID);

          return {
            ...api,
            Availability: (stat?.Availability || 0) * 100,
            Latency: stat?.AverageResponseTime || 0,
            Rating: 2,
          };
        });
      });
    }
  }, [apiHealthStats?.isSuccess]);

  useEffect(() => {
    console.log("apissss", apis);
  }, [apis]);

  return (
    <>
      <div className="bg-white py-10  text-black flex">
        <div className="ml-4 flex flex-col gap-3">
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
          {apiHealthStats.isLoading && <p>Loading apiHealthStats.isLoading</p>}
          {apiHealthStats.isError && <p>Eroro : apiHealthStats.Error</p>}

          <div className="flex flex-wrap gap-3 p-2">
            {apiList.isLoading &&
              new Array(5).fill(0).map((_, index) => (
                <div key={index} className="">
                  <CardSkeleton />
                </div>
              ))}
            {apiList.isError && <p>apiList.Error </p>}

            {apiList.isSuccess &&
              apis?.map((card: any, index: any) => (
                <ProductCard
                  id={card.ID}
                  key={index}
                  averageRating={3}
                  latency={card.Latency}
                  availability={card.Availability}
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
      <h4 className="font-bold mb-4 mt-2">Categories</h4>
      {categories?.data?.map((category: any, index: any) => (
        <div key={index} className="">
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
