// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { placeholderApis } from "../apisCategory/apiCategory.queries";

export const useApiList = ({ page, limit, filter, search }: any) => {
  return useQuery({
    queryKey: ["apiList", page, limit, filter, search],
    queryFn: async () => {
      console.log("apiUrl : ", `${ApiUrl}/apis`);
      //  axios.defaults.baseURL = "http://localhost:5000";

      const response = await placeholderApis.get(`/apis/`, {
        params: { page, limit, filter, search },
      });
      console.log("response from api quety : ", response.data);

      return response.data;
    },
  });
};
export const useSearchApiList = ({ search }: any) => {
  return useQuery({
    queryKey: ["apiListSearch", search],
    queryFn: async () => {
      console.log("logged from api quety : ", search);

      const response = await axios.get(`${ApiUrl}/apis/search`, {
        params: { search }, // Add query parameters
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
