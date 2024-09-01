// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
import { useSession } from "next-auth/react";
//import { ApiPlans } from "./interfaces";

export const useCreateApiPlans = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession()

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("data create Plans  ============ ", data);

      const response = await axios.post(
        `${ApiUrl}/plans/`,
        data,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiPlansList"] });
    },
  });
};

export const useUpdateApiPlans = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession()

  return useMutation({
    mutationFn: async (apiData: any) => {
      console.log("updateEndpoint ========== ", apiData);

      const response = await axios.patch(
        `${ApiUrl}/plans/`,
        apiData,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiPlansList"] });
    },
  });
};

export const useDeleteApiPlans = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession()

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(
        `/plans/${id}`,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiPlansList"] });
    },
  });
};
