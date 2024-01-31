// DashboardPage.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/dashboard/header";
import Sidebar from "../../../components/dashboard/sidebar";
import { columns } from "@/components/dashboard/apiTable/apiColumns";
import { ApiTable } from "@/components/dashboard/apiTable/api-table";

export default function DashboardPage() {
  const [apis, setApis] = useState([]);

  useEffect(() => {
    const fetchApis = async () => {
      try {
        const response = await axios.get("http://localhost:5000/apis/"); // Replace with your actual API endpoint
        console.log(response.data.data.apis);

        setApis(response.data.data.apis);
      } catch (error) {
        console.error("Error fetching APIs:", error);
        // Handle error appropriately
      }
    };

    fetchApis();
  }, []);

  return (
    <div className="bg-dashboardBg flex">
      <Sidebar />

      <div className="w-full">
        <Header />

        <div className="container mx-auto py-10">
          <ApiTable columns={columns} data={apis} />
        </div>
      </div>
    </div>
  );
}
