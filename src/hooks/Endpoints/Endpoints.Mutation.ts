// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
import { ApiEndpoints } from "./interfaces";
import { useSession } from "next-auth/react";

import { useAuthSession } from "@/components/auth-provider";

export const useCreateApiEndpoints = () => {
  const queryClient = useQueryClient();
  // const { data: session } = useSession()
  const { session } = useAuthSession();


  return useMutation({
    mutationFn: async (data: any) => {
      console.log("data ============ ", data);

      const response = await axios.post(
        `${ApiUrl}/endpoints`,
        data,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};

export const useCreateExtractedApiEndpoints = () => {
  const queryClient = useQueryClient();

  // const { data: session } = useSession()
  const { session } = useAuthSession();


  return useMutation({
    mutationFn: async (data: any) => {
      console.log("data ============ ", data);

      const response = await axios.post(
        `${ApiUrl}/endpoints/multi`,
        data,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};

export const useUpdateApiEndpoints = () => {
  const queryClient = useQueryClient();

  // const { data: session } = useSession()
  const { session } = useAuthSession();


  return useMutation({
    mutationFn: async (apiData: Partial<ApiEndpoints>) => {
      const response = await axios.patch(
        `${ApiUrl}/endpoints/${apiData.ID}`,
        apiData,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
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

  // const { data: session } = useSession()
  const { session } = useAuthSession();


  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(
        `${ApiUrl}/endpoints/${id}`,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiEndpointsList"] });
    },
  });
};
