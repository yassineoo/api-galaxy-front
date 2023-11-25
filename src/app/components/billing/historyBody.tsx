// pages/billing.js or components/BillingForm.js
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Label } from "recharts";
import { DemoPaymentMethod } from "./paymentForm";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Barchart } from "./barchart";
import RightCircle from "./rightCircle";

const HistoryBody = () => {
  // const [page, setPage] = React.useState("paymentMethode");

  return (
    <div className="flex  w-full flex-col  items-center -z-20 justify-start  h-screen min-h-screen bg-gray-100 dark:bg-transparent">
      <div className=" w-full ml-4 mt-4">
        <h1 className="text-xl font-bold">Billing History</h1>
      </div>
      <div className="w-full p-8 flex justify-around items-center">
        <Barchart />
        <RightCircle />
      </div>
    </div>
  );
};
export default HistoryBody;
