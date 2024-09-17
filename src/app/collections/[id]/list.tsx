"use client";
import PaginationManual from "@/components/dashboard/billing/paginationManual";
import ProductCard from "@/components/HubXs/productCard";
import NotFoundPage from "@/components/shared/errorPage";
import { useEffect, useState } from "react";

export default function ApiList({
  apiList,
  name,
  userId,
}: {
  apiList: { data: any[]; pages: number };
  name: string;
  userId: number;
}) {
  const [page, setPage] = useState<number>(1);
  const [apis, setApis] = useState(apiList.data.slice(1, 10));
  useEffect(() => {
    setApis(apiList.data.slice((page - 1) * 10, page * 10));
  }, [page]);
  return (
    <div className="bg-white py-10 w-full mx-auto text-black flex">
      <div className="relative px-10 max-w-full w-full flex items-center flex-col gap-4">
        <h1 className="text-black text-title text-xl md:text-3xl font-bold w-full text-start">
          Collection: {name}
        </h1>

        <div className="flex flex-wrap gap-3 p-2 justify-center">
          {/* {apiList.isLoading &&
          new Array(5).fill(0).map((_, index) => (
            <div key={index} className="">
              <CardSkeleton />
            </div>
          ))} */}

          {/* {apiList.isSuccess && */}
          {Array.isArray(apis) && apis.length > 0 ? (
            apis.map((api: any, index: any) => (
              <ProductCard
                key={index}
                userId={userId}
                cardData={{
                  id: api.id,
                  averageRating: api.rating,
                  latency: api.Latency,
                  availability: api.status,
                  imagePath: api.image_path,
                  cardTitle: api.name,
                  cardDescription: api.description,
                  liked: api.isLiked,
                }}
              />
            ))
          ) : (
            <p className="text-2xl mb-8 text-center mt-4">
              Oops! This collection is empty.
            </p>
          )}
        </div>
        {apis.length > 0 && (
          <PaginationManual
            currentPage={page}
            totalPages={apiList?.pages}
            onPageChange={(v: number) => setPage(v)}
          />
        )}
      </div>
    </div>
  );
}
