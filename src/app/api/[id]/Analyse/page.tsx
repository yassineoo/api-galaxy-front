"use client";
import Head from "next/head";

import Navbar from "../../../../components/General use/navbar";
import ApiHeader from "../../apiHeader";
import { ApiTabs } from "../../apiBody";
import { useApiById } from "@/hooks/apis/api.queries";

const DashboardPage = ({ params }: any) => {
  const { id } = params;
  const apiSelceted = useApiById(id);
  return (
    <div className=" ">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar services="2" about="3" pricing="4" contacts="6" />
      {apiSelceted.isLoading && <p>Loading ... </p>}
      {apiSelceted.isSuccess && <></>}
    </div>
  );
};

export default DashboardPage;
