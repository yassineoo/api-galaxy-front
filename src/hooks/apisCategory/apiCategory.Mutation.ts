// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Api, ApiCreation } from "./interfaces";
import { ApiUrl } from "@/utils/constants";

export const useCreateApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: ApiCreation) => {
      const response = await axios.post(`${ApiUrl}/apis`, apiData); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiList"] });
    },
  });
};

export const useUpdateApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: Api) => {
      const response = await axios.put(`${ApiUrl}/apis/${apiData.id}`, apiData); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiList"] });
    },
  });
};

export const useDeleteApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiId: string) => {
      await axios.delete(`/apis/${apiId}`); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiList"] });
    },
  });
};
