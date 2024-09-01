import { Button } from "@/components/ui/button";
import { useApiPlanList } from "@/hooks/plans/plans.queries";
import React from "react";
import PlanConfermationModal from "./plansDrawer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

//import PlanConfermationModal from "./plansConfermation";

function PricingCard({ plan }: any) {
  return (
    <div
      className={`rounded-lg shadow-lg p-6 col-span-1 flex justify-center items-center flex-col
      hover:scale-105 transform transition-transform duration-300 ease-in-out
      ${
        plan.RecomndedPlan
          ? "bg-blue-800 text-white"
          : "bg-gray-50 text-gray-800"
      }
      hover:${
        plan.RecomndedPlan ? "bg-blue-700" : "bg-gray-100"
      } cursor-pointer`}
    >
      <h3
        className={`text-lg font-bold mb-4 ${
          plan.RecomndedPlan ? "text-white" : "text-blue-900"
        }`}
      >
        {plan.Name}
      </h3>
      <div className="flex flex-col items-center mb-4">
        <span className="text-sm font-semibold">
          {plan.Type === "Usage" ? "Pay per Use" : `${plan.Price}$/Monthly`}
        </span>
      </div>

      <PlanConfermationModal plan={plan} />
    </div>
  );
}

function PricingCardsApi({ api, plans }: any) {
  const apiPlans = useApiPlanList(api?.ID);

  return (
    <div className="container mx-auto px-4 pt-8 pb-16 flex justify-start flex-col items-center">
      <h3 className="text-2xl font-extrabold text-blue-900 mb-6">
        Choose the Right Plan For You
      </h3>
      <p className="mb-8 text-sm text-gray-600 text-center max-w-2xl">
<<<<<<< HEAD
        API Galaxy partners directly with API providers to give you no-fuss,
=======
        RapidAPI partners directly with API providers to give you no-fuss,
>>>>>>> 0364dfdf1e3b7a99f851713fc81cff74a5a477c5
        transparent pricing. Find a plan that best matches the scale you need
        for your application.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full">
        <div className="col-span-1"></div> {/* Empty column */}
        {apiPlans.isLoading && <div>Loading...</div>}
        {apiPlans.isSuccess &&
          apiPlans.data?.Plans?.slice(0, 4)?.map((plan: any, index: number) => (
            <PricingCard key={index} plan={plan} />
          ))}
        {apiPlans.isSuccess &&
          apiPlans.data?.ObjectPlans.map((ObjectPlan: any, index: number) => (
            <ObjectLine
              key={index}
              object={ObjectPlan}
              plan={apiPlans.data?.Plans[0]}
            />
          ))}
        <hr className="my-6 border-t-2 border-blue-900 col-span-5" />
        {apiPlans.isSuccess && (
          <>
            <Button
              variant="ghost"
              disabled
              className="text-lg font-bold col-span-1"
            >
              Rate Limit
            </Button>
            {apiPlans.data?.Plans.map((plan: any, index: number) => (
              <div
                key={index}
                className="col-span-1 flex justify-center items-center"
              >
                {plan.Rate > 0 ? (
                  <p className="text-sm text-blue-700">
                    {plan?.Rate} requests per{" "}
                    {plan?.RateUnite === "h"
                      ? "Hour"
                      : plan?.RateUnite === "m"
                      ? "Minute"
                      : "Second"}
                  </p>
                ) : (
                  <p className="text-2xl text-red-500">x</p>
                )}
              </div>
            ))} 
          </>
        )}
      </div>
    </div>
  );
}

const ObjectLine = ({ object, plan }: any) => {
  return (
    <>
      <div className="col-span-1 flex justify-center items-center flex-col p-4">
        <h3 className="text-lg font-bold text-blue-800 mb-2">{object.Name}</h3>
        <p className="text-sm text-gray-600">{object?.Description}</p>
      </div>
      {object?.Cross?.map((cross: any, index: number) => (
        <div
          key={index}
          className="col-span-1 flex justify-center items-center text-center"
        >
          {!cross?.Add ? (
            <p className="text-red-500 text-2xl font-bold">x</p>
          ) : (
            <span className="text-md text-blue-700 font-semibold">
              {plan?.Type === "Usage"
                ? `${cross?.Price} $/use`
                : `${cross?.QuotaValue}/${cross?.QuotaType}`}
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default function PrcingTabs({ api, plans }: any) {
  return (
    <div className="flex flex-col space-y-8">
      <PricingCardsApi api={api} plans={plans} />
      <FAQ />
    </div>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is my payment information secure?",
    answer:
      "Credit cards are processed through a PCI compliant banking partner.",
  },
  {
    question: "Why do you require a credit card for a freemium API?",
    answer:
      "We work directly with API providers to implement clear, transparent pricing for developers. The Provider may require a credit card if a plan has a quota with an overage fee. If you would no longer like to use the API, you can unsubscribe from the plan at any time by clicking the 'unsubscribe' button under the Billing section of the RapidAPI Dashboard.",
  },
  {
    question: "What if I exceed my plan limits?",
    answer:
      "Depending on your plan's specification, you will either incur overage charges or be suspended.",
  },
  {
    question: "When will I be billed?",
    answer:
      "We charge your credit card upon subscription to an API's plan and at the next recurring interval.",
  },
  {
    question: "How are refunds handled?",
    answer: "For refund requests, please contact us at support@example.com.",
  },
];

const FAQ = () => {
  return (
    <div className="container mb-20 mx-auto max-w-3xl py-12 px-6 bg-white shadow-lg rounded-lg">
      <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-800">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="border-b-2 border-gray-200"
            >
              <AccordionTrigger className="text-xl font-medium text-gray-900 py-4 hover:text-indigo-600 transition duration-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pl-4 pb-4 text-lg text-gray-700">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};