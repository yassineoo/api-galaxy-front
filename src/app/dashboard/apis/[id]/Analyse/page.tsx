"use client";
import Sidebar from "@/components/dashboard/sidebar";

import AddNewApiForm from "@/components/addNewApi/genralTab/addApiPopUp";
import Header from "@/components/dashboard/header";
import { ApiConfigTabs } from "@/components/addNewApi/apiConfig";
import { useApiById } from "@/hooks/apis/api.queries";
import LoadingPage from "@/components/shared/loadingPage";
import NotFoundPage from "@/components/shared/errorPage";
import MultiSelect from "@/components/addNewApi/monitazation/object";
import { useApiEndpointsList } from "@/hooks/Endpoints/Endpoints.queries";
import { use, useEffect, useState } from "react";
import { Logscolumns } from "@/components/dashboard/analyse/logsTable/logsColumns";
import { useApiLogsList } from "@/hooks/apiLogs/apiLogs.queries";
import { LogsTable } from "@/components/dashboard/analyse/logsTable/logs-table";
import LineChartComponent from "@/components/dashboard/linechart";
import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import Statis from "./endpointStatis";
import { error } from "console";
import PaginationManual from "@/components/dashboard/billing/paginationManual";
import { timeFilter } from "@/utils/constants";
import { SkeletonTable } from "@/components/admin/apis/apis/apiSkeleton";

const AddApiPage = ({ params }: any) => {
  const { id } = params;
  const apiSelceted = useApiById(id);
  const endpointsList = useApiEndpointsList(id);
  //const logs = useApiLogsList(id);
  const [page, setPage] = useState(1);

  const logs = useApiLogsList({ apiId: id, page, limit: 5 });
  const [logsFilter, setLogsFilter] = useState("");

  const changeLogsFilter = (value: any) => {
    setLogsFilter(value);
  };

  return (
    <div className="bg-dashboardBg dark:bg-transparent flex h-full flex-col ">
      <Header />

      {apiSelceted.isLoading && <LoadingPage />}
      {apiSelceted.isError && <NotFoundPage />}
      {apiSelceted.isSuccess && (
        <div className="w-full flex-col">
          {endpointsList.isLoading && <p>loading ...</p>}

          {endpointsList.isSuccess && (
            <Statis api={apiSelceted.data} endpointsList={endpointsList.data} />
          )}
        </div>
      )}
      <div className="px-12 py-10 ">
        {logs.isLoading && (
          <SkeletonTable name={"Logs List"} columns={Logscolumns} />
        )}
        {logs.isSuccess && (
          <>
            <div className="flex justify-start gap-6 items-center">
              <h3 className="font-bold m-4"> Time Range</h3>

              <SelectButton
                handleSelectionChange={changeLogsFilter}
                name="Time Range"
                defaultSelected="7days"
                items={timeFilter}
              />
            </div>
            <LogsTable
              columns={Logscolumns}
              data={logs.data?.logs.map((log: any) => {
                return {
                  ...log,
                  Methode: log.Endpoint.Methode,
                  EndpointName: log.Endpoint?.Name,
                };
              })}
            />
          </>
        )}

        {logs.isError && <p>logs ERROR</p>}
        <PaginationManual
          currentPage={page}
          totalPages={logs?.data?.meta?.totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default AddApiPage;

/*


*/
