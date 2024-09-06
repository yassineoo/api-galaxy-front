"use client";
import Statis from "@/app/dashboard/apis/[id]/Analyse/endpointStatis";
import LoadingPage from "@/app/loading";
import { SkeletonTable } from "@/components/admin/apis/apis/apiSkeleton";
import { LogsTable } from "@/components/dashboard/analyse/logsTable/logs-table";
import { Logscolumns } from "@/components/dashboard/analyse/logsTable/logsColumns";
import Header from "@/components/dashboard/header";
import { SelectButton } from "@/components/dashboard/mainPage/filterGroup";
import NotFoundPage from "@/components/shared/errorPage";
import { useApiLogsList } from "@/hooks/apiLogs/apiLogs.queries";
import { useApiById } from "@/hooks/apis/api.queries";
import { useApiEndpointsList } from "@/hooks/Endpoints/Endpoints.queries";
import { timeFilter } from "@/utils/constants";
import { useState } from "react";

const AnalysePage = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const apiSelected = useApiById(id);
  console.log({ apiSelected });
  const endpointsList = useApiEndpointsList(id);
  // if (endpointsList.isSuccess) console.log(endpointsList.data);
  const [page, setPage] = useState(1);

  const logs = useApiLogsList({ apiId: id, page, limit: 5 });
  const HealthCheck = { data: null, isLoading: true, isError: false };
  const [logsFilter, setLogsFilter] = useState("");
  const changeLogsFilter = (value: any) => {
    setLogsFilter(value);
  };

  return (
    <div className="bg-dashboardBg dark:bg-transparent flex h-full flex-col ">
      {(apiSelected.isLoading || endpointsList.isLoading) && (
        <div className="py-4">
          <LoadingPage />
        </div>
      )}
      {apiSelected.isError && <NotFoundPage />}
      {apiSelected.isSuccess && (
        <div className="w-full flex-col ">
          {/* {endpointsList.isLoading && <p>loading ...</p>} */}

          {endpointsList.isSuccess && (
            <Statis api={apiSelected.data} endpointsList={endpointsList.data} />
          )}
        </div>
      )}
      {/* <div className="px-12 py-10 ">
        {logs.isLoading && (
          <SkeletonTable name={"Logs List"} columns={Logscolumns} />
        )}
        {logs.isSuccess && (
          <>
            <div className="flex justify-start gap-6 items-center">
              <h3 className="font-bold mx-4 my-0">Time Range</h3>

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
      </div> */}
    </div>
  );
};

export default AnalysePage;
