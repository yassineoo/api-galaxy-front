// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
//import { ApiPlans } from "./interfaces";

export const useCreateApiPlans = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("data create Plans  ============ ", data);

      const response = await axios.post(`${ApiUrl}/plans/`, data); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiPlansList"] });
    },
  });
};

export const useUpdateApiPlans = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: any) => {
      console.log("updateEndpoint ========== ", apiData);

      const response = await axios.patch(
        `${ApiUrl}/Plans/${apiData.ID}`,
        apiData
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

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/Plans/${id}`); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiPlansList"] });
    },
  });
};
