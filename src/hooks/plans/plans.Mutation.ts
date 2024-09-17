// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl, PaymentUrl } from "@/utils/constants";

//import { ApiPlans } from "./interfaces";

export const useCreateApiPlans = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("data create Plans  ============ ", data);

      const response = await axios.post(`${ApiUrl}/plans/`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint

      console.log("response.dataaaaaaaaaaa", response.data); // Array of plan entities

      // Array of promises for creating Stripe prices
      const stripePricePromises = response.data.map((plan: any) => {
        return axios.post(
          `${PaymentUrl}/stripeCRUD/prices`,
          {
            planEntityId: plan.ID,
            stripeApiId: plan.ApiID, // Adjust this based on what you need to send
            pricenumber: plan.Price, // Adjust the key if needed
          },
          {
            headers: { Authorization: `Bearer ${authToken}` }, // Adjust the token if needed
          }
        );
      });

      // Wait for all Stripe price creations to complete
      const stripeResponses = await Promise.all(stripePricePromises);

      console.log("Stripe responses", stripeResponses);
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
    mutationFn: async (data: any) => {
      // Update the plan
      const response = await axios.patch(`${ApiUrl}/plans/`, data, {});

      console.log("Plan updated", response.data);

      // Assuming the response contains publicPlans like in the create function
      const stripePricePromises = response.data.map((plan: any) => {
        console.log("the plans in price", plan);
        return axios.post(`${PaymentUrl}/stripeCRUD/prices`, {
          planEntityId: plan.ID,
          stripeApiId: data.ProductId, // Adjust this based on what you need to send
          pricenumber: Number(plan.Price) * 100, // Adjust the key if needed
        });
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
