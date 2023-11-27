"use client";
import Head from "next/head";
import LineChartComponent from "../components/dashboard/linechart";
import DonutChartComponent from "../components/dashboard/mainPage/donutchart";
import { use } from "react";

import Navbar from "../components/General use/navbar";
import ApiHeader from "./apiHeader";
import { ApiTabs } from "./apiBody";

const DashboardPage = () => {
  return (
    <div className="bg-white ">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar />
      <ApiHeader />
      <ApiTabs />
    </div>
  );
};

export default DashboardPage;
