// apiQueries.ts

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiUrl } from "@/utils/constants";
import { useAuthSession } from "@/components/auth-provider";

// Fetch all customers
export const useListCustomers = () => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/stripeCRUD/customers`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};

// Fetch a customer by ID
export const useGetCustomerById = (customerId: string) => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["customer", customerId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/stripeCRUD/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};

// Fetch customer transaction history
export const useGetCustomerTransactionHistory = (customerId: string) => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["customerTransactionHistory", customerId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/stripeCRUD/customers/${customerId}/transactions`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};

// Fetch all products
export const useGetProducts = () => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/stripeCRUD/products`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};

// Fetch a product by ID
export const useGetProductById = (productId: string) => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/stripeCRUD/products/${productId}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};

// Fetch prices of a specific product
export const useGetPrices = (productId: string) => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["prices", productId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/stripeCRUD/prices/${productId}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};

// Fetch all subscriptions
export const useGetSubscriptions = () => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/subscription/subscriptions`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};

// Fetch subscriptions by user ID
export const useGetUserSubscriptions = (userId: string) => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["userSubscriptions", userId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/subscription/subscriptions/${userId}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};

// Fetch all plans
export const useGetPlans = () => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/subscription/plans`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};

// Fetch all object plans
export const useGetObjectPlans = () => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["objectPlans"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/subscription/object-plans`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
  });
};


export const useGetSubscribersForProvider = (providerId: string) => {
  const { session } = useAuthSession();

  return useQuery({
    queryKey: ["subscribers", providerId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/subscription/providers/${providerId}`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    enabled: !!providerId,
  });
};