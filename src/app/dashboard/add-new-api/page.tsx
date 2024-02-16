"use client";

import Sidebar from "@/components/dashboard/sidebar";

import AddNewApiForm from "@/components/addNewApi/genralTab/addApiPopUp";
import Header from "@/components/dashboard/header";
import { ApiConfigTabs } from "@/components/addNewApi/apiConfig";
import { useApiById } from "@/hooks/apis/api.queries";
import AddNewApiModal from "@/components/addNewApi/genralTab/addNewApiModal";

const AddApiPage = ({ params }: any) => {
  const { id } = params;
  const apiSelceted = useApiById(id);
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <Sidebar />

      <div className="w-full">
        <Header />
        <AddNewApiModal />
      </div>
    </div>
  );
};

export default AddApiPage;
