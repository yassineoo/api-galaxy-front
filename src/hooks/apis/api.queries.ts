// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
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
      const response = await axios.get(`${ApiUrl}/apis/${apiId}`); // Adjust the endpoint
      return response.data;
    },
  });
};

export const useApiByUserId = (userId: number) => {
  return useQuery({
    queryKey: ["myApis", userId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/apis/user-apis/${userId}`); // Adjust the endpoint

      return response.data;
    },
  });
};
