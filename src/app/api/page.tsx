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
    <div className=" ">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar services="2" about="3" pricing="4" contacts="6" />
      <ApiHeader />
      <ApiTabs />
    </div>
  );
};

export default DashboardPage;
