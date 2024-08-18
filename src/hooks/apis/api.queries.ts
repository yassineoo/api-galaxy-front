// apiQueries.ts

import { Api } from "@/app/dashboard/apis/[id]/Analyse/api.interface";
import { API_URLO, ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useApiList = ({ page = 1, limit = 10, filter = 0, search = "" }: any) => {
  return useQuery<Api[]>({
    queryKey: ["apiList", page, limit, filter, search],
    queryFn: async () => {
      try {
        console.log("apiUrl : ", `${ApiUrl}/apis`);
        //  axios.defaults.baseURL = "http://localhost:5000";

        const response = await axios.get(`${API_URLO}/apis-service/apis`, {
          params: { page, limit, filter, search },
        });
        console.log("response from api quety : ", response.data);

        return response.data;
      } catch (error) {
        console.log({ error })
        if (error instanceof AxiosError) throw new Error(error.response?.data.message)
        if (error instanceof Error) throw new Error(error.message)
        else throw new Error("Internal Server Error")
      }
    },
  });
};
export const useSearchApiList = ({ search }: { search: string }) => {
  return useQuery<Api[]>({
    queryKey: ["apiListSearch", search],
    queryFn: async () => {
      console.log("logged from api quety : ", search);

      const response = await axios.get(`${ApiUrl}/apis/search`, {
        params: { search }, // Add query parameters
      });
      console.log(response.data)
      return (response.data as { data: Api[] }).data;
    },
  });
};

export const useApiById = (apiId: number) => {
  return useQuery<Api>({
    queryKey: ["api", apiId],
    queryFn: async () => {
      console.log("function excuted getting apis by id");

      const response = await axios.get(`${ApiUrl}/apis/${apiId}`); // Adjust the endpoint

      return response.data;
    },
  });
};

export const useApiByUserId = (userId: number) => {
  return useQuery<Api[]>({
    queryKey: ["myApis", userId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/apis/user-apis/${userId}`); // Adjust the endpoint

      console.log({ response })
      return response.data.data;
    },
  });
};

// export function useApi