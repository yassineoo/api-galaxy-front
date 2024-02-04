// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
import { ApiEndpoints } from "./interfaces";

export const useCreateApiEndpoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("data ============ ", data);

      const response = await axios.post(`${ApiUrl}/endpoints`, data); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};

export const useUpdateApiEndpoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: Partial<ApiEndpoints>) => {
      console.log("updateEndpoint ========== ", apiData);

      const response = await axios.patch(
        `${ApiUrl}/endpoints/${apiData.id}`,
        apiData
      ); // Adjust the endpoint
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};

export const useDeleteApiEndpoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/endpoints/${id}`); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};
