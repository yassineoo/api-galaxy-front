// apiQueries.ts

import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCollectionList = () => {
  return useQuery({
    queryKey: ["CollectionList"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/api-collections/`); // Adjust the endpoint
      return response.data;
    },
  });
};
