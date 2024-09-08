"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";

const BillingForm = () => {
  const [page, setPage] = useState("paymentMethode");

  return (
    <div className="flex w-full flex-col items-center justify-start h-[500px] bg-gray-50 dark:bg-gray-900 overflow-x-hidden overflow-y-hidden">
      {/* Header */}
      <div className="w-full mt-6 px-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Billing Information
        </h1>
      </div>

      {/* Form Container */}
      <div
        className={`relative mt-8 z-20 rounded-lg shadow-lg w-11/12 max-w-4xl ${
          page === "paymentMethode" ? "h-3/5" : "h-4/5"
        } lg:h-[75%] xl:h-5/6 bg-white dark:bg-gray-800 overflow-hidden`}
      >
        {/* Decorative Background Circles */}
        <img
          className="w-32 absolute -top-12 -right-12 opacity-30"
          src="/icons/circleOr.svg"
          alt="decorative"
        />
        <img
          className="w-32 absolute -bottom-12 -left-12 opacity-30"
          src="/icons/circle.svg"
          alt="decorative"
        />

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            className={`hidden ${
              page === "paymentMethode" ? "md:block" : "lg:block"
            } md:h-full object-cover opacity-20`}
            src="/icons/billing-bg.svg"
            alt="background"
          />
        </div>

        {/* Form Content */}
        <div className="relative z-10 flex flex-col  justify-center items-center md:block p-6">
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
      className="relative mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg md:w-3/5 lg:w-1/2 w-4/5"
      action="http://localhost:5000/payment-service/stripe-subscription/create-checkout-session"
      method="POST"
    >
      <fieldset className="mb-6">
        <legend className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Choose Payment Method
        </legend>

        <div className="space-y-4">
          {/* Cards Option */}
          <div className="flex items-center px-4 py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
            <input
              type="radio"
              id="inter-cards"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={handleRadioChange}
              className="mr-3"
            />
            <label htmlFor="inter-cards" className="flex flex-col w-full">
              <span className="font-medium">Cards</span>
              <div className="flex space-x-3 mt-2">
                <img
                  className="w-8 lg:w-10"
                  src="/images/visa.png"
                  alt="Visa"
                />
                <img
                  className="w-8 lg:w-10"
                  src="/images/mastercard.png"
                  alt="MasterCard"
                />
              </div>
            </label>
          </div>

          {/* PayPal Option */}
          <div className="flex items-center px-4 py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handleRadioChange}
              className="mr-3"
            />
            <label htmlFor="paypal" className="flex flex-col w-full">
              <span className="font-medium">PayPal</span>
              <img
                className="w-16 lg:w-20 mt-2"
                src="/images/paypal.png"
                alt="PayPal"
              />
            </label>
          </div>
        </div>
      </fieldset>

      {/* Hidden Input */}
      <input
        className="hidden"
        type="text"
        name="priceId"
        value={stripeRequest.priceIds}
      />

      {/* Next Button */}
      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          onClick={() => {
            setPage("card");
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default BillingForm;
