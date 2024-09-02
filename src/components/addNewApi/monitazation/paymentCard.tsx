import { useState } from 'react'; // Import useState hook
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
import { getSession } from "next-auth/react";

export function DemoPaymentMethod(plan: any) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <form
        action="http://localhost:4242/stripe-subscription/create-checkout-session"
        method="POST">
        <CardContent className="grid gap-2">
          <RadioGroup
            defaultValue="card"
            className="grid grid-cols-2 gap-2"
            onValueChange={(value) => setPaymentMethod(value)} // Update payment method on change
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
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="peer sr-only"
              />
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
            <Input id="name" name="name" placeholder="First Last" /> {/* Added name attribute */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" name="customerEmail" placeholder="e-mail here" /> {/* Added name attribute */}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Continue</Button>
        </CardFooter>

        <input
          className="hidden"
          type="text"
          name="paymentMethod"
          value={paymentMethod} // Include selected payment method
        />
        <input
          className="hidden"
          type="text"
          name="priceId"
          value={"price_1OniR7GnW3CA9eUBfr0TCW46"} // plan.productId of stripe
        />
      </form>
    </Card>
  );
}
