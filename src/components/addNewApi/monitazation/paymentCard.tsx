
import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useCreateCheckoutSession } from '@/hooks/EndpointsPayment/stripe.service';
import {  CheckoutSessionData } from '@/hooks/EndpointsPayment/stripe.interfaces';

import { useSession } from "next-auth/react";
import { useGetCustomerByEmail } from "@/hooks/EndpointsPayment/endpoints.queries";


export function DemoPaymentMethod(plan: any) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [customerEmail, setCustomerEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [clientExists, setClientExists] = useState(false); // State to track if the client exists

  const { data: session } = useSession();
  const email = session?.user?.email || "";
  const name = session?.user?.name;
  const userid = session?.userId.toString() || "";


  const { data: stripeUserCheck, refetch } = useGetCustomerByEmail(email);
  const { mutate, isPending } = useCreateCheckoutSession();

  useEffect(() => {
    if (stripeUserCheck && (email !== "")) {  // Ensure email and stripeUserCheck exist
      setCustomerEmail(email);
      setFullName(name || "");
      setClientExists(true); // Set clientExists to true if the user is found
      console.log()
    }
  }, [stripeUserCheck, email, name]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data: CheckoutSessionData = {
      paymentMethod,
      customerEmail,
      priceId: plan.plan.StripePriceId,
      success_url: "/api/success",
      cancel_url: "/api/cancelled",
      userId: userid,
      planId: plan.plan.ID,
      amount: plan.plan.Price,
    };

    console.log("data body", data);
    console.log("-- plan", plan.plan);

    mutate(data, {
      onSuccess: () => {
        console.log("Checkout session created successfully.");
      },
      onError: (error) => {
        console.error("Error creating checkout session:", error);
      }
    });
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>

        <CardContent className="grid gap-2">
          <RadioGroup
            defaultValue="card"
            className="grid grid-cols-2 gap-2"

            onValueChange={(value) => setPaymentMethod(value)}

          >
            <div>
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mb-3 h-6 w-6"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                Card
              </Label>
            </div>
            <div>

              <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />

              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <img src="/images/paypal.png" className="mb-3 h-6 w-12" />
                Paypal
              </Label>
            </div>
          </RadioGroup>
          <div className="grid gap-2">
            <Label htmlFor="name">Full name:</Label>

            <Input
              id="name"
              name="name"
              placeholder="First Last"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={clientExists} // Disable if client exists
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              name="customerEmail"
              placeholder="e-mail here"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              disabled={clientExists} // Disable if client exists
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Processing...' : 'Continue'}
          </Button>
        </CardFooter>

      </form>
    </Card>
  );
}
