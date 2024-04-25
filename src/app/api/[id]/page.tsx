"use client";
import Head from "next/head";
import LineChartComponent from "../../../components/dashboard/linechart";
import DonutChartComponent from "../../../components/dashboard/mainPage/donutchart";
import { use, useEffect, useState } from "react";

import Navbar from "../../../components/General use/navbar";
import ApiHeader from "../apiHeader";
import { ApiTabs } from "../apiBody";
import { useApiById } from "@/hooks/apis/api.queries";
import { useApiHealthCheakStats } from "@/hooks/HealthCheak/apiHealthCheak.queries";

const DashboardPage = ({ params }: any) => {
  const { id } = params;
  const apiSelceted = useApiById(id);
  const apiHealthStats = useApiHealthCheakStats({ apiIDs: [id] });

  const [apiLogsStats, setApiLogsStats] = useState<any>();

  useEffect(() => {
    if (apiHealthStats.isSuccess) {
      console.log("apiHealthStats", apiHealthStats.data[0]);

      setApiLogsStats(apiHealthStats.data[0]);
    }
  }, [apiHealthStats.isSuccess]);

  return (
    <div className=" ">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar services="2" about="3" pricing="4" contacts="6" />
      {apiSelceted.isLoading && <p>Loading ... </p>}
      {apiSelceted.isSuccess && (
        <>
          <ApiHeader
            Name={apiSelceted.data.Name}
            Description={apiSelceted.data.Description}
            ImagePath={apiSelceted.data.ImagePath}
            Rating={0}
            Latency={apiLogsStats?.AverageResponseTime}
            Availability={apiLogsStats?.Availability * 100}
          />
          <ApiTabs api={apiSelceted.data} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
