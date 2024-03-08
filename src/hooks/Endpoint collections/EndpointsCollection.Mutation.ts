// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
import { Collection, CollectionCreation } from "./interfaces";

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CollectionCreation) => {
      const response = await axios.post(`${ApiUrl}/api-collections`, data); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CollectionList"] });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: Collection) => {
      const response = await axios.patch(
        `${ApiUrl}/api-collections/${apiData.ID}`,
        apiData
      ); // Adjust the endpoint
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CollectionList"] });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${ApiUrl}/api-collections/${id}`); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CollectionList"] });
    },
  });
};
