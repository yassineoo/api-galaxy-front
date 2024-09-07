"use client";
import Sidebar from "@/components/dashboard/sidebar";

import AddNewApiForm from "@/components/addNewApi/genralTab/addApiPopUp";
import Header from "@/components/dashboard/header";
import { ApiConfigTabs } from "@/components/addNewApi/apiConfig";
import { useApiById } from "@/hooks/apis/api.queries";
import LoadingPage from "@/components/shared/loadingPage";
import NotFoundPage from "@/components/shared/errorPage";

const AddApiPage = ({ params }: any) => {
  const { id } = params;
  const apiSelceted = useApiById(id);

  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      {apiSelceted.isLoading && <LoadingPage />}
      {apiSelceted.isError && <NotFoundPage />}
      {apiSelceted.isSuccess && (
        <div className="w-full">
          <Header type="provider" />

          <ApiConfigTabs api={apiSelceted.data} />
        </div>
      )}
    </div>
  );
};

export default AddApiPage;
