// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
import { EndpointsGroup, EndpointsGroupCreation } from "./interfaces";

export const useCreateEndpointsGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EndpointsGroupCreation) => {
      const response = await axios.post(`${ApiUrl}/endpoints-group`, data); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EndpointsGroupList"] });
    },
  });
};

export const useUpdateEndpointsGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: EndpointsGroup) => {
      const response = await axios.put(
        `${ApiUrl}/endpoints-group/${apiData.ID}`,
        apiData
      ); // Adjust the endpoint
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EndpointsGroupList"] });
    },
  });
};

export const useDeleteEndpointsGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/endpoints-group/${id}`); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EndpointsGroupList"] });
    },
  });
};
