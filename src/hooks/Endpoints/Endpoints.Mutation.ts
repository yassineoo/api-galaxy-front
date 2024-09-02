// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ApiUrl = "http://localhost:9000";

import { ApiEndpoints } from "./interfaces";

export const useCreateApiEndpoints = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("data ============ ", data);

      const response = await axios.post(`${ApiUrl}/endpoints`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};

export const useCreateExtractedApiEndpoints = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("data ============ ", data);

      const response = await axios.post(`${ApiUrl}/endpoints/multi`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};

export const useUpdateApiEndpoints = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: Partial<ApiEndpoints>) => {
      const response = await axios.patch(
        `${ApiUrl}/endpoints/${apiData.ID}`,
        apiData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      ); // Adjust the endpoint
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};

export const useDeleteApiEndpoints = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${ApiUrl}/endpoints/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};
