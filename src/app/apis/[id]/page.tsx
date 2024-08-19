"use client";
import Head from "next/head";
import Navbar from "../../../components/General use/navbar";
import ApiHeader from "../../api/apiHeader";
import { ApiTabs } from "../../api/apiBody";
import { useApiById, useAPIRating } from "@/hooks/apis/api.queries";
import { useEffect, useState } from "react";

const DashboardPage = ({ params }: any) => {
  const { id } = params;
  const apiSelected = useApiById(id);
  return (
    <div className=" ">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar services="2" about="3" pricing="4" contacts="6" />
      {apiSelected.isLoading && <p>Loading ... </p>}
      {apiSelected.isSuccess && (
        <>
          <ApiHeader
            Name={apiSelected.data.Name}
            Description={apiSelected.data.Description}
            ImagePath={apiSelected.data.ImagePath}
            Rating={apiSelected.data.Rating}
          />
          <ApiTabs api={apiSelected.data} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
