// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiUrl, PaymentUrl } from "@/utils/constants";
import { useAuthSession } from "@/components/auth-provider";

// Create a new customer
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${ApiUrl}/stripeCRUD/customers`, data, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"]});
    },
  });
};

// Update a customer
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const { customerId, ...updateData } = data;
      const response = await axios.put(`${ApiUrl}/stripeCRUD/customers/${customerId}`, updateData, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// Delete a customer
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (customerId: string) => {
      await axios.delete(`${ApiUrl}/stripeCRUD/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// Create a new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${ApiUrl}/stripeCRUD/products`, data, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Update a product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const { productId, ...updateData } = data;
      const response = await axios.put(`${ApiUrl}/stripeCRUD/products/${productId}`, updateData, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (productId: string) => {
      await axios.delete(`${ApiUrl}/stripeCRUD/products/${productId}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Create a new price
export const useCreatePrice = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${ApiUrl}/stripeCRUD/prices`, data, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
    },
  });
};

// Create a new subscription
export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${ApiUrl}/subscription/subscriptions`, data, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

// Update a subscription
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const { id, ...updateData } = data;
      const response = await axios.put(`${ApiUrl}/subscription/subscriptions/${id}`, updateData, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

// Delete a subscription
export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${ApiUrl}/subscription/subscriptions/${id}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

// Create a new plan
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
      const stripePricePromises = response.data.publicPlans.map((plan: any) => {
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
// Update a plan
export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const { id, ...updateData } = data;

      // Update the plan
      const response = await axios.put(`${ApiUrl}/subscription/plans/${id}`, updateData, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });

      console.log("Plan updated", response.data);

      // Assuming the response contains publicPlans like in the create function
      const stripePricePromises = response.data.publicPlans.map((plan: any) => {
        console.log("the plans in price",plan)
        return axios.post(
          `${PaymentUrl}/stripeCRUD/prices`,
          {
            planEntityId: plan.ID,
            stripeApiId: plan.ApiID, // Adjust this based on what you need to send
            pricenumber: plan.Price, // Adjust the key if needed
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


// Delete a plan
export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${ApiUrl}/subscription/plans/${id}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

// Create a new object plan
export const useCreateObjectPlan = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${ApiUrl}/subscription/object-plans`, data, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectPlans"] });
    },
  });
};

// Update an object plan
export const useUpdateObjectPlan = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const { id, ...updateData } = data;
      const response = await axios.put(`${ApiUrl}/subscription/object-plans/${id}`, updateData, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectPlans"] });
    },
  });
};

// Delete an object plan
export const useDeleteObjectPlan = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${ApiUrl}/subscription/object-plans/${id}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectPlans"] });
    },
  });
};
