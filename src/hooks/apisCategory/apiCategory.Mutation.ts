// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiCategory, ApiCategoryCreation } from "./interfaces";
import { ApiUrl } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useAuthSession } from "@/components/auth-provider";

export const useCreateApiCategory = () => {
  const queryClient = useQueryClient();
  // const { data: session } = useSession()
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: ApiCategory) => {
      const response = await axios.post(
        `${ApiUrl}/categories`,
        data,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiCategoryList"] });
    },
  });
};

export const useUpdateApiCategory = () => {
  const queryClient = useQueryClient();
  // const { data: session } = useSession()
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (apiData: ApiCategory) => {
      const response = await axios.put(
        `${ApiUrl}/categories/${apiData.id}`,
        apiData,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiCategoryList"] });
    },
  });
};

export const useDeleteApiCategory = () => {
  const queryClient = useQueryClient();
  // const { data: session } = useSession()
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(
        `/categories/${id}`,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiCategoryList"] });
    },
  });
};
