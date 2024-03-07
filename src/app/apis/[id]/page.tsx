"use client";
import Head from "next/head";
import LineChartComponent from "../../../components/dashboard/linechart";
import DonutChartComponent from "../../../components/dashboard/mainPage/donutchart";
import { use } from "react";

import Navbar from "../../../components/General use/navbar";
import ApiHeader from "../../api/apiHeader";
import { ApiTabs } from "../../api/apiBody";
import { useApiById } from "@/hooks/apis/api.queries";

const DashboardPage = ({ params }: any) => {
  const { id } = params;
  const apiSelceted = useApiById(id);
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
          />
          <ApiTabs api={apiSelceted.data} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
