// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCollectionList = (apiId: string) => {
  return useQuery({
    queryKey: ["CollectionList", apiId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/api-collections/`); // Adjust the endpoint
      return response.data;
    },
  });
};
