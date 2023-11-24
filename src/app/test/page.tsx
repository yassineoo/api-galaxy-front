"use client";
import Head from "next/head";
import LineChartComponent from "../components/dashboard/linechart";
import DonutChartComponent from "../components/dashboard/mainPage/donutchart";
import { use } from "react";

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
        <title>Dashboard</title>
      </Head>
    </div>
  );
};

export default DashboardPage;
