// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiCategory, ApiCategoryCreation } from "./interfaces";
import { ApiUrl } from "@/utils/constants";

export const useCreateApiCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ApiCategory) => {
      const response = await axios.post(`${ApiUrl}/categories`, data); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiCategoryList"] });
    },
  });
};

export const useUpdateApiCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: ApiCategory) => {
      const response = await axios.put(
        `${ApiUrl}/categories/${apiData.id}`,
        apiData
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

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/categories/${id}`); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiCategoryList"] });
    },
  });
};
