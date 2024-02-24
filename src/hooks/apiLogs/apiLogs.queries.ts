// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useApiLogsList = (apiId: string) => {
  return useQuery({
    queryKey: ["ApiLogs", apiId],
    queryFn: async () => {
      console.log("apiId from logs ====================", apiId);

      const response = await axios.get(`${ApiUrl}/apis-logs/${apiId}`); // Adjust the endpoint
      console.log("response from logs", response.data);
      console.log("type  response from logs", typeof response.data);

      return response.data;
    },
  });
};
