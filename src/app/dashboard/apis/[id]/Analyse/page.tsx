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
import {
  useApiLogsList,
  useApiLogsStats,
} from "@/hooks/apiLogs/apiLogs.queries";
import { LogsTable } from "@/components/dashboard/analyse/logsTable/logs-table";
import LineChartComponent from "@/components/dashboard/linechart";
import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import Statis from "./endpointStatis";
import { error } from "console";

const AddApiPage = ({ params }: any) => {
  const { id } = params;
  const apiSelceted = useApiById(id);
  const endpointsList = useApiEndpointsList(id);
  const logs = useApiLogsList(id);
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
        {logs.isLoading && <p>loading ...</p>}
        {logs.isSuccess && (
          <>
            <div className="flex justify-start gap-6 items-center">
              <h3 className="font-bold m-4"> Time Range</h3>

              <SelectButton
                handleSelectionChange={changeLogsFilter}
                name="Time Range"
                defaultSelected="7days"
                items={[
                  { value: "7days", label: "last 7 days" },
                  { value: "30days", label: "last 30 days" },
                  { value: "90days", label: "last 90 days" },
                  { value: "1hour", label: "last hour" },
                  { value: "3hours", label: "last 3 hours" },
                  { value: "6hours", label: "last 6 hours" },
                  { value: "12hours", label: "last 12 hours" },
                  { value: "24hours", label: "last 24 hours" },
                ]}
              />
            </div>
            <LogsTable
              columns={Logscolumns}
              data={logs.data.map((log: any) => {
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
      </div>
    </div>
  );
};

export default AddApiPage;

/*


*/
