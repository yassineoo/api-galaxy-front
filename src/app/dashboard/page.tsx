// DashboardPage.js
"use client";
import Header from "../../components/dashboard/header";
import Sidebar from "../../components/dashboard/sidebar";
import StatisticsBoxes from "../../components/dashboard/mainPage/stat";
import LineChartComponent from "../../components/dashboard/linechart";
import DonutChartComponent from "../../components/dashboard/mainPage/donutchart";
import FilterGroup from "../../components/dashboard/mainPage/filterGroupColor";
import { ApiSelection } from "../../components/dashboard/mainPage/apiSelcetion";

export default function DashboardPage() {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <Sidebar />

      <div className="w-full">
        <Header />
        <StatisticsBoxes />
        <ApiSelection />
        <FilterGroup />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">API Analytics</h2>
            <LineChartComponent />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Earnings</h2>
            <DonutChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
