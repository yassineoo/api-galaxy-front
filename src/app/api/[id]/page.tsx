"use client";
import Head from "next/head";
import LineChartComponent from "../../../components/dashboard/linechart";
import DonutChartComponent from "../../../components/dashboard/mainPage/donutchart";
import { useEffect, useState } from "react";

import Navbar from "../../../components/General use/navbar";
import ApiHeader from "../apiHeader";
import { ApiTabs } from "../apiBody";
import { useApiById,useAPIRating } from "@/hooks/apis/api.queries";
import { useApiHealthCheakStats } from "@/hooks/HealthCheak/apiHealthCheak.queries";
import { useSession } from "next-auth/react";

const DashboardPage = ({ params }: any) => {
  const { id } = params;
  const {data:session} = useSession()
  const apiSelected = useApiById(id);
  const apiHealthStats = useApiHealthCheakStats({ apiIDs: [id] });

  const [apiLogsStats, setApiLogsStats] = useState<any>();

  const [apiRate,setApiRate]=useState(0)
  console.log(apiSelected.data,"hello")
  const apiRating = useAPIRating(Number(id))
  useEffect(()=>{
      if(apiRating.isSuccess){
        setApiRate(Number(apiRating.data.rating))
      }
  },[apiRating.isFetched,apiRating.isFetching])
  useEffect(()=>{
    if(apiSelected.isSuccess){
        setApiRate(Number(apiSelected.data.Rating))
    }
},[apiSelected.isSuccess])
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
            api={apiSelceted.data}
          />
          <ApiTabs api={apiSelected.data} api_id = {id} user_id ={session?.userId} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
