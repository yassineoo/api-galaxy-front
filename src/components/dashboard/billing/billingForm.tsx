// pages/billing.js or components/BillingForm.js
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Label } from "recharts";
import { DemoPaymentMethod } from "./paymentForm";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbWithCustomSeparator } from "../breadcrumb";

const BillingForm = () => {
  const [page, setPage] = React.useState("paymentMethode");

  return (
    <div className="flex  w-full flex-col  items-center  justify-start  h-screen min-h-screen bg-gray-100 dark:bg-transparent">
      <div className=" w-full ml-4 mt-4">
        <h1 className="text-xl font-bold">Billing Information</h1>
      </div>
      <div
        className={`relative mt-6  z-20 rounded-lg shadow-md w-4/5  ${
          page == "paymentMethode" ? "h-3/5" : "h-4/5"
        } lg:h-[75%] xl:h-5/6`}
      >
        <img
          className=" w-32 -top-16 -right-16 absolute -z-10"
          src="/icons/circleOr.svg"
        />
        <img
          className=" w-32 -bottom-16 -left-16 absolute -z-10"
          src="/icons/circle.svg"
        />

        <div className="bg-white  dark:bg-transparent w-full h-full relative z-0 flex justify-center items-center md:block">
          <img
            className={`hidden  ${
              page == "paymentMethode" ? "md:flex" : "lg:flex"
            } md:h-full object-cover z-10  absolute `}
            src="/icons/billing-bg.svg"
          />
          {page === "paymentMethode" ? (
            <MethodeForm setPage={setPage} />
          ) : (
            <>
              <div className=" relative m-auto lg:m-0  md:flex lg:left-[44%] lg:w-1/2 w-4/5">
                <DemoPaymentMethod />
              </div>
              <img
                className=" w-0 lg:w-48 top-[30%] left-[18%] absolute z-10"
                src="/icons/Mastercard.svg"
              />
              <button
                onClick={() => setPage("paymentMethode")}
                className="absolute z-40 flex gap-2 top-1 -left-3 lg:top-4 lg:left-4 py-2 px-4 text-black  lg:text-white  cursor-pointer"
              >
                <svg
                  className="black lg:white"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    fill="white "
                    d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"
                  />
                </svg>
                Previous Page
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MethodeForm = ({ setPage }: any) => {
  const switchPage = (setPage: any) => {
    setPage("card");
  };
  return (
    <>
      <form className="absolute md:left-[45%]  lg:left-[45%] md:w-1/2 w-4/5 ">
        <fieldset className="mb-4 ">
          <CardHeader>
            <CardTitle className="text-base md:text-2xl">
              Choose a payment Methode
            </CardTitle>
            <CardDescription>support debits card and paypal</CardDescription>
          </CardHeader>
          <RadioGroup defaultValue="option-one" className="my-4 mt-4 ">
            <div className="flex flex-col   items-start space-x-2 px-2 py-1 lg:py-3 border border-black  bg-white text-black ">
              <div className="flex items-center space-x-2  ">
                <RadioGroupItem value="option-one" id="option-one" />
                <label htmlFor="option-one">Cards</label>
              </div>
              <div className="flex  items-center space-x-2  ">
                <img className="w-7 lg:w-10 ml-3" src="/images/visa.png" />
                <img className="w-7 lg:w-10" src="/images/mastercard.png" />
              </div>
            </div>
            <div className="flex flex-col  items-start space-x-2 px-2 py-1 lg:py-3 border border-black  bg-white text-black ">
              <div className="flex items-center space-x-2  ">
                <RadioGroupItem value="option-one" id="option-one" />
                <label htmlFor="option-one">Paypal</label>
              </div>
              <div className="flex   items-center space-x-2  ">
                <img className="w-14 lg:w-20 ml-3" src="/images/paypal.png" />
              </div>
            </div>
          </RadioGroup>
        </fieldset>
      </form>

      <Button
        onClick={() => {
          switchPage(setPage);
        }}
        className="absolute -bottom-4 right-[20%] w-1/3"
      >
        Next
      </Button>
    </>
  );
};

export default BillingForm;
