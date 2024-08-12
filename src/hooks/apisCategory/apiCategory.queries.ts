// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useApiCategoryList = () => {
  return useQuery({
    queryKey: ["apiCategoryList"],
    queryFn: async () => {
      const ApiUrlo = "http://localhost:5000";
      const response = await axios.get(`${ApiUrlo}/apis-service/categories`); // Adjust the endpoint
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
