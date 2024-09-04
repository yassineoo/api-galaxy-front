"use client";
import LeftBarButton, { LeftBarBarSkeleton } from "../HubXs/leftBarButton";
import ProductCard from "../HubXs/productCard";
import { useApiList } from "@/hooks/apis/api.queries";
import { use, useEffect, useState } from "react";
import PaginationManual from "../dashboard/billing/paginationManual";
import { useApiCategoryList } from "@/hooks/apisCategory/apiCategory.queries";
import CardSkeleton from "../HubXs/skeleton";
import { useSession } from "next-auth/react";
import useAuth from "@/hooks/useAuth";

import { useAuthSession } from "../auth-provider";

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

export default function ProductsHub({
  keyword,
  title,
}: {
  keyword?: string;
  title: string;
}) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [apis, setApis] = useState([]);
  const [ids, setIds] = useState([1]);

  const { session } = useAuthSession();

  const apiList = useApiList(
    {
      page,
      limit: 12,
      filter,
      search: keyword ?? "",
    },
    session?.userId || 1,

    session?.token || "",
    1
  );

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
      setApis(apiList.data);
      setIds(apiList.data.map((api: any) => api.ID));
    }
  }, [apiList.isSuccess]);

  useEffect(() => {
    console.log("logged apissss", apis);
    console.log("logged apissss data", apiList.data);
  }, [apis]);

  // TODO
  // useEffect(() => {
  //   if (apiHealthStats?.isSuccess) {
  //     setApis((prev: any) => {
  //       return prev.map((api: any) => {
  //         const stat = apiHealthStats?.data?.find(
  //           (health: any) => health.ApiID === api.ID
  //         );
  //         console.log("stat", stat, apiHealthStats?.data, api.ID);

  //         return {
  //           ...api,
  //           Availability: (2 || 0) * 100,
  //           Latency: 5 || 0,
  //           Rating: 2,
  //         };
  //       });
  //     });
  //   }
  // }, [apiHealthStats.isSuccess]);
  /*
  useEffect(() => {
    console.log("apissss", apis);
  }, [apis]);
*/

  useEffect(() => {
    console.log("filterrrrrr", filter);
  }, [filter]);
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
              categories={ApiCategoryList.data}
            />
          )}
        </div>
        <div className="relative left-8">
          <h1 className="text-black text-title text-xl md:text-3xl font-bold mb-4">
            {title}
          </h1>

          <div className="flex flex-wrap gap-3 p-2">
            {apiList.isLoading &&
              new Array(5).fill(0).map((_, index) => (
                <div key={index} className="">
                  <CardSkeleton />
                </div>
              ))}

            {apiList.isSuccess &&
              apiList.data?.map((api: any, index: any) => (
                <ProductCard
                  key={index}
                  userId={session?.userId}
                  cardData={{
                    id: api.id,
                    averageRating: 3,
                    latency: api.Latency,
                    availability: api.status,
                    imagePath: api.image_path,
                    cardTitle: api.name,
                    cardDescription: api.description,
                    liked: api.isLiked,
                  }}
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
  console.log("categoriesss", categories, categories?.length);

  return (
    <div>
      <h4 className="font-bold mb-4 mt-2">Categories</h4>
      <div key={4} className="">
        <LeftBarButton
          filter={filter}
          setFilter={setFilter}
          key={4}
          iconPath={buttons[4].iconPath}
          buttonText={"All"}
          option={buttons[4].option}
          index={0}
        />
      </div>
      {categories?.map((category: any, index: any) => (
        <div key={index} className="">
          <LeftBarButton
            filter={filter}
            setFilter={setFilter}
            key={index}
            iconPath={buttons[index].iconPath}
            buttonText={category.category_name}
            option={buttons[index].option}
            index={category.id}
          />
        </div>
      ))}
    </div>
  );
};
