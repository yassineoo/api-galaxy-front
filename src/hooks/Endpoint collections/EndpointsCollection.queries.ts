// apiQueries.ts

import { ApiAuth, ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useCollectionList = ({ authToken }: { authToken: string }) => {
  return useQuery({
    queryKey: ["CollectionList"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          // `${ApiUrl}/api-collections/`,
          `${ApiAuth}/api-collections/`,
          // { headers: { Authorization: `Bearer ${authToken}` } }
        ); // Adjust the endpoint
        console.log({ response })
        return response.data;
      }
      catch (error) {
        console.log({ error })
      }
    },
  });
};
