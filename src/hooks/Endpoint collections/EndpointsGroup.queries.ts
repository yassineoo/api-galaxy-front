// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useEndpointsGroupList = (apiId: string) => {
  return useQuery({
    queryKey: ["EndpointsGroupList", apiId],
    queryFn: async () => {
      console.log("apiId from groups ====================", apiId);

      const response = await axios.get(`${ApiUrl}/endpoints-group/${apiId}`); // Adjust the endpoint
      return response.data;
    },
  });
};

export const useEndpointsGroupById = (apiId: string) => {
  return useQuery({
    queryKey: ["EndpointsGroup", apiId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/endpoints-group/${apiId}`); // Adjust the endpoint
      return response.data;
    },
  });
};
