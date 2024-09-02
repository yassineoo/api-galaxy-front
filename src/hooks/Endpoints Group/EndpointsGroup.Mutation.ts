// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
import { EndpointsGroup, EndpointsGroupCreation } from "./interfaces";

export const useCreateEndpointsGroup = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EndpointsGroupCreation) => {
      const response = await axios.post(`${ApiUrl}/endpoints-group`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EndpointsGroupList"] });
    },
  });
};

export const useUpdateEndpointsGroup = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: EndpointsGroup) => {
      const response = await axios.patch(
        `${ApiUrl}/endpoints-group/${apiData.ID}`,
        apiData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      ); // Adjust the endpoint
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EndpointsGroupList"] });
    },
  });
};

export const useDeleteEndpointsGroup = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/endpoints-group/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EndpointsGroupList"] });
    },
  });
};
