"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";

const BillingForm = () => {
  const [page, setPage] = useState("paymentMethode");

  return (

    <div className="flex  w-full flex-col  items-center  justify-start  h-screen min-h-screen bg-gray-100 dark:bg-transparent">
      <div className=" w-full ml-4 mt-4">

        <h1 className="text-xl font-bold">Billing Information</h1>
      </div>
      <div
        className={`relative mt-6 z-20 rounded-lg shadow-md w-4/5 ${
          page === "paymentMethode" ? "h-3/5" : "h-4/5"
        } lg:h-[75%] xl:h-5/6`}
      >
        <img
          className="w-32 -top-16 -right-16 absolute -z-10"
          src="/icons/circleOr.svg"
        />
        <img
          className="w-32 -bottom-16 -left-16 absolute -z-10"
          src="/icons/circle.svg"
        />

        <div className="bg-white dark:bg-transparent w-full h-full relative z-0 flex justify-center items-center md:block">
          <img
            className={`hidden ${
              page === "paymentMethode" ? "md:flex" : "lg:flex"
            } md:h-full object-cover -z-10 absolute`}
            src="/icons/billing-bg.svg"
          />
          <MethodeForm setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

const stripeRequest = {
  priceIds: ["price_1OniR7GnW3CA9eUBfr0TCW46"],
  successPage: "success",
  cancelPage: "cancelled",
};

interface MethodeFormProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const MethodeForm: React.FC<MethodeFormProps> = ({ setPage }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("inter-cards");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setPaymentMethod(event.target.value);
  };

  return (
    <form
      className="absolute bg-white pl-4 md:left-[45%] lg:left-[45%] md:w-1/2 w-4/5"
      action="http://localhost:5000/payment-service/stripe-subscription/create-checkout-session"
      method="POST"
    >
         <fieldset className="mb-4">
        {/* Grouped Radio Buttons */}
        <div className="space-y-4">
          {/* Option 1 */}
          <div className="flex items-start space-x-2 px-2 py-1 lg:py-3 border border-black bg-white text-black rounded-lg">
            <input
              type="radio"
              id="inter-cards"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="inter-cards" className="flex flex-col">
              <span>Cards</span>
              <div className="flex space-x-2">
                <img className="w-7 lg:w-10" src="/images/visa.png" />
                <img className="w-7 lg:w-10" src="/images/mastercard.png" />
              </div>
            </label>
          </div>

          {/* Option 2 */}
          <div className="flex items-start space-x-2 px-2 py-1 lg:py-3 border border-black bg-white text-black rounded-lg">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="paypal" className="flex flex-col">
              <span>Paypal</span>
              <img className="w-14 lg:w-20" src="/images/paypal.png" />
            </label>
          </div>

        
        </div>
      </fieldset>

      <input
        className="hidden"
        type="text"
        name="priceId"
        value={stripeRequest.priceIds}
      />

      <Button
        type="submit"
        onClick={() => {
          setPage("card");
        }}
        className="absolute -bottom-4 right-[20%] w-1/3"
      >
        Next
      </Button>
    </form>
  );
};

export default BillingForm;
