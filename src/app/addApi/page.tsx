"use client";

import Sidebar from "@/components/dashboard/sidebar";

import AddNewApiForm from "@/components/addNewApi/genralTab/addApiPopUp";
import Header from "@/components/dashboard/header";
import { ApiConfigTabs } from "@/components/addNewApi/apiConfig";

const AddApiPage = () => {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <Sidebar />

      <div className="w-full">
        <Header />
        <ApiConfigTabs />
      </div>
    </div>
  );
};

export default AddApiPage;
