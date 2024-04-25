// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useApiHealthCheakList = (data: any) => {
  return useQuery({
    queryKey: ["ApiHealthCheck", data.apiId, data.page, data.limit],
    queryFn: async () => {
      const response = await axios.get(
        `${ApiUrl}/apis-healthcheck/${data?.apiId}`,
        {
          params: { page: data?.page, limit: data?.limit }, // Add query parameters
        }
      ); // Adjust the endpoint
      // console.log("response from logs", response.data);
      // console.log("type  response from logs", typeof response.data);

      return response.data;
    },
  });
};

export const useApiHealthCheakStats = (data: any) => {
  return useQuery({
    queryKey: ["ApiHealthCheckstats", data.apiIDs],
    queryFn: async () => {
      const response = await axios.get(
        `${ApiUrl}/apis-healthcheck/health-stats`,
        {
          params: { apiIds: data.apiIDs }, // Add query parameters
        }
      ); // Adjust the endpoint
      // console.log("response from logs", response.data);
      // console.log("type  response from logs", typeof response.data);

      return response.data;
    },
  });
};
export const useApiLogsStatss = (endpointIds: number[]) => {
  return useQuery({
    queryKey: ["ApiLogsStats", endpointIds], // Adjust the queryKey
    queryFn: async () => {
      console.log(
        "endpointIds from logs stats ====================",
        endpointIds
      );

      const response = await axios.post(`${ApiUrl}/apis-logs/stats`, {
        EndpointIds: endpointIds,
      });
      console.log("response from logs stat", response.data);
      console.log("type response from logs stat", typeof response.data);

      return response.data;
    },
  });
};

export const useApiLogsStats = ({ endpointIds, timeFilter }: any) => {
  return useQuery({
    queryKey: ["ApiLogsStats", endpointIds, timeFilter], // Adjust the queryKey
    queryFn: async () => {
      console.log(
        "endpointIds from logs stats ====================",
        endpointIds
      );

      const response = await axios.post(`${ApiUrl}/apis-logs/stats`, {
        EndpointIds: endpointIds,
        TimeFilter: timeFilter,
      });
      console.log("response from logs stat", response.data);
      console.log("type response from logs stat", typeof response.data);

      return response.data;
    },
  });
};
