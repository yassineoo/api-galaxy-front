"use client";
import Head from "next/head";
import LineChartComponent from "../../../components/dashboard/linechart";
import DonutChartComponent from "../../../components/dashboard/mainPage/donutchart";
import { useEffect, useState } from "react";

import ApiHeader from "../apiHeader";
import { ApiTabs } from "../apiBody";
import { useApiById, useAPIRating } from "@/hooks/apis/api.queries";
import { useApiHealthCheakStats } from "@/hooks/HealthCheak/apiHealthCheak.queries";
import { useAuthSession } from "@/components/auth-provider";
import Navbar from "@/components/HubXs/navbar";
// import { useSession } from "next-auth/react";

const ApiPage = ({ params }: any) => {
  const { id } = params;
  // const { data: session } = useSession();
  const { session } = useAuthSession();
  const apiSelected = useApiById(id);
  const apiHealthStats = useApiHealthCheakStats({ apiIDs: [id] });

  const [apiLogsStats, setApiLogsStats] = useState<any>();

  const [apiRate, setApiRate] = useState(0);
  const apiRating = useAPIRating(Number(id));
  useEffect(() => {
    if (apiRating.isSuccess) {
      setApiRate(Number(apiRating.data.rating));
    }
  }, [apiRating.isFetched, apiRating.isFetching]);
  useEffect(() => {
    if (apiSelected.isSuccess) {
      setApiRate(Number(apiSelected.data.ApiRatings));
    }
  }, [apiSelected.isSuccess]);
  useEffect(() => {
    if (apiHealthStats.isSuccess) {
      console.log("apiHealthStats", apiHealthStats.data[0]);

      setApiLogsStats(apiHealthStats.data[0]);
    }
  }, [apiHealthStats.isSuccess]);

  return (
    <div className=" ">
      <Head>
        <title>Api</title>
      </Head>
      <Navbar shadowHide />
      {apiSelected.isLoading && <p>Loading ... </p>}
      {apiSelected.isSuccess && (
        <>
          <ApiHeader
            Name={apiSelected.data.Name}
            Description={apiSelected.data.Description}
            ImagePath={apiSelected.data.ImagePath}
            Rating={apiRate.toFixed(1)}
            Latency={apiLogsStats?.AverageResponseTime}
            Availability={apiLogsStats?.Availability * 100}
            api={apiSelected.data}
          />
          <ApiTabs
            api={apiSelected.data}
            api_id={id}
            user_id={session?.userId}
          />
        </>
      )}
    </div>
  );
};

export default ApiPage;
