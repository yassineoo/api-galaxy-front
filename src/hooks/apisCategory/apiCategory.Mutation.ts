// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiCategory, ApiCategoryCreation } from "./interfaces";
import { ApiUrl } from "@/utils/constants";

export const useCreateApiCategory = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ApiCategory) => {
      const response = await axios.post(`${ApiUrl}/categories`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiCategoryList"] });
    },
  });
};

export const useUpdateApiCategory = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: ApiCategory) => {
      const response = await axios.put(
        `${ApiUrl}/categories/${apiData.id}`,
        apiData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      ); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiCategoryList"] });
    },
  });
};

export const useDeleteApiCategory = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiCategoryList"] });
    },
  });
};
