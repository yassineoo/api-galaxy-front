import { Button } from "@/components/ui/button";
import { useApiPlanList } from "@/hooks/plans/plans.queries";
import React from "react";
import PlanConfermationModal from "./plansDrawer";
//import PlanConfermationModal from "./plansConfermation";

function PricingCard({ plan }: any) {
  console.log("plannn", plan);

  return (
    <div
      className={` rounded-lg shadow-md px-3 py-4 col-span-1 flex justify-center items-center flex-col
    hover:scale-110 transition-transform duration-300 ease-in-out

    ${plan.RecomndedPlan ? "bg-blue-900 text-white" : "bg-white"}`}
    >
      <h3
        className={`text-md  font-bold mb-2  ${
          plan.RecomndedPlan ? " text-white" : "text-bluee"
        } `}
      >
        {plan.Name}
      </h3>
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold">
          {plan.Type == "Usage" ? "Pay per Use" : `${plan.Price}$/Monthely`}{" "}
        </span>
      </div>
      <ul className="list-disc pl-3"></ul>
      <PlanConfermationModal plan={plan} />
    </div>
  );
}

function PricingCardsApi({ api, plans }: any) {
  const apiPlans = useApiPlanList(api?.ID);

  return (
    <div className="container mx-auto px-4 pt-4 pb-16 flex justify-start flex-col items-center">
      <h3 className="text-md font-bold mb-4">Choose the Right Plan For You </h3>
      <p className="mb-6 text-sm">
        RapidAPI partners directly with API providers to give you no-fuss,
        transparent pricing. Find a plan that best matches the scale you need
        for your application.
      </p>
      <div className="grid grid-cols-5 gap-8 mb-2 w-full">
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
        <hr className="my-1 text-red-900 col-span-5 border-t" />
        {apiPlans.isSuccess && (
          <>
            <Button
              variant="ghost"
              disabled
              className="text-xl font-bold col-span-1 "
            >
              {" "}
              RateLimite
            </Button>
            {apiPlans.data?.Plans.map((plan: any, index: number) => (
              <div className="col-span-1 flex justify-center items-center">
                {plan.Rate > 0 ? (
                  <p className="flex justify-center items-center text-sm ">
                    {plan?.Rate} requests per{" "}
                    {plan?.RateUnite == "h"
                      ? "Hour"
                      : plan?.RateUnite == "m"
                      ? "Minute"
                      : "Secondes"}
                  </p>
                ) : (
                  <p className=" text-2xl text-red-500">x</p>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default function PrcingTabs({ api, plans }: any) {
  return (
    <div className="flex flex-col ">
      <PricingCardsApi api={api} plans={plans} />
      <FAQ />
    </div>
  );
}

const ObjectLine = ({ object, plan }: any) => {
  return (
    <>
      <div className="col-span-1 flex justify-center items-center flex-col">
        <h3 className="text-xl text-blue font-bold mb-2">{object.Name}</h3>
        <p className="text-sm text-gray-400">{object?.Description}</p>
      </div>
      {object?.Cross?.map((cross: any, index: number) => (
        <div className="col-span-1 w-full flex justify-center items-center">
          {!cross?.Add ? (
            <p className="text-red-500 text-2xl">x</p>
          ) : (
            <span className="text-md">
              {plan?.Type == "Usage" ? (
                `${cross?.Price} $/use`
              ) : (
                <span>
                  `${cross?.QuotaValue}/${cross?.QuotaType}`
                </span>
              )}
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export const FAQ = () => {
  const qsts = [
    {
      qst: "Is my payment information secure?",
      rep: "Credit cards are processed through a PCI compliant banking partner.",
    },
    {
      qst: "Why do you require a credit card for a freemium API?",
      rep: "We work directly with API providers to implement clear, transparent pricing for developers. The Provider may require a credit card if a plan has a quota with an overage fee. If you would no longer like to use the API, you can unsubscribe from the plan at anytime by clicking the 'unsubscribe' button under the Billing section of the RapidAPI Dashboard.",
    },
    {
      qst: "What if I exceed my plan limits?",
      rep: "Depending on your plan's specification, you will either incur overage charges or be suspended.",
    },
    {
      qst: "When will I be billed?",
      rep: "We charge your credit card upon subscription to an API's plan and at the next recurring interval.",
    },
    {
      qst: "How are refunds handled?",
      rep: "For refund requests, please contact us at",
    },
  ];

  return (
    <div className="w-full justify-center items-center border py-12 border-t-2  ">
      <h1 className="text-skyBlue text-bold text-xl text-center">
        Frequently Asked Questions
      </h1>
      <div className="flex justify-between items-start pl-16 flex-col">
        {qsts.map((qst, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h3 className="text-md font-semibold">{qst.qst}</h3>
            <p className="text-sm ">{qst.rep}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
