// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const placeholderApis = axios.create({
  baseURL: "http://localhost:8000",
});

export const useApiCategoryList = () => {
  return useQuery({
    queryKey: ["apiCategoryList"],
    queryFn: async () => {
      const response = await placeholderApis.get(`/categoriesk`); // Adjust the endpoint
      console.log("api categoriee list", response.data)
      return response.data;
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
