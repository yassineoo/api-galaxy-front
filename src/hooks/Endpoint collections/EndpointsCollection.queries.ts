// apiQueries.ts

import { ApiAuth, ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCollectionList = () => {
  return useQuery({
    queryKey: ["CollectionList"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${ApiUrl}/api-collections/`
          //  `${ApiAuth}/api-collections/`,
          // { headers: { Authorization: `Bearer ${authToken}` } }
        ); // Adjust the endpoint
        console.log({ response });
        return response.data;
      } catch (error) {
        console.log({ error });
      }
    },
  });
};
