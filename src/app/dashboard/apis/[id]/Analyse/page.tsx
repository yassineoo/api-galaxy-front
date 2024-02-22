"use client";
import Sidebar from "@/components/dashboard/sidebar";

import AddNewApiForm from "@/components/addNewApi/genralTab/addApiPopUp";
import Header from "@/components/dashboard/header";
import { ApiConfigTabs } from "@/components/addNewApi/apiConfig";
import { useApiById } from "@/hooks/apis/api.queries";
import LoadingPage from "@/components/shared/loadingPage";
import NotFoundPage from "@/components/shared/errorPage";
import MultiSelect from "@/components/addNewApi/monitazation/object";
import { useApiEndpointsList } from "@/hooks/Endpoints/Endpoints.queries";
import { useState } from "react";

const AddApiPage = ({ params }: any) => {
  const { id } = params;
  const apiSelceted = useApiById(id);
  const endpointsList = useApiEndpointsList(id);

  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      {apiSelceted.isLoading && <LoadingPage />}
      {apiSelceted.isError && <NotFoundPage />}
      {apiSelceted.isSuccess && (
        <div className="w-full">
          <Header />
          {endpointsList.isLoading && <p>loading ...</p>}

          {endpointsList.isSuccess && (
            <Statis api={apiSelceted.data} endpointsList={endpointsList.data} />
          )}
        </div>
      )}
    </div>
  );
};

export default AddApiPage;

const Statis = ({ api, endpointsList }: any) => {
  console.log("endpointList", endpointsList);

  const handleSelectChange = (selectedOptions: any) => {
    setEndpointList(selectedOptions);
  };
  const options = endpointsList.map((item: any) => {
    return { value: item.ID, label: item.Name };
  });
  console.log("endpointList options", options);

  const [endpointList, setEndpointList] = useState([]);
  return (
    <div className=" w-full h-96 ">
      <h2 className="px-12 text-lg font-bold py-4  ">{api.Name} </h2>
      <div className="px-12 py-4">
        <MultiSelect
          options={options}
          selectedValues={endpointList}
          onChange={handleSelectChange}
        />
      </div>
    </div>
  );
};
