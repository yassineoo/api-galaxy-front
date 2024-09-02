// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
import { Collection, CollectionCreation } from "./interfaces";

export const useCreateCollection = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CollectionCreation) => {
      const response = await axios.post(`${ApiUrl}/api-collections`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CollectionList"] });
    },
  });
};

export const useUpdateCollection = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: Collection) => {
      const response = await axios.patch(
        `${ApiUrl}/api-collections/${apiData.ID}`,
        apiData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      ); // Adjust the endpoint
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CollectionList"] });
    },
  });
};

export const useDeleteCollection = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${ApiUrl}/api-collections/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CollectionList"] });
    },
  });
};
