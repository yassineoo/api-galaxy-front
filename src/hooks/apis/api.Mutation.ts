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
      const response = await axios.put(`${ApiUrl}/apis/${apiData.ID}`, apiData); // Adjust the endpoint
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
      await axios.delete(`${ApiUrl}/apis/${apiId}`); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiList"] });
    },
  });
};

export const useUpdateDocs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      docsId: number;
      Content: string;
      apiID: number;
    }) => {
      await axios.patch(`${ApiUrl}/apis-docs/${data.docsId}`, data); // Adjust the endpoint
    },

    onSuccess: (_, variables) => {
      // Invalidate the specific API query by its ID
      queryClient.invalidateQueries({
        queryKey: ["api", variables?.apiID?.toString()],
      });
    },
  });
};

export const useSendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (RequestData: Api) => {
      const response = await axios.put(`${ApiUrl}/send-request/`, RequestData); // Adjust the endpoint
      return response.data;
    },
  });
};
