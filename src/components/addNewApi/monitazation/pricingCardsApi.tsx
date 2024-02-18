import { Button } from "@/components/ui/button";
import { useApiPlanList } from "@/hooks/plans/plans.queries";
import React from "react";
import PlanConfermationModal from "./plansDrawer";
//import PlanConfermationModal from "./plansConfermation";

function PricingCard({ plan }: any) {
  console.log("plannn", plan);

  return (
    <div className="bg-white rounded-lg shadow-md px-3 py-4 col-span-1 flex justify-center items-center flex-col">
      <h3 className="text-md text-blue font-bold mb-2">{plan.Name}</h3>
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

export default function PricingCardsApi({ api, plans }: any) {
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
                  <p className="text-gray-400 text-2xl">x</p>
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
      <div className="col-span-1 flex justify-center items-center flex-col">
        <h3 className="text-xl text-blue font-bold mb-2">{object.Name}</h3>
        <p className="text-sm text-gray-400">{object?.Description}</p>
      </div>
      {object?.Cross?.map((cross: any, index: number) => (
        <div className="col-span-1 w-full flex justify-center items-center">
          {!cross?.Add ? (
            <p className="text-gray-400 text-2xl">x</p>
          ) : (
            <Button variant={"ghost"} disabled>
              {plan?.Type == "Usage" ? (
                `${cross?.Price} $/use`
              ) : (
                <span>
                  `${cross?.QuotaValue}/${cross?.QuotaType}`
                </span>
              )}
            </Button>
          )}
        </div>
      ))}
    </>
  );
};
