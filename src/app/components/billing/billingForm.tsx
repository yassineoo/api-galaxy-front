// pages/billing.js or components/BillingForm.js
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Label } from "recharts";

const BillingForm = () => {
  return (
    <div className="flex  w-full flex-col  items-center -z-20 justify-start  h-screen min-h-screen bg-gray-100">
      <div className=" w-full ml-4 mt-4">
        <h1 className="text-xl font-bold">Billing Information</h1>
      </div>
      <div className=" relative mt-6  z-20 rounded-lg shadow-md w-4/5 h-4/5">
        <img
          className=" w-32 -top-16 -right-16 absolute -z-10"
          src="icons/circleOr.svg"
        />
        <img
          className=" w-32 -bottom-16 -left-16 absolute -z-10"
          src="icons/circle.svg"
        />

        <div className="bg-white w-full h-full relative z-0">
          <img
            className="h-full object-cover z-10  absolute"
            src="icons/billing-bg.svg"
          />
          <CardForm />
        </div>
      </div>
    </div>
  );
};

const MethodeForm = () => {
  return (
    <>
      <form className="absolute left-1/2 ">
        <fieldset className="mb-4 mt-4">
          <legend className="text-lg font-semibold mb-24">
            Choose payment method
          </legend>
          <RadioGroup defaultValue="option-one">
            <div className="flex flex-col pr-56  items-start space-x-2 px-2 py-3 border border-black  ">
              <div className="flex items-center space-x-2  ">
                <RadioGroupItem value="option-one" id="option-one" />
                <label htmlFor="option-one">Cards</label>
              </div>
              <div className="flex  items-center space-x-2  ">
                <img className="w-10 ml-3" src="images/visa.png" />
                <img className="w-10" src="images/mastercard.png" />
              </div>
            </div>
            <div className="flex flex-col  items-start space-x-2 px-2 py-3 border border-black  ">
              <div className="flex items-center space-x-2  ">
                <RadioGroupItem value="option-one" id="option-one" />
                <label htmlFor="option-one">Paypal</label>
              </div>
              <div className="flex   items-center space-x-2  ">
                <img className="w-20 ml-3" src="images/paypal.png" />
              </div>
            </div>
          </RadioGroup>
        </fieldset>
      </form>
      <button className="absolute z-40 flex gap-2 top-4 left-4 py-2 px-4 text-white cursor-pointer">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            fill="white"
            d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"
          />
        </svg>
        Previous Page
      </button>
      <Button className="absolute -bottom-4 right-[20%] w-1/3">Next</Button>
    </>
  );
};

const CardForm = () => {
  return (
    <>
      <form className="absolute left-1/2 ">
        <fieldset className="mb-4 mt-4">
          <legend className="text-lg font-semibold mb-24">
            Your payment details
          </legend>
        </fieldset>
      </form>
      <img
        className=" w-64 top-[30%] left-[20%] absolute z-10"
        src="icons/Mastercard.svg"
      />
      <button className="absolute z-40 flex gap-2 top-4 left-4 py-2 px-4 text-white cursor-pointer">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            fill="white"
            d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"
          />
        </svg>
        Previous Page
      </button>
      <Button className="absolute -bottom-4 right-[20%] w-1/3">Save</Button>
    </>
  );
};

export default BillingForm;
