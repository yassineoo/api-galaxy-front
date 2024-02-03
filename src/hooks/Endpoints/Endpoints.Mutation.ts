// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
import { ApiEndpoints } from "./interfaces";

export const useCreateApiEndpoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (data.Parameters.length === 0) {
        const response = await axios.post(`${ApiUrl}/endpoints`, data); // Adjust the endpoint
        return response.data;
      } else {
        console.log("data", data);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};

export const useUpdateApiEndpoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: ApiEndpoints) => {
      const response = await axios.put(
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
