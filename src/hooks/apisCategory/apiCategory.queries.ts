// apiQueries.ts

import { ApiAuth, ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

export const placeholderApis = axios.create({
  baseURL: "http://localhost:5000/auth"//"http://localhost:5000/apis-services",
});

export const useApiCategoryList = () => {
  const { data: session } = useSession()
  return useQuery({
    queryKey: ["apiCategoryList"],
    queryFn: async () => {
      try {
        const response = await placeholderApis.get(
          "/categories",//`/categoriesk`,
          { headers: { Authorization: `Bearer ${session?.token}` } }
        ); // Adjust the endpoint
        console.log("api categoriee list", response.data)
        console.log({ response })
        return response.data;
      }
      catch (e) {
        if (e instanceof AxiosError) console.log({ e: e.response?.data })
        return []
      }
    },
  });
};

export const useApiCategoryById = (apiId: string) => {
  const { data: session } = useSession()
  return useQuery({
    queryKey: ["apiCategory", apiId],
    queryFn: async () => {
      const response = await axios.get(
        `${ApiUrl}/${apiId}`,
        { headers: { Authorization: `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
      return response.data;
    },
  });
};
