// apiQueries.ts

import { ChartData } from "@/app/dashboard/apis/[id]/Analyse/data";
import {
  LogStat,
  TimeRangeFilter,
} from "@/app/dashboard/apis/[id]/Analyse/interfaces";
import { useAuthSession } from "@/components/auth-provider";
import { ApiStatUrl, ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useApiLogsList = (data: any) => {
  return useQuery<{
    logs: any[],
    meta: {
      totalItems: number,
      itemCount: number,
      itemsPerPage: number,
      totalPages: number,
      currentPage: number
    }
  }>({
    queryKey: ["ApiLogs", data.apiId, data.page, data.limit],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/apis-logs/${data?.apiId}`, {
        params: { page: data?.page, limit: data?.limit }, // Add query parameters
      }); // Adjust the endpoint
      // console.log("response from logs", response.data);
      // console.log("type  response from logs", typeof response.data);
      console.log({ response: response, data: response.data })
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

export const useEndpointsLogsStats = ({
  endpointIds,
  timeFilter,
}: {
  endpointIds: number[];
  timeFilter: TimeRangeFilter;
}) => {
  const { session } = useAuthSession()
  return useQuery<ChartData[]>({
    queryKey: ["EndpointsLogsStats", endpointIds, timeFilter], // Adjust the queryKey
    queryFn: async () => {
      console.log(
        "endpointIds from logs stats ====================",
        endpointIds
      );

      // const response = await axios.post(`${ApiUrl}/apis-logs/stats`, {
      //   EndpointIds: endpointIds,
      //   TimeFilter: timeFilter,
      // });
      try {
        const response = await axios.post(
          `http://localhost:7001/stats/endpoints?duration=${timeFilter}`,
          { endpoint_ids: endpointIds },
          {
            headers: {
              Authorization: `Bearer ${session?.token}`
            }
          }
        );
        // /endpoints
        console.log({ endpointIds });
        console.log({ data: response.data });
        console.log("response from logs stat", response.data);
        console.log("type response from logs stat", typeof response.data);

        return response.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e.response?.data);
          throw e;
        }
      }
      //body: { duration: timeFilter, endpointIds }
    },
  });
};

export function useApisStatsQuery({
  apiIds,
  timeFilter,
}: {
  apiIds: number[];
  timeFilter: TimeRangeFilter;
}) {
  const { session } = useAuthSession()
  return useQuery<ChartData[]>({
    queryKey: ["ApiLogsStats", apiIds, timeFilter],
    queryFn: async () => {
      try {
        console.log("endpointIds from logs stats ====================", apiIds);

        const response = await axios.post(
          `http://localhost:7001/stats/apis?duration=${timeFilter}`,
          { api_ids: apiIds },
          {
            headers: {
              Authorization: `Bearer ${session?.token}`
            }
          }
        );
        // /endpoints
        console.log({ apiIds });
        console.log("stat res ,", { data: response.data });
        // console.log("response from logs stat", response.data);
        // console.log("type response from logs stat", typeof response.data);

        return response.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log({ e: e })
          console.log(e.response?.data);
          throw e;
        }
      }
    },
  });
}
