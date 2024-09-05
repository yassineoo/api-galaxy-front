// useCreateCheckoutSession hook (stripe.service.ts)

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthSession } from "@/components/auth-provider";
import { CheckoutSessionData } from '@/hooks/EndpointsPayment/stripe.interfaces';
import { PaymentUrl } from "@/utils/constants";

export const useCreateCheckoutSession = () => {
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: CheckoutSessionData) => {
      const response = await axios.post(`${PaymentUrl}/stripe-subscription/create-checkout-session`, data, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.url) {
        // Redirect to Stripe Checkout page
        console.log(data.url)
        window.location.href = `${data.url}`;
      } else {
        console.error("No URL found in response data:", data);
      }
    },
    onError: (error) => {
      console.error("Error creating checkout session:", error);
      alert("There was an error creating the checkout session. Please try again.");
    },
  });
};

