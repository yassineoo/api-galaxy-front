// apiQueries.ts

import { useQuery } from "react-query";
import axios from "axios";

export const useApiList = () => {
  return useQuery("apiList", async () => {
    const response = await axios.get("/api/apis"); // Adjust the endpoint
    return response.data;
  });
};

export const useApiById = (apiId: string) => {
  return useQuery(["api", apiId], async () => {
    const response = await axios.get(`/api/apis/${apiId}`); // Adjust the endpoint
    return response.data;
  });
};
