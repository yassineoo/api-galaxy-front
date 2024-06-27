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
    <div className="w-full h-full overflow-scroll">
      <Header />
      <div className="flex w-full h-full justify-center items-center flex-col pt-8 gap-8">
        <img
          src="/images/create-api.jpg"
          alt="create api"
          className="w-96 h-80 "
        />
        <AddNewApiModal />
      </div>
    </div>
  );
};

export default AddApiPage;
