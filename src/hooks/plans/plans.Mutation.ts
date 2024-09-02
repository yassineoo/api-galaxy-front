// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";

//import { ApiPlans } from "./interfaces";

export const useCreateApiPlans = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("data create Plans  ============ ", data);

      const response = await axios.post(`${ApiUrl}/plans/`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiPlansList"] });
    },
  });
};

export const useUpdateApiPlans = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: any) => {
      console.log("updateEndpoint ========== ", apiData);

      const response = await axios.patch(`${ApiUrl}/plans/`, apiData, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiPlansList"] });
    },
  });
};

export const useDeleteApiPlans = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/plans/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiPlansList"] });
    },
  });
};
