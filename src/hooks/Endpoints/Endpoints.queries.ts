// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useApiEndpointsList = (apiId: string) => {
  return useQuery({
    queryKey: ["apiEndpointsList", apiId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/endpoints/${apiId}`); // Adjust the endpoint
      return response.data;
    },
  });
};

export const useApiEndpointsById = (apiId: string) => {
  return useQuery({
    queryKey: ["apiEndpoints", apiId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/endpoints/${apiId}`); // Adjust the endpoint
      return response.data;
    },
  });
};
