// apiQueries.ts

import { ApiAuth, ApiUrl } from "@/utils/constants";

import { basedApiUrl } from "@/actions/api";

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const placeholderApis = axios.create({
  baseURL: "http://localhost:9000",
});

export const useApiCategoryList = () => {
  return useQuery({
    queryKey: ["apiCategoryList"],
    queryFn: async () => {
      try {
        const response = await basedApiUrl.get(
          `/userApi/categories`
          //`/categoriesk`,
          //  { headers: { Authorization: `Bearer ${authToken}` } }
        ); // Adjust the endpoint
        console.log("api categoriee list", response.data);
        console.log({ response });
        return response.data;
      } catch (e) {
        if (e instanceof AxiosError) console.log({ e: e.response?.data });
        return [];
      }
    },
  });
};

export const useApiCategoryById = (apiId: string) => {
  return useQuery({
    queryKey: ["apiCategory", apiId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/${apiId}`); // Adjust the endpoint
      return response.data;
    },
  });
};
