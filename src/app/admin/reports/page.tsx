"use client";
import { SkeletonTable } from "@/components/admin/apis/apis/apiSkeleton";
import { CollectionTable } from "@/components/admin/apis/collections/collections-table";
import { CollectionColumns } from "@/components/admin/apis/collections/collectionsColumns";
import { columns } from "@/components/dashboard/reports/apiReportColumns";
import { columns as reviewCols } from "@/components/dashboard/reports/reviewReportColumns";
import PaginationManual from "@/components/dashboard/billing/paginationManual";
import Image from "next/image";
import Header from "@/components/dashboard/header";
import { Search } from "@/components/shared/search";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useApiReports, useReviewsReports } from "@/hooks/reports/reviews.query";
import { ApiReportsTable } from "@/components/dashboard/reports/apiReports";
import { ReviewReportsTable } from "@/components/dashboard/reports/reviewReportsTable";

export default function DefinitionTab() {
  const [page, setPage] = useState(1);
  const [reviewReportList,setReviewReportList]=useState([])
  const ApiReportList = useApiReports({page,limit : 10,search : ""})
  const ReviewReportList = useReviewsReports({page,limit:10,search:""})
  useEffect(()=>{
    if(ReviewReportList.isSuccess){
        setReviewReportList(ReviewReportList.data)
    }
  },[ReviewReportList.isFetching,ReviewReportList.isFetched])
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full h-full overflow-scroll ">
      <Header />

      <div className="flex justify-start items-start gap-4 w-full ">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-start gap-4">
              <Image src="/icons/reports_svg.svg" alt="" width={20} height={20} />
              <CardTitle className="text-2xl">Reports</CardTitle>
            </div>
            <CardDescription>Manage the Reports</CardDescription>
            <Search />
          </CardHeader>
          <CardContent className="grid gap-4">
            <Tabs defaultValue="Reports">
              <TabsList className="w-[200px] border-none bg-transparent">
                <TabsTrigger value="Apis Reports">Apis Reports</TabsTrigger>
                <TabsTrigger value="Reviews Reports">Reviews Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="Apis Reports">
                {ApiReportList.isLoading && (
                  <SkeletonTable name={"Api List"} columns={columns} />
                )}
                {ApiReportList.isSuccess && (
                  <ApiReportsTable columns={columns} data={ApiReportList.data} />
                )}
                <PaginationManual
                  currentPage={page}
                  totalPages={ApiReportList?.data?.meta?.totalPages}
                  onPageChange={setPage}
                />
              </TabsContent>
              <TabsContent value="Reviews Reports">
                {ReviewReportList.isLoading && (
                  <SkeletonTable
                    name={"Reviews Report List"}
                    columns={CollectionColumns}
                  />
                )}
                {ReviewReportList.isSuccess && (
                  <ReviewReportsTable
                    columns={reviewCols}
                    data={reviewReportList}
                  />
                )}
                <PaginationManual
                  currentPage={page}
                  totalPages={ReviewReportList?.data?.meta?.totalPages}
                  onPageChange={setPage}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}