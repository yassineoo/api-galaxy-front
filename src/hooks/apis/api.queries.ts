// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useApiList = ({ page, limit, filter, search }: any) => {
  return useQuery({
    queryKey: ["apiList", page, limit, filter, search],
    queryFn: async () => {
      console.log("logged from api quety : ", page, limit, filter, search);

      const response = await axios.get(`${ApiUrl}/apis`, {
        params: { page, limit, filter, search }, // Add query parameters
      });
      return response.data;
    },
  });
};

export const useApiById = (apiId: string) => {
  return useQuery({
    queryKey: ["api", apiId],
    queryFn: async () => {
      console.log("function excuted getting apis by id");

      const response = await axios.get(`${ApiUrl}/apis/${apiId}`); // Adjust the endpoint
      console.log(response.data);

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
