// types.ts
export interface CheckoutSessionData {
  paymentMethod: string;  // The payment method type (e.g., 'card', 'paypal')
  customerEmail?: string;  // Optional: Customer email for pre-filling the checkout form
  customerId?: string;     // Optional: Stripe customer ID if you have an existing customer
  priceId: string;         // The ID of the price object in Stripe
  success_url: string;     // URL to redirect to after a successful checkout
  cancel_url: string;      // URL to redirect to if the checkout is canceled
  userId: string;          // Internal user ID for your system
  planId: string;          // Plan ID for creating the subscription
  amount: number;          // Total amount for the transaction (e.g., in cents for Stripe)
}

export interface CheckoutSessionCommissionData {
  providerStripeAccountId: string; // stripe account id of the provider
  paymentMethod: string;  // The payment method type (e.g., 'card', 'paypal')
  customerEmail?: string;  // Optional: Customer email for pre-filling the checkout form
  customerId?: string;     // Optional: Stripe customer ID if you have an existing customer
  priceId: string;         // The ID of the price object in Stripe
  success_url: string;     // URL to redirect to after a successful checkout
  cancel_url: string;      // URL to redirect to if the checkout is canceled
  userId: string;          // Internal user ID for your system
  planId: string;          // Plan ID for creating the subscription
  amount: number;
}