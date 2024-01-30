// apiQueries.ts

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useApiList = () => {
  return useQuery({
    queryKey: ["apiList"],
    queryFn: async () => {
      const response = await axios.get("/apis"); // Adjust the endpoint
      return response.data;
    },
  });
};

export const useApiById = (apiId: string) => {
  return useQuery({
    queryKey: ["api", apiId],
    queryFn: async () => {
      const response = await axios.get(`/apis/${apiId}`); // Adjust the endpoint
      return response.data;
    },
  });
};
