// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl, PaymentUrl } from "@/utils/constants";
import { useAuthSession } from "@/components/auth-provider";

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

export const useUpdateApiPlans = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {

      // Update the plan
      const response = await axios.patch(`${ApiUrl}/plans/`, data, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });

      console.log("Plan updated", response.data);

      // Assuming the response contains publicPlans like in the create function
      const stripePricePromises = response.data.map((plan: any) => {
        console.log("the plans in price",plan)
        return axios.post(
          `${PaymentUrl}/stripeCRUD/prices`,
          {
            planEntityId: plan.ID,
            stripeApiId: data.ProductId, // Adjust this based on what you need to send
            pricenumber: Number(plan.Price)*100, // Adjust the key if needed
          },
          {
            headers: { Authorization: `Bearer ${session?.token}` }, // Adjust the token if needed
          }
        );
      });

      // Wait for all Stripe price creations to complete
      const stripeResponses = await Promise.all(stripePricePromises);

      console.log("Stripe responses", stripeResponses);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
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
