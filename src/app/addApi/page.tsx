"use client";

import Sidebar from "@/components/dashboard/sidebar";

import AddNewApiForm from "@/components/addNewApi/generalCard";
import Header from "@/components/dashboard/header";

const AddApiPage = () => {
  return (
    <div className="bg-dashboardBg dark:bg-transparent flex ">
      <Sidebar />

      <div className="w-full">
        <Header />

        <AddNewApiForm />
      </div>
    </div>
  );
};

export default AddApiPage;
